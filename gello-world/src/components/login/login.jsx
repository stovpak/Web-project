import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FormErrors } from "./FormErrors.js";
export class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",
			isChecked: true,
			formErrors: { username: "", password: "" },
			usernameValid: false,
			passwordValid: false,
			formValid: false
		};
	}
	handleUserInput = e => {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({ [name]: value }, () => {
			this.validateField(name, value);
		});
		this.setState({ value: e.target.username });
	};

	handleChecked(e) {
		this.setState({ isChecked: !this.state.isChecked });
		console.log(this.state.isChecked);
	}
	validateField(fieldName, value) {
		let fieldValidationErrors = this.state.formErrors;
		let usernameValid = this.state.usernameValid;
		let passwordValid = this.state.passwordValid;

		switch (fieldName) {
			case "username":
				usernameValid = value.match(/^[a-zA-Z0-9]+$/);
				fieldValidationErrors.username = usernameValid
					? ""
					: " используйте только a-z A-Z 0-9";

				break;
			case "password":
				passwordValid = value.length >= 6;
				fieldValidationErrors.password = passwordValid ? "" : " слишком короткий";

				break;
			default:
				break;
		}
		this.setState(
			{
				formErrors: fieldValidationErrors,
				usernameValid: usernameValid,
				passwordValid: passwordValid
			},
			this.validateForm
		);
	}

	validateForm() {
		this.setState({
			formValid: this.state.usernameValid && this.state.passwordValid
		});
	}

	errorClass(error) {
		return error.length === 0 ? "" : "has-error";
	}
	sing() {
		axios
			.post("/", {
				username: this.state.username,
				passsword: this.state.password
			})
			.then(
				response => {
					console.dir(response);
					console.dir(this.state.username);
				},
				error => {
					console.dir(error);
				}
			);
	}
	render() {
		return (
			<form className="body-container" method="post">
				<h2 class="Login-form">Sign in</h2>

				<div className="panel panel-default">
					<FormErrors formErrors={this.state.formErrors} />
				</div>
				<div
					className={`form-group ${this.errorClass(
						this.state.formErrors.username
					)}`}
				>
					<label htmlFor="username">username address</label>
					<input
						type="username"
						required
						className="form-control"
						name="username"
						placeholder="username"
						value={this.state.username}
						onChange={this.handleUserInput}
					/>
				</div>
				<div
					className={`form-group ${this.errorClass(
						this.state.formErrors.password
					)}`}
				>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						className="form-control"
						name="password"
						placeholder="Password"
						value={this.state.password}
						onChange={this.handleUserInput}
					/>
				</div>
				<div className="form-group">
					<input
						type="checkbox"
						name="checkbox"
						id="checkbox-field"
						onChange={e => this.handleChecked(e)}
					/>
					Remember me
				</div>
				<button
					type="submit"
					className="btn btn-primary"
					onClick={e => {
						this.sing();
					}}
					disabled={!this.state.formValid}
				>
					Sign up
				</button>
				<div className="form-group">
					<Link to="/sign-in">Create an account</Link>
				</div>
			</form>
		);
	}
}
export default Login;