import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			isChecked: false
		};
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleUserChange = this.handleUserChange.bind(this);
		this.handleChecked = this.handleChecked.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleUserChange(e) {
		this.setState({ username: e.target.value });
		if (this.state.username === 'admin') {
			alert('vitayu');
		} else {
			alert('idi fuksai trabl');
		}
		console.log(this.state.username);
	}

	handlePasswordChange(e) {
		this.setState({ password: e.target.value });
		console.log(this.state.password);
	}
	handleChecked() {
		this.setState({ isChecked: !this.state.isChecked });
		console.dir(this.state.isChecked);
	}

	handleSubmit(e) {
		e.preventDefault();
		console.dir(this.state);
	}

	signin() {
		axios
			.post('/', {
				username: this.state.username,
				passsword: this.state.password
			})
			.then(
				response => {
					console.log(response);
				},
				error => {
					console.log(error);
				}
			);
	}

	render() {
		return (
			<div className='body-container'>
				<h2 className='login-form'>Sing In</h2>
				<div className='content'>
					<div className='form'>
						<form onSubmit={e => this.handleSubmit(e)} method='post'>
							<div className='form-group'>
								<label htmlFor='username-field'>Username</label>
								<input
									type='text'
									name='username'
									className='form-control'
									id='username-field'
									value={this.state.username}
									placeholder='username'
									onChange={e => this.handleUserChange(e)}
								/>
							</div>
							<div className='form-group'>
								<label htmlFor='password-field'>Password</label>
								<input
									type='password'
									name='password'
									id='password-field'
									value={this.state.password}
									className='form-control'
									placeholder='password'
									onChange={e => this.handlePasswordChange(e)}
								/>
							</div>
							<div className='form-group'>
								<input
									type='checkbox'
									name='checkbox'
									id='checkbox-field'
									onChange={this.handleChecked}
								/>
								Remember me
							</div>
							<div className='form-group'>
								<button
									type='button'
									onClick={e => this.signin()}
									className='btn btn-primary btn-block'>
									Sign in
								</button>
							</div>
							<div className='form-group'>
								<Link to='/sign-in'>Create an account</Link>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}
export default Login;
