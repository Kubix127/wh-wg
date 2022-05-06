import React from 'react';
import axios from 'axios';

import DisplayEfekty from '../general/DisplayEfekty'

export default class PostEfekty extends React.Component {
	constructor(props){
		super(props);
	
		this.state = {
			wydarzenia_efekty: {
				Zakres: this.props.wydarzenia_efekty.Zakres,
				Zakres_Id: this.props.Zakres_Id,
				Obiekt: this.props.wydarzenia_efekty.Obiekt,
				Obiekt_Id: [],
				Prowincja: this.props.wydarzenia_efekty.Prowincja,
				Miasto: this.props.wydarzenia_efekty.Miasto,
				Budynek: this.props.wydarzenia_efekty.Budynek,
				Armia: this.props.wydarzenia_efekty.Armia,
				Jednostka: this.props.wydarzenia_efekty.Jednostka,
			} || '',
			efekty: [ this.props.efekty ||
				{
					Zakres: '',
					Zakres_value: '',
					Obiekt: '',
					Obiekt_value: '',
					Obiekty: [],  //Lista obiektów do wyboru
					Bonus: '',
					Bonus_value: '',
					Bonus_percent: false,
					Czas: '',
				},
			],
		}
		this.onClick=this.onClick.bind(this);
		this.onChange=this.onChange.bind(this);
		this.addEfekt=this.addEfekt.bind(this);
		this.getObiekty=this.getObiekty.bind(this);
		this.DeletEfekt=this.DeletEfekt.bind(this);
		// this.Submit=this.Submit.bind(this);
	}
	
	componentDidMount() {
		// console.log(this.props)
	}

	componentDidUpdate() {
		console.log(this.state.efekty)
	}

	onClick(e){
		this.setState({ edit: e.target.value});
	}
	onChange(e, Id){
		var target = e.target;

		if (target.name === 'Zakres') {
			this.setState(prevState => ({efekty: prevState.efekty.map((efekt,index)=> (index === Id ? Object.assign(efekt, {Zakres : target.value}, {Zakres_value : ''}, {Obiekt : ''}, {Obiekt_value : ''}, {Obiekty : ''}, {Bonus : ''}, {Bonus_value : ''})	: efekt))}));
		}
		if (target.name === 'Obiekt') {
			this.setState(prevState => ({efekty: prevState.efekty.map((efekt,index)=> (index === Id ? Object.assign(efekt, {Obiekt : target.value}, {Obiekt_value : ''}, {Obiekty : ''}, {Bonus : ''}, {Bonus_value : ''})	: efekt))}));
		}
		if (target.name === 'Bonus') {
			this.setState(prevState => ({efekty: prevState.efekty.map((efekt,index)=> (index === Id ? Object.assign(efekt, {Bonus : target.value}, {Bonus_value : ''})	: efekt))}));
		}
		if (target.name === 'Zakres_value' || target.name === 'Obiekt_value' || target.name === 'Bonus_value') {}
		this.setState(prevState => ({efekty: prevState.efekty.map((efekt, index) => (index===Id ? Object.assign(efekt, {[target.name] : target.value}) : efekt))}));
	}

	CheckBox(Id) {
		const Bonus_percent = !this.state.efekty[Id].Bonus_percent;
		this.setState(prevState => ({efekty: prevState.efekty.map((efekt,index)=> (index === Id ? Object.assign(efekt, {Bonus_percent: Bonus_percent}) : efekt))}));
	}

	addEfekt(e) {
		var efekty = this.state.efekty
		efekty.push({
					Zakres: '',
					Zakres_value: '',
					Obiekt: '',
					Obiekt_value: '',
					Obiekty: [],
					Bonus: '',
					Bonus_value: '',
					Bonus_percent: false,
					Czas: '',
				})
		// console.log('addEfetk',efekty)
		this.setState({efekty: efekty});
	}

	// Funkcja pobiera i zwraca Obiekty związane z wybranym zakresem
	getObiekty(Zakres, Zakres_value, Obiekt, efekt_Id) {
		const data = {
			Zakres: Zakres,
			Zakres_value: Zakres_value,
			Obiekt: Obiekt,
		};

		return axios
			.post('../api/wydarzenia/efekty/Obiekt', data)
			.then(response =>{
				this.setState(prevState => ({efekty: prevState.efekty.map((efekt, index) => (index===efekt_Id ? Object.assign(efekt, {Obiekty : response.data}) : efekt))}));
				})
				.catch(err => {
					console.log(err);
				})		
	}

	CopyEfekt(efekt, Id){
		var copy = this.state.efekty.slice(0);
		const efektCopy = {
			Zakres: efekt.Zakres,
			Zakres_value: efekt.Zakres_value,
			Obiekt: efekt.Obiekt,
			Obiekt_value: efekt.Obiekt_value,
			Obiekty: efekt.Obiekty,
			Bonus: efekt.Bonus,
			Bonus_value: efekt.Bonus_value,
			Bonus_percent: efekt.Bonus_percent,
		}
		copy.splice(Id,0,efektCopy)
		this.setState({efekty: copy});
	}

