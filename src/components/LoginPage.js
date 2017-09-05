import React, {Component} from 'react';
import InputBox from './InputBox';
import { Link } from 'react-router-dom'
import fetch from 'node-fetch';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {requestLogin, receiveLogin, loginError} from '../actions'

class LoginPage extends Component{
	constructor(props){
		super(props);
		this.props.dispatch;
		this.state ={
			errormsg: '',
			authenticated: false,
		}
	}

	handleLogin(event){
		event.preventDefault();
		let creds = {
			"username": this.props.username,
			"password": this.props.password
		}
		this.props.dispatch(requestLogin(creds));
		fetch('http://localhost:8080/authenticate',
			{
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body:JSON.stringify({
					username: this.props.username,
					password: this.props.password
				})
			}).then((res) =>
				res.json()
			).then((json) => {
					let creds = {
						"username": this.props.username,
						"password": this.props.password
					}
					if(json.success == false){
						this.props.dispatch(loginError(this.creds));
						this.setState({errormsg:json.message})
					}
					else{
						sessionStorage.setItem('id', this.props.username)
						sessionStorage.setItem('id_token', json.token)
						// Dispatch the success action
						this.props.dispatch(receiveLogin(creds))
						this.setState({authenticated:true})
					}
				}
			);
	}

	handleUsernameChange(event){
		if(event.target.id == 'username') {
			this.props.username = event.target.value;
		}else if(event.target.id == 'password') {
			this.props.password = event.target.value;
		}
	}
	componentDidMount(){
		document.body.style.backgroundImage = "url('./images/bg.jpeg')";
	}
	componentWillUnmount(){
		document.body.style.backgroundImage = null;
	}
	render(){
		if(this.state.authenticated){
			return <Redirect push to="/home" />
		}
		return(
			<main className='login'>
				<div className='loginDiv'>
					<form onSubmit={this.handleLogin.bind(this)}>
						<h1>Login</h1>
						<div className='errorMsg'>{this.state.errormsg}</div>
						<InputBox id='username' type='text' labelname='Username' handleChange={this.handleUsernameChange.bind(this)} />
						<InputBox id='password' type='password' labelname='Password' handleChange={this.handleUsernameChange.bind(this)} />
						
						<div className='logindescription'>Enter your InfoMine computer username and password</div>
						<button type='submit' >Sign In</button>
					</form>
				 </div>
			</main>
		)
	}
}

LoginPage.propTypes = {
	username: PropTypes.string,
	password: PropTypes.string,
	errormsg: PropTypes.string
};

const mapStateToProps = store => {
    return {
        authenticated: store.authentication.authenticated,
				username: store.authentication.username,
				token: store.authentication.token
    }
}

export default connect(
	mapStateToProps
)(LoginPage);