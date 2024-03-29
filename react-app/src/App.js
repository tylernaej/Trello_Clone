import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import { authenticate } from './store/session';
import User from './components/User';
import Home from './components/Pages/Home/home';
import Splash from './components/Pages/Splash/splash'
import Board from './components/Pages/Board/board';
import Workspace from './components/Pages/WorkSpace/workspace';
import './app.css'
import NotFound from './components/Pages/404/404';
import TestBoard from './components/Pages/TestBoard/testBoard';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter id='browser-router'>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/w/:workspaceId/b/:boardId'>
          <Board />
        </ProtectedRoute>
        <Route path='/testboard2/w/:workspaceId/b/:boardId'>
          <TestBoard/>
        </Route>
        <Route path='/testboard/w/:workspaceId/b/:boardId'>
          <TestBoard/>
        </Route>
        {/* <ProtectedRoute path='/w/:workspaceId'>
          <Workspace />
        </ProtectedRoute> */}
        <ProtectedRoute path='/home'>
          <Home />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <Splash />
        </Route>
        <Route path='*' >
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
