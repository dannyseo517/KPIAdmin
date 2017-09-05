import React, {Component} from 'react'
import TextBox from './library/TextBox'
import DateSelector from './library/DateSelector';
import {Row, Col} from 'react-flexbox-grid'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'


class CommentPage extends Component{
	constructor(props){
		super(props);
		this.props.dispatch;
		//bind events
		this.handleCommentBoxChange = this.handleCommentBoxChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			thisweek: '',
			nextweek: '',
			lastweek: '',
			date: '2017-09-01'
		}
	}
	handleSubmit(){
		fetch('http://localhost:8080/comments',
			{
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body:JSON.stringify({
					lastcomment: this.state.lastweek,
					thiscomment: this.state.thisweek,
					nextcomment: this.state.nextweek,
					token: this.props.token,
					username: this.props.userid,
					date: this.state.date
				})
			}).then((res) =>
				res.json()
			).then((json) => {
				console.log(json);
			});
	}
	handleCommentBoxChange(event){
		if(event.target.id == 'lastweek'){this.setState({lastweek: event.target.value})}
		if(event.target.id == 'thisweek'){this.setState({thisweek: event.target.value})}
		if(event.target.id == 'nextweek'){this.setState({nextweek: event.target.value})}
	}
	handleSelect(event){
		this.setState({date: event.target.value})
	}
	render(){
		return(
			<div className="root">
					<div className='sideComment'>
						<div className='commentDiv'>
							<DateSelector dateSelect={this.handleSelect.bind(this)}/>
							<TextBox id='lastweek' labelname="What did you do last week?" handleChange={this.handleCommentBoxChange}/>
							<TextBox id='thisweek' labelname="What did you do this week?" handleChange={this.handleCommentBoxChange}/>
							<TextBox id='nextweek' labelname="What are you going to do next week?" handleChange={this.handleCommentBoxChange}/>
							<button className='submitBtn' onClick={this.handleSubmit}>Submit</button>
						</div>
					</div>
			</div>
		)
	}
}


const mapStateToProps = store => {
	console.log(store);
    return {
				isAuthenticated: store.authentication.isAuthenticated,
				token: store.authentication.id_token,
				userid: store.authentication.userid
    }
}

CommentPage.propTypes = {
	dispatch: PropTypes.func,
  lastweek: PropTypes.string,
	thisweek: PropTypes.string,
	nextweek: PropTypes.string
};


export default connect(
	mapStateToProps
)(CommentPage);