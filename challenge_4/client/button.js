import React from 'react';
import ReactDOM from 'react-dom';

class Button extends React.Component {
	constructor(props) {
		super(props);
	}
	buttonClick() {
		this.props.handleEntry(this.props.number);
	}
	render() {
		return (
		<div>
			<button onClick = {this.buttonClick.bind(this)}>
			{this.props.number}
			</button>
		</div>
		)
	}
}
export default Button;