import React from 'react';


export default class Icon extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			Rola: this.props.Rola,
		}
	}

	render(){
		return(
			<div>
				<img src={"/img/"+this.state.Rola+".png"} alt={this.state.Rola} />
				<h3>{this.state.Rola}</h3>
			</div>
		)
	}
}