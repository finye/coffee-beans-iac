import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as iam from "aws-cdk-lib/aws-iam";

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
    const beansFunction = new lambda.Function(this, "BeansFn", {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: "beans.handler",
      code: lambda.Code.fromAsset("../backend"),
      environment: {
        CLOUDFRONT_URL: distribution.distributionDomainName,
        BUCKET_NAME: imagesBucket.bucketName,
      },
    });

    // Grant the Lambda function read access to the S3 bucket
    imagesBucket.grantRead(beansFunction);

    // API Gateway
    const api = new apigateway.RestApi(this, "BeansApi", {
      restApiName: "Coffee Beans API",
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
      },
    });

    // API Gateway Integration
    const beansIntegration = new apigateway.LambdaIntegration(beansFunction);
    api.root.addResource("beans").addMethod("GET", beansIntegration);
  }
}
