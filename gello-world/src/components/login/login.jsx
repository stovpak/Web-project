/*import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Login extends React.Component {
	constructor(props) {
		super(props);
		this.setState = {
			username: '',
			password: ''
		};
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleUserChange = this.handleUserChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleUserChange(e) {
		console.log(this.setState({ username: e.target.value }));
	}
	handlePasswordChange(e) {
		this.setState({ password: e.target.value });
	}
	handleSubmit(e) {
		e.preventDefault();
		console.log('server worj');
		console.log(this.state);
	}

	render() {
		return (
			<div className='base-container'>
				<div className='header'>Login</div>
				<div className='content'>
					<div className='form'>
						<form onSubmit={this.handleSubmit}>
							<div className='form-group'>
								<label htmlFor='username'>Username</label>
								<input
									type='text'
									name='username'
									placeholder='username'
									onChange={this.handleUserChange}
								/>
							</div>
							<div className='form-group'>
								<label htmlFor='password'>Password</label>
								<input
									type='password'
									name='password'
									placeholder='password'
									onChange={this.handlePasswordChange}
								/>
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
export default Login;*/
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
					);
				}}
			</MiniFormic>
		);
	}
}
