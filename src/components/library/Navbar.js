import React, {Component} from 'react';
import {connect} from 'react-redux';
import {requestLogout, receiveLogout} from '../../actions';

class Navbar extends Component{
	constructor(props){
		super(props)
		this.handleLogout = this.handleLogout.bind(this);
		this.props.dispatch;
	}

	handleLogout(event){
		event.preventDefault();
		this.props.dispatch(requestLogout());
		sessionStorage.removeItem('id');
		sessionStorage.removeItem('id_token');
		this.props.dispatch(receiveLogout());

	}
	render(){
		return(
			<div className='topnav' id='myTopnav'>
				<a className='navLogo' href="/home">KPI Admin</a>
				<a href="/comments">Comments</a>
				<a href="/data">Data</a>
				<a href="/Documentation">Documentations</a>
				<a href="/logout" onClick={this.handleLogout}>Logout</a>
			</div>
		)
	}
}

const mapStateToProps = store => {
	return {
		isAuthenticated: store.authentication.isAuthenticated
	}
}

export default connect(mapStateToProps)(Navbar);