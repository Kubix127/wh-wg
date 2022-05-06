import React from 'react';
import axios from 'axios';


export default class Budynek extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			budynek: this.props.budynek,
			rekrutacja: this.props.rekrutacja,
			desc: 0,
			descId: this.props.descId,
			clicked: false,
			popUpId: this.props.miasto_Id+','+this.props.budynek.Id_Budynek,
			queryAvailable: true,
		}
		this.onClick=this.onClick.bind(this);
		this.deconstruct=this.deconstruct.bind(this);
		this.upgrade=this.upgrade.bind(this);
		this.deconstructStop=this.deconstructStop.bind(this);
		this.upgradeStop=this.upgradeStop.bind(this);

		
	}

	componentDidMount(){
		console.log(this.state);
	}

	componentDidUpdate(){
		this.popUp();
		if (this.state.budynek!==this.props.budynek) {	// Update niemutualnych danych
			this.setState({budynek: this.props.budynek});
		}
	}

	updateBudynek() {		// Aktualizacja stanu budynku
		this.props.update();
	}

	popUp(){	// Obsługa popUp`ów z opisem
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

	onClick() {		// Wywołanie popUp`u`
		this.props.desc(this.state.popUpId)
		this.setState({clicked: !this.state.clicked})
	}



	upgrade(){	// Obsługa ulepszania
		if(this.state.queryAvailable){ // Anty spam przycisku *Trzeba przenieść stan wyżej do prowincji?
			this.setState({queryAvailable: false});
			const budynek = {
				Id_Budynek: this.state.budynek.Id_Budynek,
				Id_Miasto: this.props.miasto_Id,
			}
			return axios
			.post('api/users/budynek/upgrade', budynek)
			.then(response =>{
					this.setState({clicked: false});
					this.setState({queryAvailable: true});
					this.updateBudynek();
					this.props.updateSkarbiec();
				})
				.catch(err => {
					console.log(err);
				})
		}
	}

	upgradeStop(){
		if(this.state.queryAvailable){
			this.setState({queryAvailable: false});
			const budynek = {
				Id_Budynek: this.state.budynek.Id_Budynek,
				Id_Miasto: this.props.miasto_Id,
			}
			return axios
			.post('api/users/budynek/stop', budynek)
			.then(response =>{
					this.setState({clicked: false});
					this.setState({queryAvailable: true});
					this.updateBudynek();
					this.props.updateSkarbiec();
				})
				.catch(err => {
					console.log(err);
				})
		}
	}

	deconstruct() {
		if(this.state.queryAvailable){
			this.setState({queryAvailable: false});
			const budynek = {
				Id_Budynek: this.state.budynek.Id_Budynek,
				Id_Miasto: this.props.miasto_Id,
			}
			return axios
			.post('api/users/budynek/deconstruct', budynek)
			.then(response =>{
					this.setState({clicked: false});
					this.setState({queryAvailable: true});
					this.updateBudynek();
				})
				.catch(err => {
					console.log(err);
				})
		}
	}

	deconstructStop() {
		if(this.state.queryAvailable){
			this.setState({queryAvailable: false});
			const budynek = {
				Id_Budynek: this.state.budynek.Id_Budynek,
				Id_Miasto: this.props.miasto_Id,
			}
			return axios
			.post('api/users/budynek/deconstruct/stop', budynek)
			.then(response =>{
					this.setState({clicked: false});
					this.setState({queryAvailable: true});
					this.updateBudynek();
				})
				.catch(err => {
					console.log(err);
				})
		}

	}

	checkRecruit(rekrut) {
		const rekrutacja =  this.props.prowincja_rekrutacja;

			if(rekrutacja.some(element => element.Id === rekrut.Id))
				return true;
		
	}

	render(){
		return (
			<div>
					<div onClick={this.onClick}>
						<div className="budynek">
							<div className="tier">
								{this.state.budynek.Tier}
							</div>
							{this.state.budynek.Czas>0 &&
								<div className="czas">
									⧖{this.state.budynek.Czas}
								</div>
							}
							{this.state.budynek.Czas<0 &&
								<div className="czas red">
									⧖{this.state.budynek.Czas*(-1)}
								</div>
							}
							<div className="title">
								{this.state.budynek.Nazwa} {this.id}
							</div>
						</div>
					</div>
						{this.state.desc===1 &&
							<div className="popUp">
								{this.state.budynek.Nazwa} Lv.{this.state.budynek.Tier}<br/>
								{this.state.budynek.Dochód &&
									<div>
										Dochód: {this.state.budynek.Dochód}$
									</div>	
								}
								{this.state.budynek.Przyrost &&
									<div>
										Przyrost: {this.state.budynek.Przyrost}
									</div>	
								}
								{this.state.budynek.Spaczenie &&
									<div>
										Spaczenie: {this.state.budynek.Spaczenie}
									</div>	
								}
								{this.state.budynek.Ład &&
									<div>
										Ład: {this.state.budynek.Ład}
									</div>	
								}
								{this.state.budynek.Wydobycie &&
									<div>
										Wydobycie: {this.state.budynek.Wydobycie}
									</div>	
								}
								{this.state.budynek.Id_Bonus &&
									<div>
										Id_Bonus: {this.state.budynek.Id_Bonus}
									</div>	
								}
								{this.state.budynek.Id_Rekrutacja &&
									<div>	
										<div>
											Rekrutacja:
										</div>
										{this.state.rekrutacja.map(rekrut =>
												this.checkRecruit(rekrut)
												?
												<div key={rekrut.Id}>
													-{rekrut.Nazwa}
												</div>
												:
												<div key={rekrut.Id} className='red'>
													-{rekrut.Nazwa}
												</div>
										)}
									</div>	
								}
								{this.state.budynek.Czas===0 &&
								<div className='center'>
								{((this.props.stolica && this.state.budynek.Tier>=3) || this.state.budynek.Tier<3) && this.state.budynek.Tier<5 &&
									<button onClick={this.upgrade}>Ulepsz</button>
								}
									<button onClick={this.deconstruct}>Rozbierz</button>
								</div>
								}
								{this.state.budynek.Czas>0 &&
								<div className='center'>
									<button onClick={this.upgradeStop}>Anuluj</button>
								</div>
								}
								{this.state.budynek.Czas<0 &&
								<div className='center'>
									<button onClick={this.deconstructStop}>Anuluj</button>
								</div>
								}
							</div>						
						}
			</div>
		)
	}
}
