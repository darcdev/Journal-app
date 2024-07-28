import React from 'react';
import {
    SignIn
} from '@clerk/nextjs'

const SignInPage = () => {
    return (
       <SignIn fallbackRedirectUrl="/journal" signUpFallbackRedirectUrl="/new-user"/>
    );
};

export default SignInPage;