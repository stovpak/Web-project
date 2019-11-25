import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FormErrors } from "./FormErrors";
export class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",
			formErrors: {
				username: "",
				password: "",
				email: "",
				/*isChecked: false,*/
				usernameValid: false,
				emailValid: false,
				passwordValid: false,
				formValid: false
			}
		};
		this.handleUserInput = this.handleUserInput.bind(this);
		/* this.handleChecked = this.handleChecked.bind(this);*/
	}
	handleUserInput = e => {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({ [name]: value }, () => {
			this.validateField(name, value);
		});
	};
	/*handleChecked(e) {
      this.setState({ isChecked: !this.state.isChecked });
      console.log(this.state.isChecked);
    }*/
	validateField(fieldName, value) {
		let fieldValidationErrors = this.state.formErrors;
		let usernameValid = this.state.usernameValid;
		let passwordValid = this.state.passwordValid;
		let emailValid = this.state.emailValid;

		switch (fieldName) {
			case "email":
				emailValid = value.match(
					/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
				);
				fieldValidationErrors.email = emailValid ? "" : "is invalid";
				break;
			case "username":
				usernameValid = value.match(/^[a-zA-Z0-9]+$/);
				fieldValidationErrors.username = usernameValid ? "" : "is invalid";
				break;
			case "password":
				passwordValid = value.length >= 6;
				fieldValidationErrors.password = passwordValid ? "" : "is too short";
				break;
			default:
				break;
		}
		this.setState(
			{
				formErrors: fieldValidationErrors,
				usernameValid: usernameValid,
				passwordValid: passwordValid,
				emailValid: emailValid
			},
			this.validateForm
		);
	}
	validateForm() {
		this.setState({
			formValid:
				this.state.usernameValid &&
				this.state.passwordValid &&
				this.state.emailValid
		});
	}
	errorClass(error) {
		return error.length === 0 ? "" : "has-error";
	}
	sing() {
		console.dir(this.setState());
		axios
			.post("/", {
				username: this.state.username,
				passsword: this.state.password,
				email: this.state.email
			})
			.then(
				response => {
					console.log(response);
					console.log(this.state);
				},
				error => {
					console.log(error);
				}
			);
	}
	render() {
		return (
			<form className="body-container" method="post">
				<h2 class="Login-form">Sign up</h2>
				<div className="panel panel-default">
					<FormErrors formErrors={this.state.formErrors} />
				</div>
				<div
					className={`form-group ${this.errorClass(
						this.state.formErrors.email
					)}`}
				>
					<label htmlFor="email-field">email address</label>
					<input
						type="email"
						required
						className="form-control"
						name="email"
						placeholder="email"
						value={this.state.email}
						id={"email-field"}
						onChange={this.handleUserInput}
					/>
				</div>
				<div
					className={`form-group ${this.errorClass(
						this.state.formErrors.username
					)}`}
				>
					<label htmlFor="username">Create your username</label>
					<input
						type="username"
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
				<button
					type="submit"
					className="btn btn-primary"
					onClick={e => {
						this.signup();
					}}
					disabled={!this.state.formValid}
				>
					Sign up
				</button>
				<div className="form-group">
					<Link to="/">I'm already member</Link>
				</div>
			</form>
		);
	}
}
export default Register;
