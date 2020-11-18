COMPANY=nicola-tesla
DEPLOYMENT_BUCKET_NAME=lambda-artifacts
LOG_LEVEL=debug
APP_NAME=books-api
STAGE=dev

install:
	@npm ci

test:
	@npm run test

build:
	@rm -rf build
	@npm run build
	@sam validate
	@sam build


start: build
	@sam local start-api

deploy: build
	@aws s3 ls s3://${COMPANY}.${STAGE}.${DEPLOYMENT_BUCKET_NAME} || aws s3 mb s3://${COMPANY}.${STAGE}.${DEPLOYMENT_BUCKET_NAME}
	@sam deploy --stack-name ${STAGE}-${APP_NAME} \
							--s3-bucket ${COMPANY}.${STAGE}.${DEPLOYMENT_BUCKET_NAME} \
							--s3-prefix ${APP_NAME} \
							--confirm-changeset \
							--capabilities CAPABILITY_NAMED_IAM \
							--parameter-overrides ParameterKey=logLevel,ParameterValue=${LOG_LEVEL} ParameterKey=stage,ParameterValue=${STAGE}

destroy:
	@aws cloudformation delete-stack --stack-name ${STAGE}-${APP_NAME}

list-apis:
	@aws apigatewayv2 get-apis

list-all-books-logs:
	@sam logs --stack-name ${STAGE}-${APP_NAME} --name ListAllBooksFunction -t

create-book-logs:
	@sam logs --stack-name ${STAGE}-${APP_NAME} --name CreateBookFunction -t
