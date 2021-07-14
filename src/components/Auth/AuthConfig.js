const awsConfig = {
  Auth: {
    identityPoolId: process.env.REACT_APP_SSO_COGNITO_IDENTITY_POOL_ID,
    region: process.env.REACT_APP_SSO_AWS_PROJECT_REGION,
    userPoolId: process.env.REACT_APP_SSO_USER_POOLS_ID,
    userPoolWebClientId: process.env.REACT_APP_SSO_USER_POOLS_WEB_CLIENT_ID,
  },
  oauth: {
    domain: 'ascending-demo-azure.auth.us-east-1.amazoncognito.com',
    scope: ['email', 'openid'],
    redirectSignIn: 'http://localhost:3000/',
    redirectSignOut: 'http://localhost:3000/',
    responseType: 'token',
  },
};

export default awsConfig;
