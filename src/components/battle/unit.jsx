import React from 'react';
// import {Draggable} from 'react-beautiful-dnd';



export default class Unit extends React.Component {
	constructor(props){
		super(props);

		this.state={
			Id: this.props.unit.Id,
			Nazwa: this.props.unit.Nazwa,

		}
	}

	componentDidMount() {
		console.log(this.props)
	}

	render() {
		return(<></>
			// // <Draggable draggableId={this.state.Id.toString()} index={this.props.index}>
			// 	{provided => (
			// 		<div
			// 			{...provided.draggableProps}
      //       {...provided.dragHandleProps}
      //       ref={provided.innerRef}
			// 		>
			// 			{this.state.Nazwa}
			// 		</div>
			// 	)}
			// // </Draggable>
		)
	}
}