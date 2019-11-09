import React from 'react';
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
		this.setState({ username: e.target.value });
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
						<form onSubmit={(e) => this.handleSubmit(e)}>
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
									onChange={(e) => this.handleUserChange(e)}
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
									onChange={(e) => this.handlePasswordChange(e)}
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
				<div className='footer'>
					<button type='button' className='btn'>
						Login
					</button>
				</div>
			</div>
		);
	}
}
export default Login;
/*
// Render Prop
import React from 'react';
class MiniFormic extends React.Component {
	state = {
		values: this.props.initialValues || {},
		touched: {},
		errors: {}
	};
	handleChange = event => {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		event.persist();
		this.setState(prevState => ({
			values: { ...prevState.values, [name]: value }
		}));
	};
	handleBlur = event => {
		const target = event.target;
		const name = target.name;
		event.persist();
		this.setState(prevState => ({
			touched: { ...prevState.touched, [name]: true }
		}));
	};
	handleSubmit = e => {
		e.preventDefault();
	};
	render() {
		return this.props.children({
			...this.state,
			handleChange: this.handleChange,
			handleBlur: this.handleBlur
		});
	}
}
export class Reservation extends React.Component {
	render() {
		return (
			<MiniFormic
				initialValues={{
					isGoing: true,
					numberOfGuests: 2
				}}
				onSubmit={values => alert(JSON.stringify(values, null, 2))}>
				{props => {
					const {
						values,
						errors,
						touched,
						handleBlur,
						handleSubmit,
						handleChange
					} = props;
					return (
						<form onSubmit={handleSubmit}>
							<input
								name='isGoing'
								type='checkbox'
								className='checkbox'
								checked={values.isGoing}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<label>Is going:</label>
							<br />
							<label>
								Number of guests:
								<input
									name='numberOfGuests'
									type='number'
									value={values.numberOfGuests}
									onChange={handleChange}
									onBlur={handleBlur}
								/>
							</label>
							<pre>{JSON.stringify(props, null, 2)}</pre>
						</form>
					</div>
				</div>
			</div>
		);
	}
}
export default Login;

*/