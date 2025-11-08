import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment";

interface FrontendStackProps extends cdk.StackProps {
  siteDistPath: string;
  apiEndpoint: string;
}

export class FrontendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: FrontendStackProps) {
    super(scope, id, props);

    const siteBucket = new s3.Bucket(this, "SiteBucket", {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      versioned: false,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    const distro = new cloudfront.Distribution(this, "Distro", {
      defaultRootObject: "index.html",
      defaultBehavior: { origin: new origins.S3Origin(siteBucket) },
      errorResponses: [
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: "/index.html",
          ttl: cdk.Duration.minutes(1),
        },
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: "/index.html",
          ttl: cdk.Duration.minutes(1),
        },
      ],
    });

    new s3deploy.BucketDeployment(this, "DeploySite", {
      sources: [
        s3deploy.Source.asset(props.siteDistPath),
        s3deploy.Source.jsonData("config.json", {
          apiBaseUrl: props.apiEndpoint,
          cdnUrl: `https://${distro.distributionDomainName}`,
        }),
      ],
      destinationBucket: siteBucket,
      distribution: distro,
      distributionPaths: ["/*"],
    });

    new cdk.CfnOutput(this, "SiteUrl", {
      value: `https://${distro.distributionDomainName}`,
    });

    new cdk.CfnOutput(this, "ApiEndpoint", {
      value: props.apiEndpoint,
    });
  }
}
