import React from 'react';
import axios from 'axios';

import Miasto from './miasto';


export default class Prowincja extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			Id: this.props.prowincja.Id,
			Nazwa: this.props.prowincja.Nazwa,
			Edykt: {
				Id:	this.props.prowincja.Edykt,
				Nazwa: 'Brak',
				},
			Edykty: [],
			Przychód: this.props.prowincja.Przychód,
			Przeludnienie: this.props.prowincja.Przeludnienie,
			Przyrost: this.props.prowincja.Przyrost,
			Spaczenie: this.props.prowincja.Spaczenie,
			Ład: this.props.prowincja.Ład,
			Rozmiar: this.props.prowincja.Rozmiar,
			Rekrutacja: this.props.rekrutacja,
			Zabudowa: this.props.Zabudowa,
			Loaded: false,
		}
	}

	componentDidMount() {
		//this.getZabudowa();
		
	}

	componentDidUpdate() {
		//console.log(this.state)
	}

	getZabudowa() {
		const prowincja = {
			Id: this.state.Id,
		}
		return axios
			.post('/api/users/prowincje/zabudowa', prowincja)
			.then(response =>{
				this.setState({Zabudowa: response.data});
				this.setState({Loaded: true})
			})
			.catch(err => {
				console.log(err);
			})
	}

	getEdykty(){
		return axios
			.get('/api/users/prowincje/edykty')
			.then(response =>{
				this.setState({Edykty: response.data});
			})
			.catch(err => {
				console.log(err);
			})
	}

	render(){
		//if(this.state.Loaded) {
			return (
				<div>
							<div className="prowincja">
								<h3 className="title">
									{this.props.prowincja.Nazwa}
								</h3>
								<hr />
								<div>
									<ul>
										<li>Przychód: {this.state.Przychód}$</li>
										<li>Ład: {this.state.Ład}</li>
										<li>Spaczenie: {this.state.Spaczenie}</li>
										<li>Przyrost: {this.state.Przyrost}</li>
										<li>Przeludnienie: {this.state.Przeludnienie}</li>
									</ul>
									<hr />
									<div className="flexBox">
									{this.state.Zabudowa.map(miasto =>	// Wypisanie miast
										<Miasto 
											key={miasto[0].Id}
											miasto = {miasto[0]}
											prowincja_Id={this.state.Id} 
											desc={this.props.desc} 
											descId={this.props.descId}
											rekrutacja={this.state.Rekrutacja}
											zabudowa={miasto[1]}
											updateSkarbiec = {this.props.updateSkarbiec}
										/>
									)}									
									</div>
								</div>
							</div>
							<br />
						</div>
			)
		// } else {
		// 	return(
		// 		<div>
		// 			Loading...
		// 		</div>
		// 	)
		// }
	}
}

