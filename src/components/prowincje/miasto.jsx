import React from 'react';
import axios from 'axios';

import Budynki from './budynki';
import Budowa from './budowa';


export default class Miasto extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			Id: this.props.miasto.Id,
			Nazwa: this.props.miasto.Nazwa,
			Stolica: this.props.miasto.Stolica || null,
			Woda: this.props.miasto.Woda || null,
			Surowiec: this.props.miasto.Surowiec || null,
			Cena: this.props.miasto.Cena || null,
			budynki: this.props.zabudowa,
			budowa: [],
			loaded: 0,
		}
		this.updateProwincja=this.updateProwincja.bind(this);
	}

	componentDidMount(){
		this.updateBudowa();
		// console.log(this.props.zabudowa[0]);
		//console.log(this.state);
		//this.updateProwincja();
	}

	componentDidUpdate(){
	}

	updateProwincja() {		// Aktualizacja prowincji
		const miasto = {
			Id: this.state.Id,
		}
		return axios
			.post('/api/users/prowincje/miasta', miasto)
			.then(response =>{
				this.setState({budynki: response.data});
				this.updateBudowa();
			})
			.catch(err => {
				console.log(err);
			})
	}

	updateBudowa() {	// Aktualizacja możliwości budowy
		const miasto = {
			Id: this.state.Id,
		}
		return axios
			.post('/api/users/prowincje/miasta/budowa', miasto)
			.then(response =>{
				this.setState({budowa: response.data});
				this.setState({loaded: 1});
			})
			.catch(err => {
				console.log(err);
			})
	}

	render(){
		if(this.state.loaded)
		return (
					<div className="miasto" key={this.state.Id}>
						<h4 className="mtitle">
							{this.state.Nazwa}
						</h4>
						<hr/>
						<div>
							<Budynki // Kontener na budynki
								miasto_Id={this.state.Id} 
								desc={this.props.desc}
								descId={this.props.descId}
								rekrutacja={this.props.rekrutacja}
								budynki={this.state.budynki}
								update={this.updateProwincja}
								stolica={this.state.Stolica}
								updateSkarbiec = {this.props.updateSkarbiec}
							/>
							<Budowa  // Okienko budowy
								miasto_Id={this.state.Id}
								desc={this.props.desc} 
								descId={this.props.descId}
								update={this.updateProwincja}
								budynki = {this.state.budowa}
								updateSkarbiec = {this.props.updateSkarbiec}
							/>
						</div>
					</div>
		)
	return(
			<div>
				loading...
			</div>
		)
	}
}
