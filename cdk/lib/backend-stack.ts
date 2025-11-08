import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigwv2 from "aws-cdk-lib/aws-apigatewayv2";
import { HttpLambdaIntegration } from "aws-cdk-lib/aws-apigatewayv2-integrations";
import { DockerImageFunction } from "aws-cdk-lib/aws-lambda";

export class BackendStack extends cdk.Stack {
  public readonly apiEndpoint: string;

  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Lambda Function
    const beansFunction = new DockerImageFunction(this, "BeansFn", {
      code: lambda.DockerImageCode.fromImageAsset("../backend"),
      memorySize: 256,
      timeout: cdk.Duration.seconds(30),
      logRetention: cdk.aws_logs.RetentionDays.ONE_WEEK,
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

    this.apiEndpoint = api.apiEndpoint;

    new cdk.CfnOutput(this, "BeansApiEndpoint", {
      value: api.apiEndpoint,
      description: "HTTP API endpoint URL",
    });
  }
}
