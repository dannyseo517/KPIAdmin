import React, {Component} from 'react';
import PropTypes from 'prop-types'

class TextBox extends Component {
	render(){
		return(
			<div className='textBox'>
				<div>
          <label className='label'>{this.props.labelname}</label>
        </div>
        <div>
          <textarea id={this.props.id} type="text" onChange={this.props.handleChange}/>
        </div>
			</div>
		)
	}
}

TextBox.propTypes = {
  labelname: PropTypes.string,
	handleChange: PropTypes.func,
	id: PropTypes.string
};

export default TextBox;