	DeletEfekt(Id){
		var copy = this.state.efekty.slice(0);
		copy.splice(Id,1)
		this.setState({efekty: copy});
	}

	render() {
		return (
				<div>
					<DisplayEfekty efekty={this.state.efekty}/>
					<form>
						<div className="flexBox">
								{this.state.efekty.map((efekt, efekt_Id) =>
									<div key={'efekt_'+efekt_Id} className='flexBox efektBox'>
										<div>
											<div>Zakres:</div>
											<select name='Zakres' value={efekt.Zakres} onChange={(e) => {this.onChange(e, efekt_Id)}}>
												<option value=''>	-- </option>
												{this.state.wydarzenia_efekty.Zakres.map((element, index) =>
													<option value={element.Nazwa} key={index}>
														{element.Nazwa}
													</option>
												)}
											</select>
											<select name='Zakres_value' value={efekt.Zakres_value} onChange={async (e) => {const change = new Promise(async(resolve_change)=>{this.onChange(e, efekt_Id);resolve_change()});await change; this.getObiekty(efekt.Zakres, efekt.Zakres_value, efekt.Obiekt, efekt_Id)}}>
												<option value=''>	-- </option>
												{this.state.wydarzenia_efekty.Zakres_Id[efekt.Zakres] && 
													this.state.wydarzenia_efekty.Zakres_Id[efekt.Zakres].map((element, index) =>
													<option value={element.Nazwa} key={index}>
														{element.Nazwa}
													</option>
												)}
											</select>
										</div>
										<div>
											<div>Obiekt:</div>
											<select name='Obiekt' value={efekt.Obiekt} onChange={async (e) => {const change = new Promise(async(resolve_change)=>{this.onChange(e, efekt_Id);resolve_change()});await change; this.getObiekty(efekt.Zakres, efekt.Zakres_value, efekt.Obiekt, efekt_Id)}}>
												<option value=''>	-- </option>
												{efekt.Zakres && this.state.wydarzenia_efekty.Obiekt.map((element, index) =>
													<option value={element.Nazwa} key={index}>
														{element.Nazwa}
													</option>
												)}
											</select>
											<select name='Obiekt_value' value={efekt.Obiekt_value} onChange={(e) => {this.onChange(e, efekt_Id)}}>
												<option value=''>	-- </option>
												{(efekt.Zakres && Array.isArray(efekt.Obiekty)) && efekt.Obiekty.map((element, index) =>
													<option value={element.Nazwa} key={index}>
														{element.Nazwa}
													</option>
												)}
											</select>
										</div>
										<div>
											<div>Bonus:</div>
											<select name='Bonus' value={efekt.Bonus} onChange={(e) => {this.onChange(e, efekt_Id)}}>
												<option value=''>	-- </option>
												{efekt.Obiekt==='Prowincja' && this.state.wydarzenia_efekty.Prowincja.map((element, index) =>
															<option value={element.Nazwa} key={index}>
																{element.Nazwa}
															</option>
														)}

												{efekt.Obiekt==='Miasto' && this.state.wydarzenia_efekty.Miasto.map((element, index) =>
															<option value={element.Nazwa} key={index}>
																{element.Nazwa}
															</option>
														)}

												{efekt.Obiekt==='Budynek' && this.state.wydarzenia_efekty.Budynek.map((element, index) =>
															<option value={element.Nazwa} key={index}>
																{element.Nazwa}
															</option>
														)}

												{efekt.Obiekt==='Armia' && this.state.wydarzenia_efekty.Armia.map((element, index) =>
															<option value={element.Nazwa} key={index}>
																{element.Nazwa}
															</option>
														)}

												{efekt.Obiekt==='Jednostka' && this.state.wydarzenia_efekty.Jednostka.map((element, index) =>
															<option value={element.Nazwa} key={index}>
																{element.Nazwa}
															</option>
														)}
											</select>
											<input type='number' name='Bonus_value' value={efekt.Bonus_value} onChange={(e) => {this.onChange(e, efekt_Id)}}/>
											<label>
											<input type='checkbox' name='Bonus_percent' checked={efekt.Bonus_percent} onChange={(e) => {this.CheckBox(efekt_Id)}}/>
												%
											</label>
										</div>
										<div>
											<div>Czas:</div>
											<input type='number' name='Czas' value={efekt.Czas} onChange={(e) => {this.onChange(e, efekt_Id)}}/>
										</div>
										<button type='button' onClick={(e)=>this.CopyEfekt(efekt, efekt_Id)}>Copy</button>
										<button type='button' onClick={(e)=>this.DeletEfekt(efekt_Id)}>Delet</button>
									</div>
								)}
						</div>
						<p><button type='button' onClick={this.addEfekt}>Dodaj efekt</button></p>
						<p><button type='button' onClick={()=>this.props.submitEfekty(this.state.efekty)}>Zapisz</button></p>
					</form>
				</div>
		)}
}

