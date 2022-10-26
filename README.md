# video-ads-suite
A mock hospital appointment booking serverless full stack application demonstrating the use of courier API.


<p align="center">
    <img alt="Platform architecture diagram" src="images/service-level-architecture.png"/>
</p>

**High level infrastructure architecture**

<p align="center">
    <img alt="Platform architecture diagram" src="images/high-level-architecture.png"/>
</p>

## Demo

#### [Advertiser application](https://d1vx6hhgvjfh6e.cloudfront.net/)

#### [Audience application](https://d1hi57m87oe7fq.cloudfront.net/)

## Backend

Back-end services that makes up the Serverless Airline functionalities as of now:

Service | Language | Description
------------------------------------------------- | ------------------------------------------------- | ---------------------------------------------------------------------------------
[Campaigns](./backend/campaigns/) | python | CRUD operations for creating ad campaigns.
[Ads](./backend/ads/) | python | CRUD operations for creating video ads.
[layers](./backend/shared/) | python | A layer is a file archive that contains libraries, a custom runtime, or other dependencies. With layers, you can use libraries in your function without needing to include them in a deployment package.
[Analytics](./backend/analytics/) | python | Provides analytics for impressions, clicks etc.
[Platform](./backend/platform/) | python | integrates different microservices with each other
[Pipeline](./backend/pipeline/) | python | processes metrics from adserver and passes downstream (to platform) hourly.
[Users](./backend/users/) | yml | handles authentication and manages user pools.
[Ad Server](./backend/adServer/) | python | Provides a vast compliant interface for serving and tracking video ads

## Frontend

Frontend uses react-with typescript to build video-ad dashboard.

Service | Language | Description
------------------------------------------------- | ------------------------------------------------- | ---------------------------------------------------------------------------------
[Advertiser](./frontend/advertiser/) | React-Typescript | Dashboard to create and monitor ad campaigns
[Audience](./frontend/audience/) | React-Typescript | Application to test ad campaigns for authenticated users.

## Project structure

    backend
    ├── adServer
    ├── ads
    ├── analytics
    ├── campaigns
    ├── pipeline
    ├── platform
    ├── shared
    └── users
    frontend
    ├── advertiser
    └── audience
    pipeline

## Technologies used

* HTML, Material-ui, Typescript, ReactJS
* Python
* Jenkins
* AWS (Lambda, dynamoDB, S3, mediaconvert, sns, sqs, kinesis-firehose, EC2, RDS-aurora-mysql, API gateway, Eventbridge, Athena, cloudformation, Cognito, CloudFront)

## Running the application

### Requirements
python >= 3.9.0 , [SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html) >= version 0.50.0,
AWS CLI

### Build and Deploy 

For creating a user to deploy the application, see [this](./pipeline/jenkinsIAMUser.yml) template.
To build and deploy the application in terminal run make command.

    make
