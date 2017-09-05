import React, {Component} from 'react';
import NavBar from './library/Navbar';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

class MainPage extends Component {
	render(){
		let navbar = null;
		if(this.props.isLoggedin){
			navbar = <NavBar/>
		}
		return (
			<div>
					{navbar}
					{this.props.children}
			</div>
		);
	}
}


MainPage.propTypes = {
	children: PropTypes.Component,
  isLoggedin: PropTypes.bool,
};


const mapStateToProps = store => {
    return {
				isLoggedin: store.authentication.isAuthenticated
    }
}
export default connect(
	mapStateToProps
)(MainPage);
