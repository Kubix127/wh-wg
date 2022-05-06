import React from 'react';
import {DragDropContext} from 'react-beautiful-dnd';

import Square from './square';
import Unit from './unit';


export default class Field extends React.Component {
	constructor(props){
		super(props);

		this.state={
			board: this.props.board,
			units: this.props.units,
			field: this.props.field,
		}
		// this.makeBoard = this.makeBoard.bind(this);
		// this.moveUnit = this.moveUnit.bind(this);
	}

	componentDidMount() {
		this.makeBoard();
		
	}

	componentDidUpdate() {
		console.log(this.state);

	}

	makeBoard() {
		const x = this.state.field.x;
		const y = this.state.field.y;
		const units = this.state.units;

		var board = [];
		var Id = 0;


		for (var i = 0; i < x; i++) {
			board.push([])
			for (var j = 0; j < y; j++) {
				var unit = units.find(element => element.x === i && element.y === j);
				// console.log(unit);
				board[i].push({Id: Id, x: i, y: j, unit: unit});
				Id++;
			}
		}
		this.setState({board: board});
	}


	onDragEnd(result) {
		const { destination, source, draggableId } = result;
		console.log(result);

		if (!destination) {
			return;
		}

	}


	render() {
		const board = this.state.board;
		return(
			<DragDropContext onDragEnd={this.onDragEnd}>
				<div id='field'>
					{board.map((row, index)=>{
						return (
							<div key={index}>
								{row.map(square => {
									return (
										<Square 
											square={square}
											key={square.x+'.'+square.y}
										/>
									)
								})}
							</div>
							)
					})}
				</div>
			</DragDropContext>
		)
	}
}