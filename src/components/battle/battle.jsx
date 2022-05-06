import React from 'react';

import Field from './field'
import './battle.css';

var units = [
	{
		Id: 1,
		Nazwa: 'X',
		x: 4,
		y: 4,
	},
	{
		Id: 2,
		Nazwa: 'Y',
		x: 5,
		y: 4,
	},
	{
		Id: 3,
		Nazwa: 'Z',
		x: 6,
		y: 4,
	},
	{
		Id: 4,
		Nazwa: 'W',
		x: 7,
		y: 4,
	},
];

const field = {
	x: 10,
	y: 10,
};

export default class Battle extends React.Component {
	constructor(props){
		super(props);

		this.state={
			units: units,
			field: field,
			board: [],
		}
	}

	render() {
		return(
			<div>
				<Field field={this.state.field} units={this.state.units} board={this.state.board}/>
			</div>
		)
	}
}