import React from 'react';
import './App.css';

import Login from './components/login/login';
import { HashRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import Register from './components/login/register';

import { Login } from './components/login/login';
import { Login } from './components/login/login';

class App extends React.Component {
	render() {
		return (
			<Router basename='/react-auth-ui/'>
				<div className='App'>
					<div className='login'>
						<Route exact path='/' component={Login}></Route>
						<Route path='/sign-in' component={Register}></Route>
			<div className='App'>
				<div className='login'>
					<div className='container'>
						<Login />
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
