import React from 'react';
import {Link} from 'react-router-dom';


import Jednostki from './jednostki';

export default class Armia extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			Id: this.props.armia.Id,
			Nazwa: this.props.armia.Nazwa,
			Rozmiar: this.props.jednostki.length,
			Rekrutacja: this.props.armia.Rekrutacja,
			Lokalizacja: this.props.armia.Lokalizacja,
			Utrzymanie: this.props.armia.Utrzymanie,
			Ruch: this.props.armia.Ruch,
			Działanie: this.props.armia.Działanie,
			jednostki: this.props.jednostki,
			Loaded: false,
		}
	}

	componentDidMount() {
		console.log(this.state);
	}


	render() {
		return (
			<div className='pad20'>
				<div className='armia table'>
					<div className='title'>
						{this.state.Nazwa}						
					</div>
					<div>
						Lokalizacja: {this.state.Lokalizacja}<br/>
						Działanie: {this.state.Działanie}<br/>
						Ruch: {this.state.Ruch}<br/>
						Utrzymanie: {this.state.Utrzymanie}<br/>
						Rozmiar: {this.state.Rozmiar}
					</div>
					<Link 
						to={{
							pathname: '/Armia',
							search: '?Id='+this.state.Id
						}}
					>
						<button>
							Zarządzaj
						</button>
					</Link>
					<Jednostki 
						jednostki={this.state.jednostki}
						desc={this.props.desc} 
						descId={this.props.descId}
					/>
				</div>
			</div>
		)
	}
}