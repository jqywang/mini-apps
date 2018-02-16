import React from 'react';
import Button from './button.js';
var Numpad = ({numbers, handleEntry}) => (
	<span className = 'numpad'>
	{
		numbers.map((num) => (
			<Button number = {num} handleEntry = {handleEntry}/>
		))
	}
	</span>
)
export default Numpad;