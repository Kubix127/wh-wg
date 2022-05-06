import React from 'react';
// import axios from 'axios';

import Budynek from './budynek'

export default class Budynki extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			budynki: this.props.budynki || [],
		}
	}

	componentDidMount(){
		console.log(this.state);
		// const miasto = {
		// 	Id: this.props.miasto_Id,
		// }
		// return axios
		// 	.post('/api/users/prowincje/miasta/budynki', miasto)
		// 	.then(response =>{
		// 		this.setState({budynki: response.data});
		// 	})
		// 	.catch(err => {
		// 		console.log(err);
		// 	})
	}

	componentDidUpdate() {	//Update niemutualnych danych
		if (this.state.budynki !== this.props.budynki) { 
			this.setState({budynki: this.props.budynki});
		}
	}


	render(){
		return (
			<div>
				{this.state.budynki.map(budynek =>	// Wypisanie budynków
					<Budynek 
						key={budynek[0].Id_Budynek} 
						onClick={this.onClick} 
						budynek={budynek[0]} 
						miasto_Id={this.props.miasto_Id}
						desc={this.props.desc}
						descId={this.props.descId}
						rekrutacja={budynek[1]}
						prowincja_rekrutacja={this.props.rekrutacja}
						update = {this.props.update}
						stolica = {this.props.stolica}
						updateSkarbiec = {this.props.updateSkarbiec}
					/>
				)}
			</div>
		)
	}
}
