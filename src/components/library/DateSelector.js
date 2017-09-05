import React, {Component} from 'react';

class DateSelector extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div>
				<select className={this.props.name} onChange={this.props.dateSelect}>
					<option value='2017-09-01'>2017-09-01</option>
					<option value='2017-08-25'>2017-08-25</option>
					<option value='2017-08-21'>2017-08-21</option>
				</select>
			</div>
		)
	}
}

export default DateSelector;