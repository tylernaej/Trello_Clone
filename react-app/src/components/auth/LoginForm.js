import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink, useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import tiles from '../../assets/cells.jpg'
import './LoginForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const [active, setActive] = useState(false)
  const [missing, setMissing] = useState(true)
  const history = useHistory()

  useEffect(() => {
    const validationErrors = []

  }, [email, password])

  const onLogin = async (e) => {
    e.preventDefault();
    const payload = {
      email, 
      password
    }
    const data = await dispatch(login(payload));
    if (data) {
      setErrors(data);
    }
    history.push('/home')
  };

  const handleDemoLogin = async (e) => {
    e.preventDefault();
    const payload ={
      email: 'demo@aa.io',
      password: 'password'
    }
    const data = await dispatch(login(payload))
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleGetStarted = (e) => {
    setActive(true)
  }

  useEffect(() => {
    if(password.length && email.length){
      setMissing(false)
    }
    else{
      setMissing(true)
    }
  }, [password, email])

  if (user) {
    return <Redirect to='/home' />;
  }

  console.log(errors)

  return (
    <div id='form-exterior-container'>
      <div id='form-interior-container'>
        <div id='login-title'>
          Login
        </div>
        <form >
          <div>
            <div style={{marginTop:'15px'}}>
              <div id='email-label'>
                <label htmlFor='email'>Email</label>
                {active && !email.length && (
                  <i class="fa-solid fa-asterisk fa-2xs"></i>
                )}
              </div>
              <input
                required
                onClick={() => setActive(true)}
                name='email'
                type='text'
                placeholder='Email'
                value={email}
                onChange={updateEmail}
              />
            </div>
            <div style={{marginTop:'15px'}}>
              <div id='password-label'>
                <label htmlFor='password'>Password</label>
                {active && !password.length && (
                  <i className="fa-solid fa-asterisk fa-2xs"></i>
                )}
              </div>
              <input
                required
                onClick={() => setActive(true)}
                name='password'
                type='password'
                placeholder='Password'
                value={password}
                onChange={updatePassword}
              />
            </div>
            <div id='required-container'>
              {active && (!password.length || !email.length) && (
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
              <div 
                id='login-submit-button'
                onClick={handleDemoLogin}
              >
                Demo Login
              </div>        
              {active && !missing && (
                <div id='login-submit-button' onClick={onLogin}>Login</div>
              )}
              {missing && (
                <div id='login-submit-button' onClick={handleGetStarted}>Get Started</div>
              )}       
            </div>
            <div className='new-user'>
              <div style={{display: 'flex', justifyContent:'center', margin:'10px'}}><span className='no-account'>Don't have an account?  </span><NavLink className='new-to-yeat-link' to={'/sign-up'}>Sign Up!</NavLink></div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
