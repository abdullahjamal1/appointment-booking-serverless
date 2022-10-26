# clinic-appointment-booking
A mock hospital appointment booking serverless full stack application demonstrating the use of courier API.


<p align="center">
    <img alt="Platform architecture diagram" src="images/service-level-architecture.png"/>
</p>

**High level infrastructure architecture**

<p align="center">
    <img alt="Platform architecture diagram" src="images/high-level-architecture.png"/>
</p>

## Backend

Back-end services that makes up the Serverless Airline functionalities as of now:

Service | Language | Description
------------------------------------------------- | ------------------------------------------------- | ---------------------------------------------------------------------------------
[Appointments](./backend/appointments/) | python | CRUD operations for creating appointments.

## Frontend

Frontend uses react-with typescript.

Service | Language | Description
------------------------------------------------- | ------------------------------------------------- | ---------------------------------------------------------------------------------
[Audience](./frontend/audience/) | React-Typescript | Application to test ad campaigns for authenticated users.

## Project structure

    backend
    ├── appointment
    frontend
    └── audience
    pipeline

## Technologies used

* HTML, Material-ui, Typescript, ReactJS
* Python
* Jenkins
* AWS (Lambda, dynamoDB, S3, API gateway, cloudformation, Cognito, CloudFront)

## Running the application

### Requirements
python >= 3.9.0 , [SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html) >= version 0.50.0,
AWS CLI

### Build and Deploy 

For creating a user to deploy the application, see [this](./pipeline/jenkinsIAMUser.yml) template.
To build and deploy the application in terminal run make command.

    make
