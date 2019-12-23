import React from 'react';
import SignIn from '../../components/sign-in/sign-in';
import SignUp from '../../components/sign-up/sign-up';

import './signIn-signUp.scss';

const SignInSignUp= () =>(
    <div className='signIn-signUp'>
        <SignIn/>
        <SignUp/>
    </div>
);

export default SignInSignUp;