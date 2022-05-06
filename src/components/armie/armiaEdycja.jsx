import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';


import Jednostki from './jednostki';


export default class ArmiaEdycja extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			Id: null,
			Nazwa: null,
			Rozmiar: null,
			Rekrutacja: null,
			Lokalizacja: null,
			Utrzymanie: null,
			Ruch: null,
			Działanie: null,
			działania: null,
			jednostki: null,
			isLoaded: false,
			descId: 0,
			Id_Rekrut: '',
			update: false,
		}
		this.changeDziałanie=this.changeDziałanie.bind(this);
		this.rekrutacja=this.rekrutacja.bind(this);
		this.onChangeRekrut=this.onChangeRekrut.bind(this);
		this.onChangeDziałanie=this.onChangeDziałanie.bind(this);
		this.showDesc=this.showDesc.bind(this);
	}

	componentDidMount() {
		this.getArmia();
	}

	componentDidUpdate() {
		// console.log(this.state);
	}




	getArmia() {
		return axios
			.get('/api/users/armia'+this.props.location.search)
			.then(response =>{
				this.setState({
					Id: response.data.armia.Id,
					Nazwa: response.data.armia.Nazwa,
					Rozmiar: response.data.jednostki.length,
					Rekrutacja: response.data.rekrutacja,
					Lokalizacja: response.data.armia.Lokalizacja,
					Utrzymanie: response.data.armia.Utrzymanie,
					Ruch: response.data.armia.Ruch,
					Działanie: response.data.armia.Działanie,
					działania: response.data.działania,
					jednostki: response.data.jednostki,
					Id_Rekrut: response.data.rekrutacja[0].Id,
					isLoaded: true,
					update: false
				});
			})
			.catch(err => {
				console.log(err);
			})
	}

	updateArmia() {
		return axios
			.get('/api/users/armia'+this.props.location.search)
			.then(response =>{
				this.setState({
					Nazwa: response.data.armia.Nazwa,
					Rozmiar: response.data.jednostki.length,
					Rekrutacja: response.data.rekrutacja,
					Lokalizacja: response.data.armia.Lokalizacja,
					Utrzymanie: response.data.armia.Utrzymanie,
					Ruch: response.data.armia.Ruch,
					Działanie: response.data.armia.Działanie,
					jednostki: response.data.jednostki,
				});
			})
			.catch(err => {
				console.log(err);
			})
	}

	showDesc(Id){
		this.setState({descId: Id});
	}

	onChangeRekrut(e){
		this.setState({Id_Rekrut: e.target.value});		
	}

	onChangeDziałanie(e){
		this.setState({Działanie: e.target.value});		
	}

	changeDziałanie() {
		var data = {
			Id_Armia: this.state.Id,
			Działanie: this.state.Działanie,
		}
		return axios
			.post('/api/users/armia/dzialanie', data)
			.catch(err => {
				console.log(err);
			})
	}

	rekrutacja() {
		if (this.state.Rozmiar<20) {
			return axios
				.post('/api/users/armia/rekrutacja', {Id_Rekrut: this.state.Id_Rekrut, Id_Armia: this.state.Id})
				.then(response => {
					this.updateArmia();
				})
				.catch(err => {
					console.log(err);
				})
		}
	}

	render() {
		if(this.state.isLoaded) {
				return (
				<div className='pad20'>
					<Link to="/Armie">
						{'<--Powrót'}
					</Link>
					<hr/>
					<div className='title'>
						{this.state.Nazwa}						
					</div>
					<div>
						Lokalizacja: {this.state.Lokalizacja}<br/>
						Działanie: <br/>
						<select value={this.state.Działanie} onChange={this.onChangeDziałanie}>
						{this.state.działania.map((działanie) =>
							<option key={działanie.Id}>{działanie.Nazwa}</option>
						)
						}
						</select>
						<button onClick={this.changeDziałanie}>
							OK
						</button><br/>
						Ruch: {this.state.Ruch}<br/>
						Utrzymanie: {this.state.Utrzymanie}<br/>
						Rozmiar: {this.state.Rozmiar}<br/>
						Rekrutacja:<br/>
						<select value={this.state.Id_Rekrut} onChange={this.onChangeRekrut}>
						{this.state.Rekrutacja.map((rekrut) =>
							<option key={rekrut.Id} value={rekrut.Id}>{rekrut.Nazwa}</option>
						)
						}
						</select>
						<button onClick={this.rekrutacja}>
							Rekrutacja
						</button>
					</div>
					<Jednostki 
						jednostki={this.state.jednostki}
						update = {this.state.update}
						desc={this.showDesc} 
						descId={this.state.descId}
						isEditable = {true}
					/>
				</div>
			)
		}
		else {
			return(
				<div>
					Loading...
				</div>
			)
		}
	}
}