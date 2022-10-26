const awsConfig = {
    Auth: {
      region: process.env.REACT_APP_AWS_REGION,
      userPoolId: process.env.REACT_APP_USER_POOL_ID,
      userPoolWebClientId: process.env.REACT_APP_USER_POOL_CLIENT_ID
    },
    API: {
      endpoints: [
        {
          name: "AppointmentApi",
          endpoint: `${process.env.REACT_APP_AD_SERVER_API_URL}`
        },
      ]
    }
  };
  
  export default awsConfig;