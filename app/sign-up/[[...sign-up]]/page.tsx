import React from 'react';
import {
    SignUp
} from '@clerk/nextjs'

const SignUpPage = () => {
    return (
       <SignUp signInFallbackRedirectUrl="/journal" fallbackRedirectUrl="/new-user" />
    );
};

export default SignUpPage;