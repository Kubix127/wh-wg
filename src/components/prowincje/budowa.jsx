import React from 'react';
import axios from 'axios';


export default class Budowa extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			miasto_Id: this.props.miasto_Id,
			budynki: this.props.budynki,
			desc: 0,
			clicked: false,
			popUpId: this.props.miasto_Id,
			Id_Budynek: '',
			queryAvailable: true,
		}
		this.onClick=this.onClick.bind(this);
		this.onChange=this.onChange.bind(this);
		this.build=this.build.bind(this);
	}

	componentDidMount(){
		 // console.log(this.props);
		const miasto = {
			Id: this.state.miasto_Id,
		}
		return axios
			.post('/api/users/prowincje/miasta/budowa', miasto)
			.then(response =>{
				this.setState({budynki: response.data});
				this.setState({Id_Budynek: response.data[0].Id_Budynek});
			})
			.catch(err => {
				console.log(err);
			})
	}

	componentDidUpdate(){
		// console.log(this.state)
		if (this.props.budynki.length===0 && this.state.Id_Budynek!==''){
				this.setState({Id_Budynek: ''});
		}

		if (this.props.budynki !== this.state.budynki) {
			this.setState({budynki: this.props.budynki});
			this.setState({Id_Budynek: this.props.budynki[0].Id_Budynek});
		}

		this.popUp();
	}


	onClick() {
		this.props.desc(this.state.popUpId)
		this.setState({clicked: !this.state.clicked})
	}

	onChange(e){
		this.setState({Id_Budynek: e.target.value});
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

	build(){
		if(this.state.Id_Budynek!=='' && this.state.queryAvailable){
			this.setState({queryAvailable: false});

			const budowa = {
				Id_Miasto: this.props.miasto_Id,
				Id_Budynek: this.state.Id_Budynek,
			}
			this.setState({Id_Budynek: ''});
			return axios
				.post('/api/users/budowa', budowa)
				.then(response =>{
					this.props.update();
					this.setState({queryAvailable: true});
					this.props.updateSkarbiec();
				})
				.catch(err => {
					console.log(err);
				})
		}
	}


	render() {
		return(
			<div>
				<div className='budynek budowa center' onClick={this.onClick}>
					+
				</div>
				{this.state.desc===1 && 
					<div className="popUp">
						<select value={this.state.Id_Budynek} onChange={this.onChange}>
							{this.state.budynki.map(budynek => 
								<option key={budynek.Id_Budynek} value={budynek.Id_Budynek} >
									{budynek.Nazwa}(T{budynek.Tier})-{budynek.Koszt}$
								</option>
							)}
						</select><br/>
						<div className='center'>
							<button onClick={this.build}>Budowa</button>
						</div>
					</div>
				}
				
			</div>
		)
	}
}