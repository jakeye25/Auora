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
                        {/* <img id='loginpage-logo'
                        src='https://www.kindpng.com/picc/m/462-4620573_quora-quora-logo-hd-png-download.png'
                        alt='logo'></img> */}
                        <div id='loginpage-logodiv'>Auora</div>
                        <div id='loginsecondlinetext' >A place to share knowledge and better understand the world</div>
                    </div>
                    <div id='loginpage-middle'>
                        <div id='loginpage-middleleft'>
                            <div id='loginpage-middlelefttext'>By continuing you indicate that you agree to Auora’s Terms of Service and Privacy Policy.</div>
                            <Demouser/>
                            <SignupFormModal/>
                        </div>
                        <div id='loginpage-middleright'>

                            <LoginForm/>
                        </div>
                    </div>
                    <div id='loginpage-bottom'>
                        <div>About</div>

                        <div>
                            <i className="fa-brands fa-linkedin">&nbsp;</i>
                            <a
                            className="more_info_text"
                            href="https://www.linkedin.com/in/jake-ye-a2365250/"
                            target="_blank"
                            rel="noopener noreferrer"
                            >
                            Linkedin
                            </a>
                        </div>
                        <div>
                            <i className="fa-brands fa-square-github">&nbsp;</i>
                            <a
                            className="more_info_text"
                            href="https://github.com/jakeye25"
                            target="_blank"
                            rel="noopener noreferrer"
                            >
                            Github
                            </a>
                        </div>


                    </div>
                </div>
            </body>
        </>
    )

}


export default LoginPage;
