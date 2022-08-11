import React from 'react';
// import {Droppable} from 'react-beautiful-dnd';

import Unit from './unit';



export default class Square extends React.Component {
	constructor(props){
		super(props);

		this.state={
			Id: this.props.square.Id,
			x: this.props.square.x,
			y: this.props.square.y,
			unit: this.props.square.unit,
		}
	}

	componentDidMount() {
		// console.log(this.props)
	}

	render() {
		const unit = this.state.unit;
		const x = this.state.x;
		const y = this.state.y;

		const isUnit = (typeof unit !== 'undefined');

		return(
			<div className='square'>
					{/* <Droppable droppableId={this.state.Id.toString()} coord={[x,y]}> */}
						{provided => (
							<div 
								ref={provided.innerRef}
								{...provided.droppableProps}
							>
							{(isUnit) && (
									<Unit 
										unit={unit} 
										index={this.state.Id}
									/>
							)}
								{provided.placeholder}
							</div>
						)}
					{/* </Droppable> */}
			</div>
		)
	}
}