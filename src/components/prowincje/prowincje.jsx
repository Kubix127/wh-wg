import React from 'react';
import axios from 'axios';

import Prowincja from './prowincja';
import FrakcjaSaldo from './frakcjaSaldo';

export default class Prowincje extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			prowincje: this.props.prowincje,
			descId: 0,
		}

		this.showDesc=this.showDesc.bind(this);

	}

	componentDidMount(){
		console.log(this.state.prowincje);

		return axios
			.get('/api/users/prowincje')
			.then(response =>{
				this.setState({prowincje: response.data});
			})
			.catch(err => {
				console.log(err);
			})
	}

	showDesc(Id){
		this.setState({descId: Id});
	}



	render(){
		if(this.state.prowincje[0]){
			return (
				<div>
					<FrakcjaSaldo 	// Wypisanie frakcyjnego salda
					frakcja = {this.props.frakcja}
					/>
					<hr/>
					{this.state.prowincje.map(prowincja =>	// Wypisanie prowincji
								<div key={prowincja[0].Id}>
									<Prowincja 
										prowincja = {prowincja[0]} 
										Zabudowa = {prowincja[1]}
										desc={this.showDesc} 
										descId={this.state.descId}
										rekrutacja={prowincja[2]}
										updateSkarbiec = {this.props.updateSkarbiec}
									/>
								</div>									
					)}
				</div>)
		}else {
			return(
				<div>
					Loading...
				</div>
			)
		}
	}
}
