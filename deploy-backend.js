const AWS = require('aws-sdk');
const fs = require('fs');
AWS.config.update({ region: 'ap-south-1' });

const iam = new AWS.IAM();
const lambda = new AWS.Lambda();
const apigateway = new AWS.APIGateway();
const sts = new AWS.STS();

const apiId = 'sobectvd0h';
const parentId = 'ljmhqi0ume';
const ROLE_NAME = 'smaatech-contact-lambda-role-v2';
const FUNCTION_NAME = 'smaatech-contact-handler';

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function deploy() {
    try {
        console.log("Getting Caller Identity...");
        const identity = await sts.getCallerIdentity().promise();
        const accountId = identity.Account;
        console.log("Account ID:", accountId);

        console.log("Setting up IAM Role...");
        let roleArn;
        try {
            const roleRes = await iam.createRole({
                RoleName: ROLE_NAME,
                AssumeRolePolicyDocument: JSON.stringify({
                    "Version": "2012-10-17",
                    "Statement": [{ "Effect": "Allow", "Principal": { "Service": "lambda.amazonaws.com" }, "Action": "sts:AssumeRole" }]
                })
            }).promise();
            roleArn = roleRes.Role.Arn;
            
            await iam.attachRolePolicy({
                RoleName: ROLE_NAME,
                PolicyArn: "arn:aws:iam::aws:policy/AmazonSESFullAccess"
            }).promise();
            
            await iam.attachRolePolicy({
                RoleName: ROLE_NAME,
                PolicyArn: "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
            }).promise();
            
            console.log("Role created. Waiting 10 seconds for propagation...");
            await delay(10000);
        } catch (e) {
            if (e.code === 'EntityAlreadyExists') {
                const role = await iam.getRole({ RoleName: ROLE_NAME }).promise();
                roleArn = role.Role.Arn;
                console.log("Role already exists:", roleArn);
            } else {
                throw e;
            }
        }

        console.log("Setting up Lambda Function...");
        const zipFile = fs.readFileSync('terraform/lambda/contact.zip');
        let lambdaArn;
        try {
            const lambdaRes = await lambda.createFunction({
                FunctionName: FUNCTION_NAME,
                Runtime: 'nodejs18.x',
                Role: roleArn,
                Handler: 'contact.handler',
                Code: { ZipFile: zipFile }
            }).promise();
            lambdaArn = lambdaRes.FunctionArn;
            console.log("Created Lambda:", lambdaArn);
        } catch (e) {
            if (e.code === 'ResourceConflictException') {
                const func = await lambda.getFunction({ FunctionName: FUNCTION_NAME }).promise();
                lambdaArn = func.Configuration.FunctionArn;
                console.log("Lambda already exists, updating code...");
                await lambda.updateFunctionCode({
                    FunctionName: FUNCTION_NAME,
                    ZipFile: zipFile
                }).promise();
            } else {
                throw e;
            }
        }

        console.log("Setting up API Gateway...");
        let resourceId;
        try {
            const res = await apigateway.createResource({ restApiId: apiId, parentId: parentId, pathPart: 'contact' }).promise();
            resourceId = res.id;
        } catch (e) {
            if (e.code === 'ConflictException') {
                const resources = await apigateway.getResources({ restApiId: apiId }).promise();
                resourceId = resources.items.find(r => r.pathPart === 'contact').id;
            } else { throw e; }
        }

        console.log("Configuring POST Method & Integration");
        try { await apigateway.putMethod({ restApiId: apiId, resourceId: resourceId, httpMethod: 'POST', authorizationType: 'NONE' }).promise(); } catch(e){}
        await apigateway.putIntegration({
            restApiId: apiId, resourceId: resourceId, httpMethod: 'POST', type: 'AWS_PROXY', integrationHttpMethod: 'POST',
            uri: `arn:aws:apigateway:ap-south-1:lambda:path/2015-03-31/functions/${lambdaArn}/invocations`
        }).promise();

        console.log("Configuring OPTIONS (CORS)");
        try { await apigateway.putMethod({ restApiId: apiId, resourceId: resourceId, httpMethod: 'OPTIONS', authorizationType: 'NONE' }).promise(); } catch(e){}
        await apigateway.putIntegration({
            restApiId: apiId, resourceId: resourceId, httpMethod: 'OPTIONS', type: 'MOCK', requestTemplates: { 'application/json': '{"statusCode": 200}' }
        }).promise();
        try {
            await apigateway.putMethodResponse({
                restApiId: apiId, resourceId: resourceId, httpMethod: 'OPTIONS', statusCode: '200',
                responseParameters: { 'method.response.header.Access-Control-Allow-Headers': true, 'method.response.header.Access-Control-Allow-Methods': true, 'method.response.header.Access-Control-Allow-Origin': true },
                responseModels: { 'application/json': 'Empty' }
            }).promise();
        } catch(e) {}
        try {
            await apigateway.putIntegrationResponse({
                restApiId: apiId, resourceId: resourceId, httpMethod: 'OPTIONS', statusCode: '200',
                responseParameters: {
                    'method.response.header.Access-Control-Allow-Headers': "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",
                    'method.response.header.Access-Control-Allow-Methods': "'OPTIONS,POST'",
                    'method.response.header.Access-Control-Allow-Origin': "'*'"
                }, responseTemplates: { 'application/json': '' }
            }).promise();
        } catch (e) {}

        console.log("Deploying API...");
        await apigateway.createDeployment({ restApiId: apiId, stageName: 'prod' }).promise();

        console.log("Giving API Gateway permission to trigger Lambda...");
        try {
            await lambda.addPermission({
                Action: 'lambda:InvokeFunction',
                FunctionName: FUNCTION_NAME,
                Principal: 'apigateway.amazonaws.com',
                StatementId: 'AllowAPIGatewayInvokeProd' + Date.now(),
                SourceArn: `arn:aws:execute-api:ap-south-1:${accountId}:${apiId}/*/*`
            }).promise();
        } catch (e) {
            console.log(e.message); // Ignore if statement exists
        }

        console.log("\n✅ OVERALL SUCCESS! BACKEND COMPLETELY DEPLOYED.");
        console.log("API URL: https://" + apiId + ".execute-api.ap-south-1.amazonaws.com/prod/contact");
    } catch (err) {
        console.error("FATAL ERROR:", err);
    }
}
deploy();
