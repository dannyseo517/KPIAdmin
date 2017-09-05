import React from 'react';
import ReactDOM from 'react-dom';
import MainPage from './components/MainPage';
import CommentPage from './components/CommentPage';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import DataPage from './components/DataPage';
import NotFound from './components/NotFound'
import { createStore } from 'redux'
import mainPanelApp from './reducers'
import { Provider } from 'react-redux'
import {Switch, Route, Redirect } from 'react-router'
import {BrowserRouter} from 'react-router-dom'

require('../public/styles/master.scss');

let store = createStore(
		mainPanelApp
)

//Route to login if user is not logged in
const PrivateRoute = ({ component: Component}) => (
  <Route render={props => (
    store.getState().authentication.isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)


//Route login page to comments page if user is logged in
const PublicRoute = ({ component: Component}) => (
  <Route render={props => (
    store.getState().authentication.isAuthenticated ? (
			<Redirect to={{
        pathname: '/home',
        state: { from: props.location }
      }}/>
    ) : (
      <Component {...props}/>
    )
  )}/>
)


ReactDOM.render(
  <Provider store={store}>
		<MainPage>
			<BrowserRouter>
				<Switch>
					<PublicRoute path='/login' component={LoginPage} />
					<Redirect exact from='/' to='/login' push />
					<PrivateRoute exact path='/home' component={HomePage}/>
					<PrivateRoute exact path='/comments' component={CommentPage}/>
					<PrivateRoute exact path='/data' component={DataPage} />
					<Route path="*" component={NotFound}/>
				</Switch>
			</BrowserRouter>
		</MainPage>
  </Provider>,
  document.getElementById('root')
);

