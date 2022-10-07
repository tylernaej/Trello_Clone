import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink, useHistory, useLocation } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const [active, setActive] = useState(false)
  const [missing, setMissing] = useState(true)
  const [emailActive, setEmailActive] = useState(false)
  const location = useLocation()
  const passedEmail = location?.email

  useEffect(()=>{
    if(passedEmail){
      setEmail(passedEmail)
    }
  }, [passedEmail])

  useEffect(() => {
    const validationErrors = []

    if(email.length > 100) validationErrors.push('Email must be less than 100 characters.')
    if(password !== repeatPassword) validationErrors.push('Passwords are not the same')
    if(username.length > 100) validationErrors.push('Username must be less than 100 characters')
    if(emailActive && !email.includes('@')) validationErrors.push('Please enter a valid email')
    if(password.length > 100) validationErrors.push('Password must be less than 100 characters.')
    if(repeatPassword.length > 100) validationErrors.push('Repeated password must be less than 100 characters.')

    setErrors(validationErrors)
  }, [username, email, password, repeatPassword])

  const onSignUp = async (e) => {
    e.preventDefault();
    if(errors.length > 0) return
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const handleGetStarted = (e) => {
    setActive(true)
  }

  useEffect(() => {
    if(username.length && password.length && repeatPassword.length && email.length){
      setMissing(false)
    }
    else{
      setMissing(true)
    }
  }, [username, email, password, repeatPassword])

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div id='form-exterior-container'>
      <div id='form-interior-container'>
        <div id='sign-up-title'>
          Sign Up
        </div>
        <form>
          <div>
            <div style={{marginTop:'15px'}}>
              <div>
                <label>User Name</label>
                {active && !username.length && (
                  <i className="fa-solid fa-asterisk fa-2xs"></i>
                )}
              </div>
              <input
                type='text'
                onClick={() => setActive(true)}
                name='username'
                onChange={updateUsername}
                value={username}
              ></input>
            </div>
            <div style={{marginTop:'15px'}}>
              <div>
                <label>Email</label>
                {active && !email.length && (
                  <i className="fa-solid fa-asterisk fa-2xs"></i>
                )}
              </div>
              <input
                type='text'
                name='email'
                onClick={() => setEmailActive(true)}
                onChange={updateEmail}
                value={email}
              ></input>
            </div>
            <div style={{marginTop:'15px'}}>
              <div>
                <label>Password</label>
                {active && !password.length && (
                  <i className="fa-solid fa-asterisk fa-2xs"></i>
                )}
              </div>
              <input
                type='password'
                name='password'
                onClick={() => setActive(true)}
                onChange={updatePassword}
                value={password}
              ></input>
            </div>
            <div style={{marginTop:'15px'}}>
              <div>
                <label>Repeat Password</label>
                {active && !repeatPassword.length && (
                  <i className="fa-solid fa-asterisk fa-2xs"></i>
                )}
              </div>
              <input
                type='password'
                name='repeat_password'
                onClick={() => setActive(true)}
                onChange={updateRepeatPassword}
                value={repeatPassword}
                required={true}
              ></input>
            </div>
            <div id='required-container'>
              {active && (!password.length || !email.length || !username.length || !repeatPassword.length) && (
                <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                  <i className="fa-solid fa-asterisk fa-2xs"></i>
                  <div style={{marginLeft: '3px', color: 'red'}}>required</div>
                </div>
              )}
              <div>
                {errors.map((error, ind) => (
                  <div key={ind} style={{color:'red'}}>{error}</div>
                ))}
              </div>
            </div>
            <div id='button-container'>
                {active && !missing && (
                  <div id='signup-submit-button' onClick={onSignUp}>Sign Up</div>
                )}
                {missing && (
                  <div id='signup-submit-button' onClick={handleGetStarted}>Get Started</div>
                )}       
            </div>
            <div className="have-an-account" >
              <span className="have-an-account-words">Already have an account? </span>
              <NavLink className="have-an-account-link" to={"/login"}>
                Log In
              </NavLink>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
