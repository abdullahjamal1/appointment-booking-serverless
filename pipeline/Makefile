
all: deploy
	@echo "deploy ended"

deploy: 
	@echo "running deploy" 
	sam deploy --stack-name video-ads-jenkins --template jenkinsIAMUser.yml --capabilities CAPABILITY_IAM CAPABILITY_AUTO_EXPAND CAPABILITY_NAMED_IAM 
