$apiId = "sobectvd0h"
$parentId = "ljmhqi0ume"
$lambdaArn = "arn:aws:lambda:ap-south-1:084375549553:function:smaatech-contact-handler"
$region = "ap-south-1"
$accountId = "084375549553"

Write-Host "Creating Resource /contact"
$resourceStr = aws apigateway create-resource --rest-api-id $apiId --parent-id $parentId --path-part "contact" --region $region --no-cli-pager
$resourceJson = $resourceStr | ConvertFrom-Json
$resourceId = $resourceJson.id

Write-Host "Creating POST Method"
aws apigateway put-method --rest-api-id $apiId --resource-id $resourceId --http-method "POST" --authorization-type "NONE" --region $region --no-cli-pager

Write-Host "Creating POST Integration"
aws apigateway put-integration --rest-api-id $apiId --resource-id $resourceId --http-method "POST" --type "AWS_PROXY" --integration-http-method "POST" --uri "arn:aws:apigateway:${region}:lambda:path/2015-03-31/functions/${lambdaArn}/invocations" --region $region --no-cli-pager

Write-Host "Configuring CORS (OPTIONS Method)"
aws apigateway put-method --rest-api-id $apiId --resource-id $resourceId --http-method "OPTIONS" --authorization-type "NONE" --region $region --no-cli-pager
aws apigateway put-integration --rest-api-id $apiId --resource-id $resourceId --http-method "OPTIONS" --type "MOCK" --request-templates '{"application/json": "{\"statusCode\": 200}"}' --region $region --no-cli-pager
aws apigateway put-method-response --rest-api-id $apiId --resource-id $resourceId --http-method "OPTIONS" --status-code "200" --response-parameters '{"method.response.header.Access-Control-Allow-Headers": true, "method.response.header.Access-Control-Allow-Methods": true, "method.response.header.Access-Control-Allow-Origin": true}' --region $region --no-cli-pager
aws apigateway put-integration-response --rest-api-id $apiId --resource-id $resourceId --http-method "OPTIONS" --status-code "200" --response-parameters '{"method.response.header.Access-Control-Allow-Headers": "''Content-Type''", "method.response.header.Access-Control-Allow-Methods": "''OPTIONS,POST''", "method.response.header.Access-Control-Allow-Origin": "''*''"}' --region $region --no-cli-pager

Write-Host "Deploying API"
aws apigateway create-deployment --rest-api-id $apiId --stage-name "prod" --region $region --no-cli-pager

Write-Host "Adding Lambda Permission"
aws lambda add-permission --function-name "smaatech-contact-handler" --statement-id "AllowAPIGatewayInvokeProd2" --action "lambda:InvokeFunction" --principal "apigateway.amazonaws.com" --source-arn "arn:aws:execute-api:${region}:${accountId}:${apiId}/*/*" --region $region --no-cli-pager

Write-Host "Done setting up API Gateway Endpoint"
