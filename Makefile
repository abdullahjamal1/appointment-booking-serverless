
getSsmParameter = $(shell aws ssm get-parameter --name $(1) | python3 -c 'import sys, json; print(json.load(sys.stdin)["Parameter"]["Value"])')

AWS_REGION = $(shell aws configure get region)

all: build-backend deploy-backend build-audience-app publish-audience-app
	@echo "deploy ended"

build-backend:
	@echo "building backend"

	cd backend/shared/apigateway/python; \
	pip3 install -r requirements.txt --target libs/ 

	cd backend/shared/apiRequests; \
	pip3 install -r requirements.txt --target python/

	cd backend/shared/courier/python; \
	pip3 install -r requirements.txt --target libs/

	cd backend/shared/jsonschema; \
	pip3 install -r requirements.txt --target python/

deploy-backend: 
	@echo "running deploy" 
	sam deploy --no-confirm-changeset --stack-name appointment --parameter-overrides ParameterKey=CourierApiToken,ParameterValue=$(shell echo "$COURIER_API_TOKEN") --capabilities CAPABILITY_IAM CAPABILITY_AUTO_EXPAND CAPABILITY_NAMED_IAM 

add-ssm-env-params-audience-app:
	@echo "adding ssm parameters to environment variables of audience app"

	@ $(eval APPOINTMENT_API_URL = $(call getSsmParameter, "/doctor-appointment/appointment/api/url"))
	@ $(eval USER_POOL_ID = $(call getSsmParameter, "/doctor-appointment/auth/audience/user-pool-id"))
	@ $(eval USER_POOL_CLIENT_ID = $(call getSsmParameter, "/doctor-appointment/auth/audience/user-pool-client-id"))

	cd frontend/patient; \
	printf '%s\n' \
    "REACT_APP_USER_POOL_ID=$(USER_POOL_ID)" \
    "REACT_APP_USER_POOL_CLIENT_ID=$(USER_POOL_CLIENT_ID)" \
    "REACT_APP_AD_SERVER_API_URL=$(APPOINTMENT_API_URL)" \
	"REACT_APP_AWS_REGION=$(AWS_REGION)" \
	> .env.development ;\
	cp .env.development .env.production

build-audience-app: add-ssm-env-params-audience-app

	@echo "building audience app"
	
	cd frontend/patient; \
	npm install --legacy-peer-deps; \
	npm run build

publish-audience-app: 

	@echo "publishing audience app"

	@ $(eval AUDIENCE_DOMAIN_URL = $(call getSsmParameter, "/doctor-appointment/audience/cloudfront/domain"))
	@ $(eval AUDIENCE_APP_S3_BUCKET = $(call getSsmParameter, "/doctor-appointment/audience/s3/name"))

	cd frontend/patient; \
	aws s3 sync build/ s3://$(AUDIENCE_APP_S3_BUCKET) --delete

	@echo "url of audience app: https://$(AUDIENCE_DOMAIN_URL)"

clean:
# TODO: delete contents of s3 bucket before deleting buckets
	sam delete