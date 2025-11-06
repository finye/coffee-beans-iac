import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import * as apigwv2 from "aws-cdk-lib/aws-apigatewayv2";
import { HttpLambdaIntegration } from "aws-cdk-lib/aws-apigatewayv2-integrations";

export class BackendStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // S3 Bucket for storing images
    const imagesBucket = new s3.Bucket(this, "ImagesBucket", {
      bucketName: `coffee-beans-images-${this.account}-${this.region}`,
      cors: [
        {
          allowedMethods: [s3.HttpMethods.GET],
          allowedOrigins: ["*"],
          allowedHeaders: ["*"],
        },
      ],
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    // CloudFront distribution for the images
    const distribution = new cloudfront.Distribution(
      this,
      "ImagesDistribution",
      {
        defaultBehavior: {
          origin: new origins.S3Origin(imagesBucket, {
            originAccessIdentity: new cloudfront.OriginAccessIdentity(
              this,
              "ImagesBucketOAI"
            ),
          }),
          viewerProtocolPolicy:
            cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD,
          cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
        },
      }
    );

    // Lambda Function
    const beansFunction = new NodejsFunction(this, "BeansFn", {
      runtime: lambda.Runtime.NODEJS_20_X,
      entry: "../backend/src/beans.ts",
      handler: "handler",
      bundling: {
        externalModules: ["aws-sdk"],
        minify: true,
      },
      environment: {
        CLOUDFRONT_URL: distribution.distributionDomainName,
        BUCKET_NAME: imagesBucket.bucketName,
      },
    });

    // Grant the Lambda function read access to the S3 bucket
    imagesBucket.grantRead(beansFunction);

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
