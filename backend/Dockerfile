# Build
FROM --platform=linux/amd64 public.ecr.aws/lambda/nodejs:20 AS builder

WORKDIR ${LAMBDA_TASK_ROOT}

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# Runtime
FROM --platform=linux/amd64 public.ecr.aws/lambda/nodejs:20

COPY --from=builder ${LAMBDA_TASK_ROOT}/dist/index.js ${LAMBDA_TASK_ROOT}/
COPY --from=builder ${LAMBDA_TASK_ROOT}/node_modules ${LAMBDA_TASK_ROOT}/node_modules

CMD [ "index.handler" ]
