import React from 'react';

import Jednostka from './jednostka'

export default class Jednostki extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			jednostki: this.props.jednostki,
			desc: 0,
			descId: this.props.descId,
			clicked: false,
			popUpId: this.props.Id,
			Loaded: false,
		}
	}

	componentDidMount() {
		console.log(this.state);
	}


	componentDidUpdate() {
		if (this.props.jednostki.length !== this.state.jednostki.length) {
			this.setState({jednostki: this.props.jednostki});
		}
	}


	popUp(){
		if(this.props.descId===this.state.popUpId && this.state.desc===0 && this.state.clicked) {
			this.setState({desc: 1})
		} else if(this.props.descId===this.state.popUpId && this.state.desc===1 && !this.state.clicked) {
			this.setState({desc: 0})
		} else if(this.props.descId!==this.state.popUpId && this.state.desc===1 && !this.state.clicked){
			this.setState({desc: 0})
		} else if(this.props.descId!==this.state.popUpId && this.state.desc===1 && this.state.clicked){
			this.setState({desc: 0})
			this.setState({clicked: false})
		}	
	}

	render() {
		return (
			<div className='whitebox'>
				{this.state.jednostki.map((jednostka) =>
					<Jednostka 
						key={jednostka.Id}
						jednostka={jednostka}
						desc={this.props.desc}
						descId={this.props.descId}
						isEditable={this.props.isEditable}
						disband = {this.props.disband}
					/>
				)}
			</div>
		)
	}
}