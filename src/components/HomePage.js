import React, {Component} from 'react';
import DateSelector from './library/DateSelector'
class HomePage extends Component{
	constructor(props){
		super(props);
		this.state = {
			imgName: './images/' + '2017-09-01.png'
		}
	}

	handleSelect(event){
		this.setState({imgName: './images/' + event.target.value + '.png'})
	}

	render(){
		return(
			<div className='homePage'>
				<DateSelector dateSelect={this.handleSelect.bind(this)}/>
				<img className='dashboardimg' src={this.state.imgName} />
			</div>
		)
	}
}

export default HomePage;