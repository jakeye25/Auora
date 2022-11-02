import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
import { signUp } from '../../../store/session';
import './SignUpForm.css'


const SignUpForm = ({setShowModal}) => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory()


  const onSignUp = async (e) => {
    e.preventDefault();
    // if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, avatar));
      if (data) {
        setErrors(data)
      } else {
        history.push('/home')
      // }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateAvatar = (e) => {
    setAvatar(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  // const updateRepeatPassword = (e) => {
  //   setRepeatPassword(e.target.value);
  // };




  if (user) {
    return <Redirect to='/home' />;
  }

  return (
    <div id='signupform-container'>
      <div  onClick={() => setShowModal(false)}><i class="fa-solid fa-x"></i></div>
      <h3>Sign up</h3>
        <form onSubmit={onSignUp} >
          <div className='signupform-item'>
            <label>Name</label>
            <input
            placeholder='What would you like to be called?'
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
            ></input>
          </div>
          <div className='signupform-item'>
            <label>Email</label>
            <input
            placeholder='Your email'
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
            ></input>
          </div>
          <div className='signupform-item'>
            <label>Avatar</label>
            <input
              placeholder='Your avatar url(optional)'
              type='text'
              name='avatar'
              onChange={updateAvatar? updateAvatar : 'https://www.kindpng.com/picc/m/421-4212275_transparent-default-avatar-png-avatar-img-png-download.png'}
              value={avatar}
            ></input>
          </div>
          <div className='signupform-item'>
            <label>Password</label>
            <input
            placeholder='Please enter your password'
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
            ></input>
          </div>
          {/* <div className='signupform-item'>
            <label>Repeat Password</label>
            <input
              placeholder='Please re-enter your password'
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          </div> */}
          <div >
            {errors.map((error, ind) => (
              <div className='signuperror' key={ind}>{error}</div>
            ))}
          </div>
          <div id='signupbtn-container'>
              <button className='signupbtn' type='submit'>Sign Up</button>
          </div>
        </form>
    </div>
  );
};

export default SignUpForm;
