import React from 'react';
import Demouser from './auth/demouser';
import LoginForm from './auth/LoginForm';
import SignupFormModal from './auth/SignUpFormModal';
import './Loginpage.css'

const LoginPage = () => {

    return (
        <>
            <body id='loginbody'>
                <div id='login_container'>
                    <div id='loginpage-top'>
                        <img id='loginpage-logo'
                        src='https://www.kindpng.com/picc/m/462-4620573_quora-quora-logo-hd-png-download.png'
                        alt='logo'></img>
                        <h3>A place to share knowledge and better understand the world</h3>
                    </div>
                    <SignupFormModal/>
                    <LoginForm/>
                    <Demouser/>
                </div>
            </body>
        </>
    )

}


export default LoginPage;
