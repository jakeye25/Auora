import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpFormModal/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import LoginPage from './components/Loginpage';
import QuestionList from './components/Questions/QuestionList';
import QuestionDetailPage from './components/Questions/QuestionDetailPage';
import TopicList from './components/Topics/TopicList';
import TopicDetail from './components/Topics/TopicDetail';
import MyQuestionListings from './components/Questions/MyQuestionListing';
import MyAnswerListings from './components/Answers/MyAnswerListing';
import NotMyQuestionListings from './components/Questions/NotMyQuestionListing';



function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  let currentUser = useSelector(state => state.session.user)
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
    <BrowserRouter>
      {currentUser ? <NavBar /> : <></>}
      <Switch>
        <Route exact path="/myquestions">
            <MyQuestionListings />
        </Route>
        <Route exact path="/questions/:id">
            <QuestionDetailPage />
        </Route>
        <Route exact path="/topics/:topicName">
            <TopicDetail />
        </Route>
        <Route exact path="/topics">
            <TopicList />
        </Route>
        <Route exact path="/myanswers">
            <MyAnswerListings />
        </Route>
        <Route exact path="/answers">
            <NotMyQuestionListings />
        </Route>
        <Route path='/home' exact={true}>
          <QuestionList />
        </Route>
        <Route path='/' exact={true}>
          <LoginPage />
        </Route>

        {/* <Route path='/sign-up' exact={true}>
          <SignUpForm />
          </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <h1>My Home Page</h1>
        </ProtectedRoute> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
