const AWS = require('aws-sdk');
AWS.config.update({ region: 'ap-south-1' });

const apigateway = new AWS.APIGateway();
const lambda = new AWS.Lambda();

const apiId = 'sobectvd0h';
const parentId = 'ljmhqi0ume';
const lambdaArn = 'arn:aws:lambda:ap-south-1:084375549553:function:smaatech-contact-handler';

async function setup() {
    try {
        console.log("Creating Resource /contact");
        let resourceId;
        try {
            const res = await apigateway.createResource({
                restApiId: apiId,
                parentId: parentId,
                pathPart: 'contact'
            }).promise();
            resourceId = res.id;
        } catch (e) {
            if (e.code === 'ConflictException') {
                const resources = await apigateway.getResources({ restApiId: apiId }).promise();
                resourceId = resources.items.find(r => r.pathPart === 'contact').id;
            } else {
                throw e;
            }
        }
        
        console.log("Resource ID:", resourceId);

        console.log("Creating POST Method");
        try {
            await apigateway.putMethod({
                restApiId: apiId,
                resourceId: resourceId,
                httpMethod: 'POST',
                authorizationType: 'NONE'
            }).promise();
        } catch(e) { console.log(e.message); }

        console.log("Creating POST Integration");
        await apigateway.putIntegration({
            restApiId: apiId,
            resourceId: resourceId,
            httpMethod: 'POST',
            type: 'AWS_PROXY',
            integrationHttpMethod: 'POST',
            uri: `arn:aws:apigateway:ap-south-1:lambda:path/2015-03-31/functions/${lambdaArn}/invocations`
        }).promise();

        console.log("Creating OPTIONS Method");
        try {
            await apigateway.putMethod({
                restApiId: apiId,
                resourceId: resourceId,
                httpMethod: 'OPTIONS',
                authorizationType: 'NONE'
            }).promise();
        } catch(e) { console.log(e.message); }

        console.log("Creating OPTIONS Integration");
        await apigateway.putIntegration({
            restApiId: apiId,
            resourceId: resourceId,
            httpMethod: 'OPTIONS',
            type: 'MOCK',
            requestTemplates: { 'application/json': '{"statusCode": 200}' }
        }).promise();

        console.log("Creating OPTIONS Method Response");
        try {
            await apigateway.putMethodResponse({
                restApiId: apiId,
                resourceId: resourceId,
                httpMethod: 'OPTIONS',
                statusCode: '200',
                responseParameters: {
                    'method.response.header.Access-Control-Allow-Headers': true,
                    'method.response.header.Access-Control-Allow-Methods': true,
                    'method.response.header.Access-Control-Allow-Origin': true
                },
                responseModels: { 'application/json': 'Empty' }
            }).promise();
        } catch(e) { console.log(e.message); }

        console.log("Creating OPTIONS Integration Response");
        try {
            await apigateway.putIntegrationResponse({
                restApiId: apiId,
                resourceId: resourceId,
                httpMethod: 'OPTIONS',
                statusCode: '200',
                responseParameters: {
                    'method.response.header.Access-Control-Allow-Headers': "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",
                    'method.response.header.Access-Control-Allow-Methods': "'OPTIONS,POST'",
                    'method.response.header.Access-Control-Allow-Origin': "'*'"
                },
                responseTemplates: { 'application/json': '' }
            }).promise();
        } catch(e){ console.log(e.message); }

        console.log("Deploying API");
        await apigateway.createDeployment({
            restApiId: apiId,
            stageName: 'prod'
        }).promise();

        console.log("Adding Lambda Permission");
        try {
            await lambda.addPermission({
                Action: 'lambda:InvokeFunction',
                FunctionName: 'smaatech-contact-handler',
                Principal: 'apigateway.amazonaws.com',
                StatementId: 'AllowAPIGatewayInvokeProd' + Date.now(),
                SourceArn: `arn:aws:execute-api:ap-south-1:084375549553:${apiId}/*/*`
            }).promise();
        } catch (e) {
            console.log(e.message);
        }

        console.log("API GATEWAY SETUP COMPLETE. Endpoint: https://" + apiId + ".execute-api.ap-south-1.amazonaws.com/prod/contact");
    } catch (err) {
        console.error("ERROR:", err);
    }
}

setup();
