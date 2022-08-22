import React from 'react';
import {Route, Redirect, BrowserRouter as Router, Switch} from 'react-router-dom';
import axios from 'axios';

import Banner from './components/page/banner';
import Menu from './components/page/menu';
import Content from './components/page/content';
import Footer from './components/page/footer';
import Login from './components/login/login';
import Battle from './components/battle/battle';



class App extends React.Component {

	constructor(props){
		super(props);
	
		this.state = {
			frakcja: [],
			prowincje: [],
			edykty: [],
			rekrutacja: [],
			armie: [],
			agenci: [],
			technologie: {
				nodes: [],
				links: []
			},
			bonusy: [],
			relacje: [],
			traktaty: [],
			wydarzenieNowe: null,
			wiadomościNowe: null,
			Loaded: 0,
			Rola: '',

			wydarzenia_efekty: '',
			page: {
				main: [],
				news: [],
				archive: [],
			},
		};
	
		this.logIn = this.logIn.bind(this);
		this.updateSkarbiec = this.updateSkarbiec.bind(this);
		this.getPages = this.getPages.bind(this);
	}

	componentDidMount() {
		this.logIn();
		if(this.state.Loaded){
			window.addEventListener('resize', function(){
				// Resize();
			});
		}
	}

	componentDidUpdate() {
		console.log(this.state)
	}

	logIn() {
		return axios
			.get("/api/users")
			.then(response =>{
				this.setState({Rola: response.data});
				if (response.data!=='Obserwator' && response.data!=='GM') {
					this.getFrakcja();
					this.getProwincje();
					this.getEdykty();
					this.getArmie();
					this.getTechTrees();
				}
				if (response.data==='GM') {
					this.getEfekty();
				}
				this.getPages();
				this.setState({Loaded: this.state.Loaded+1});
			})
			.catch(err => {
				console.log(err);
			})
	}

	getFrakcja() {
		return axios
			.get('/api/users/frakcja')
			.then(response =>{
				this.setState({frakcja: response.data[0]});
			})
			.catch(err => {
				console.log(err);
			})
	}

	getProwincje() {
		return axios
			.get('/api/users/prowincje')
			.then(response =>{
				this.setState({prowincje: response.data});
			})
			.catch(err => {
				console.log(err);
			})
	}

	getEdykty() {
		return axios
			.get('/api/users/prowincje/edykty')
			.then(response =>{
				this.setState({edykty: response.data});
			})
			.catch(err => {
				console.log(err);
			})
	}

	getArmie() {
		return axios
			.get('/api/users/armie')
			.then(response =>{
				this.setState({armie: response.data});
				//this.setState({Loaded: this.state.Loaded+1});
			})
			.catch(err => {
				console.log(err);
			})
	}

	getTechTrees() {
		return axios
			.get('/api/users/technologie')
			.then(response =>{
				this.setState({technologie: response.data});
				// console.log(response);
			})
			.catch(err => {
				console.log(err);
			})
	}

	getEfekty() {
		return axios
			.get('/api/wydarzenia/efekty')
			.then(response =>{
				this.setState({wydarzenia_efekty: response.data});
				// console.log(response.data);
			})
			.catch(err => {
				console.log(err);
			})
	}

	updateSkarbiec() {
	// Funkcja pobiera wartość skarbca i aktualizuje tę wartość na stronie
		return axios
			.get('/api/users/frakcja/skarbiec')
			.then(response =>{
				this.setState(prevState => ({
 					frakcja: {                
	        	...prevState.frakcja,    
	        	Saldo: response.data.Saldo     
				  }
				}))
			})
			.catch(err => {
				console.log(err);
			})
	}

	getPages() {
		return axios
			.get('/api/general/page')
			.then(response =>{
				console.log(response.data)
				const page = {
					main: response.data['main'] || [],
					news: response.data['news'] || [],
					archive: response.data['archive'] || [],
				}
				this.setState({page: page})
			})
			.catch(err => {
				console.log(err);
			})
	}


	render(){
		if(this.state.Loaded) {
			if(this.state.Rola){
				return(
					<div className='height'>
						<Router>
							<Switch>
								<Route path='/battle'>
									<Banner />
										<Menu 
											Rola={this.state.Rola} 
											logIn={this.logIn} 
										/>
										<main id='main'>		
											<Battle />
										</main>
									<Footer />
								</Route>
								<Route>
									<Banner />
										<Menu 
											Rola={this.state.Rola} 
											logIn={this.logIn} 
										/>
										<main id='main'>
										<Content
											page = {this.state.page}
											rekrutacja = {this.state.rekrutacja}
											prowincje = {this.state.prowincje}
											edykty = {this.state.edykty}
											armie = {this.state.armie}
											frakcja = {this.state.frakcja}
											technologie = {this.state.technologie}
											rola = {this.state.Rola}
											wydarzenia_efekty = {this.state.wydarzenia_efekty}
											updateSkarbiec = {this.updateSkarbiec}
										/>
										</main>
									<Footer />
								</Route>
							</Switch>
						</Router>
					</div>
				)
			} else if(this.state.Rola==="") {
				return(
					<div className='height'>
					<Router>
						<Redirect to={{pathname: "/Login"}} />
						<Route
							path="/Login"
							component={(props)=>
								<Login
									logIn={this.logIn}
									{...props	} 
								/>} 
						/>
					</Router>
					</div>
				)
			}
			// {this.setState({Loaded: 0})}
		}
		return(<div>Loading...</div>)
	}
}


export default App;