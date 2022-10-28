import React from 'react';
import Demouser from './auth/demouser';
import LoginForm from './auth/LoginForm';
import SignupFormModal from './auth/SignUpFormModal';



const LoginPage = () => {

    return (
        <>
            <SignupFormModal/>
            <LoginForm/>
            <Demouser/>
        </>
    )

}


export default LoginPage;
