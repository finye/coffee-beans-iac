import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import * as apigwv2 from "aws-cdk-lib/aws-apigatewayv2";
import { HttpLambdaIntegration } from "aws-cdk-lib/aws-apigatewayv2-integrations";

export class BackendStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Lambda Function
    const beansFunction = new NodejsFunction(this, "BeansFn", {
      runtime: lambda.Runtime.NODEJS_20_X,
      entry: "../backend/src/beans.ts",
      handler: "handler",
      bundling: {
        externalModules: ["aws-sdk"],
        minify: true,
      },
      environment: {},
    });

    const api = new apigwv2.HttpApi(this, "BeansHttpApi", {
      apiName: "Coffee Beans API",
      corsPreflight: {
        allowOrigins: ["*"],
        allowMethods: [
          apigwv2.CorsHttpMethod.GET,
          apigwv2.CorsHttpMethod.OPTIONS,
        ],
        allowHeaders: ["Content-Type"],
        allowCredentials: false,
      },
    });

    const beansIntegration = new HttpLambdaIntegration(
      "BeansIntegration",
      beansFunction
    );

    api.addRoutes({
      path: "/beans",
      methods: [apigwv2.HttpMethod.GET],
      integration: beansIntegration,
    });

    new cdk.CfnOutput(this, "BeansApiEndpoint", {
      value: api.apiEndpoint,
      description: "HTTP API endpoint URL",
    });
  }
}
