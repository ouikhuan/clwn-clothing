import React from 'react';
import SignIn from '../../components/signin/signin.component';
import SignUp from '../../components/sign-up/sign-up.component';
import { SignInAndSignUpContainer } from './signin-and-signup.styles';


const SignInAndSignUp = ()=>(
    <SignInAndSignUpContainer>
        <SignIn />
        <SignUp />
    </SignInAndSignUpContainer>
)

export default SignInAndSignUp;