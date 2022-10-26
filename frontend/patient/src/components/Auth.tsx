import * as React from 'react';
import { Authenticator, SelectField } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Box, Container } from '@mui/material';

const formFields = {
  signUp: {
    name: {
      order: 1
    },
    email: {
      order:2
    },
    birthdate: {
      order: 6,
    },
    password: {
      order: 3
    },
    confirm_password: {
      order: 4
    }
  },
 }
//  labelHidden: false,
//  label: 'Password:',
//  placeholder: 'Enter your Password:',
//  isRequired: false,
//  order: 2,

function Auth() {
  return (
    <Box display='flex' alignItems='center' justifyContent='center'>
      <Authenticator
      signUpAttributes={[
        'birthdate',
        'name'
      ]}
      components={{
        SignUp: {
          FormFields(){

            return(
              <>
                <Authenticator.SignUp.FormFields/>
                <SelectField labelHidden placeholder='Gender' label='gender' name='gender'>
                  <option value="male">male</option>
                  <option value="female">female</option>
                  <option value="unknown">Other</option>
                </SelectField>
              </>
            )
          }
        }
      }}
      formFields={formFields}
      socialProviders={['google']} 
      loginMechanisms={['email', 'phone_number']}
      >
        {({ signOut, user }) => {

          console.log('signing in')
          //@ts-ignore
          if(user.attributes && user.attributes.sub)
          //@ts-ignore
            localStorage.setItem('sub', user.attributes.sub);
          document.location = "/home";

          return(
          <></>
          )
      }}
      </Authenticator>
    </Box>
  );
}

export default Auth;