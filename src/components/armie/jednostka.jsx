import React from 'react';
// import axios from 'axios';


export default class Jednostka extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			Id: this.props.jednostka.Id,
			Nazwa: this.props.jednostka.Nazwa,
			Dyscyplina: this.props.jednostka.Dyscyplina,
			Hp: this.props.jednostka.Hp,
			maxHp: this.props.jednostka.maxHp,
			Atak: this.props.jednostka.Atak,
			Poziom: this.props.jednostka.Poziom,
			Koszt: this.props.jednostka.Koszt,
			Utrzymanie: this.props.jednostka.Utrzymanie,
			Frakcja: this.props.jednostka.Frakcja,
			Rodzaj: this.props.jednostka.Rodzaj,
			desc: 0,
			descId: this.props.descId,
			clicked: false,
			popUpId: this.props.jednostka.Id,
			Loaded: false,
			isEditable: false || this.props.isEditable,
		}
		this.onClick=this.onClick.bind(this);
		// this.rozwiąż=this.rozwiąż.bind(this);
	}

	componentDidMount() {
		// console.log(this.state);
	}

	componentDidUpdate(){
		this.popUp();
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

	onClick() {
		this.props.desc(this.state.popUpId)
		this.setState({clicked: !this.state.clicked})
	}




	render() {
		return (
			<div className='whitebox' >
				<div onClick={this.onClick} className='center pad5'>
					<div>
						{this.state.Nazwa}
					</div>
					<div>
						{this.state.Hp}/{this.state.maxHp}
					</div>
					<div>
						Lv.{this.state.Poziom}
					</div>
				</div>
				{this.state.desc===1 &&
					<div className='popUp'>
						{this.state.Nazwa}<br/>
						{this.state.Rodzaj}<br/>
						Poziom: {this.state.Poziom}<br/>
						Hp: {this.state.Hp}/{this.state.maxHp}<br/>
						Atak: {this.state.Atak}<br/>
						Dyscyplina: {this.state.Dyscyplina}<br/>

						{this.state.isEditable &&
							<p>
								<button onClick={this.props.disband}>
									Rozwiąż
								</button>
							</p>
						}
					</div>
				}

			</div>
		)
	}
}