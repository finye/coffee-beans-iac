# Coffee Beans Infrastructure as Code

This project was done as a pre-assignment for the OP Kiitorata Trainee Program 🤞.

## Project Structure

```
coffee-beans-iac/
├── backend/           # Lambda function code
├── cdk/               # Infrastructure code
│   ├── bin/
│   └── lib/
│       ├── backend-stack.ts
│       └── frontend-stack.ts
└── frontend/          # React + TypeScript application
```

The infrastructure code is built with AWS CDK and it consists of two main stacks.

### Backend Stack

- **AWS Lambda (Docker-based)** - Runs the backend logic inside a container image and serves coffee beans data via a REST API.

- **API Gateway (HTTP API)** - Exposes a secure, public HTTP endpoint for the Lambda function and manages CORS configuration.

### Frontend Stack

- **S3 Bucket** - Hosts the static assets of the React frontend application

- **CloudFront Distribution** - Provides a global CDN layer for fast, cached content delivery.

- **Automatic Configuration** - During deployment, a config.json file is generated and uploaded to S3 containing runtime settings such as the API Gateway endpoint and CloudFront distribution URL.

### Backend Application

- **Node.js Lambda Handler** - Serverless REST API serving coffee beans data

### Frontend Application

- **React + TypeScript + styled-components** – Modern frontend built with React and TypeScript, styled using styled-components.

## Prerequisites

### 1. AWS Account and Authentication

1.  Create an AWS Account if you don't have one.

    https://aws.amazon.com

2.  Install AWS CLI:

    https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html

3.  Configure AWS credentials:

    ```bash
    aws configure
    ```

    To create a new configuration:

    - $ aws configure
    - AWS Access Key ID : `your-access-key`
    - AWS Secret Access Key : `your-secret-key`
    - Default region name : `eu-north-1` (or your preferred region)
    - Default output format : `json`

    Verify Authentication

    ```bash
    aws sts get-caller-identity
    ```

    Should return your AWS account details.

### 2. AWS CDK CLI

1. Install AWS CDK globally:

   ```bash
   npm install -g aws-cdk
   ```

### 3. Node.js and npm

1. Install Node.js (version 20.x or later)

   Download Node.js from: https://nodejs.org/

   verify installation

   ```bash
   node --version
   npm --version
   ```

### 4. Docker

The backend Lambda function uses container images, so Docker is required:

1. Download Docker Desktop from: https://www.docker.com/products/docker-desktop/
2. Verify installation:
   ```bash
   docker --version
   ```
3. Start Docker Desktop (must be running during deployment)

## Project Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/finye/coffee-beans-iac.git
   cd coffee-beans-iac
   ```

2. Install dependencies for all the components:

   ```bash
   npm run install:all
   ```

   This installs dependencies for the root, frontend, and CDK packages.

3. Bootstrap AWS CDK (first-time only):
   ```bash
   cd cdk
   cdk bootstrap
   cd ..
   ```
   This sets up the necessary AWS resources for CDK deployments in your account.

## Deployment

### Option A: Deploy everything in one command

```bash
# From project root level
npm run deploy
```

This will:

- Build the frontend React application
- Deploy the backend stack (Lambda + API Gateway)
- Deploy the frontend stack (S3 + CloudFront + config.json)

### Option B: Step by step deployment

1. Build frontend

   ```bash
   npm run build:frontend
   ```

2. Deploy the backend stack

   ```bash
   npm run deploy:backend
   ```

   This will:

   - Build and deploy the Lambda container image
   - Create the API Gateway

3. Deploy the frontend stack

   ```bash
   npm run deploy:frontend
   ```

   This will:

   - Create an S3 bucket for hosting
   - Set up CloudFront distribution
   - Generate and upload config.json with runtime configuration

After deployment, you'll see the following outputs:

- CoffeeCo-Frontend.ApiEndpoint
- CoffeeCo-Frontend.SiteUrl

**Visit the `SiteUrl` to see the deployed website :)**

## Destroying the Infrastructure

This will permanently delete all deployed resources.

```bash
npm run destroy:all
```
