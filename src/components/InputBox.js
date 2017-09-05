import React, {Component} from 'react';
import PropTypes from 'prop-types'

class InputBox extends Component {
	render(){
		return(
			<div className='inputBox'>
				<div>
          <label className='label'>{this.props.labelname}</label>
        </div>
        <div>
          <input id={this.props.id} type={this.props.type} onChange={this.props.handleChange} />
        </div>
			</div>
		)
	}
}

InputBox.propTypes = {
  labelname: PropTypes.string,
	handleChange: PropTypes.func,
	id: PropTypes.string,
	type: PropTypes.string
};

export default InputBox;