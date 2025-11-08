#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { BackendStack } from "../lib/backend-stack";
import { FrontendStack } from "../lib/frontend-stack";

const app = new cdk.App();
const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const backend = new BackendStack(app, "CoffeeCo-Backend", { env });
const frontend = new FrontendStack(app, "CoffeeCo-Frontend", {
  env,
  siteDistPath: "../frontend/dist",
  apiEndpoint: backend.apiEndpoint,
});

frontend.addDependency(backend);
