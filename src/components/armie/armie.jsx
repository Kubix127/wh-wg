import React from 'react';

import Armia from './armia';
import FrakcjaSaldo from './frakcjaSaldo';


export default class Armie extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			armie: this.props.armie,
			descId: 0,
			loaded: false,
		}
		this.showDesc=this.showDesc.bind(this);
	}


	showDesc(Id){
		this.setState({descId: Id});
	}

	render() {
		return (
			<div>
				<FrakcjaSaldo 
					frakcja = {this.props.frakcja}
				/>
				<hr/>
				<div className='flexBox'>
					{this.state.armie.map(armia =>
						<div key={armia[0].Id}>
							<Armia 
								armia = {armia[0]}
								jednostki = {armia[1]}
								desc={this.showDesc} 
								descId={this.state.descId}
							/>
						</div>									
					)}
				</div>
			</div>
		)
}
}
