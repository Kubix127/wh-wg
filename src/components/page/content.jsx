import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Main from '../main/main';
import Wydarzenia from './wydarzenia/wydarzenia';
import Nowosci from './updateLog/updateLog';
import Archiwa from './archiwa/archiwa';
import Prowincje from './prowincje/prowincje';
import Armie from './armie/armie';
import ArmiaEdycja from './armie/armiaEdycja';
import Agenci from './agenci/agenci';
import Mapa from './mapa/mapa';
import Technologia from './technologia/technologia';
import Relacje from './relacje/relacje';
import Profil from './profil/profil';




export default class content extends React.Component {
	constructor(props){
		super(props);

		this.state={
			Page: "Main",
		}
	}
	
	componentDidMount(){
		
	}

	componentDidUpdate() {
		//this.setState({Page: this.props.Page});
	}

	render() {
		return(
			<div className='height'>
				<div className="background">
					<div className="shadow"></div>
				</div>
				<div className="moveContent">
					<div id="content" className="content">
						<Switch>
								<Route path="/" exact component={Main} />
								<Route 
									path="/Wydarzenia" 
									render={(props)=>
										<Wydarzenia
											rola = {this.props.rola}
											wydarzenia_efekty = {this.props.wydarzenia_efekty}
											{...props}
										/>
									} 
								/>
								<Route path="/nowosci" exact component={Nowosci} />
								<Route path="/archiwa" exact component={Archiwa} />
								<Route 
									path="/prowincje" 
									exact 
									render={(props)=>
										<Prowincje 
											rekrutacja = {this.props.rekrutacja}
											prowincje = {this.props.prowincje}
											frakcja = {this.props.frakcja}
											updateSkarbiec = {this.props.updateSkarbiec}
											{...props	} 
										/>} 
								/>
								<Route 
									path="/armie" 
									exact 
									render={(props)=>
										<Armie 
											armie = {this.props.armie}
											frakcja = {this.props.frakcja}
											updateSkarbiec = {this.props.updateSkarbiec}
											{...props	} 
										/>}
								/>
								<Route
									path="/armia"
									render={(props)=>
										<ArmiaEdycja 
											frakcja = {this.props.frakcja}
											updateSkarbiec = {this.props.updateSkarbiec}
											{...props	} 
										/>}
								/>
								<Route path="/agenci" exact component={Agenci} />
								<Route 
									path="/mapa" 
									exact 
									component={Mapa} />
								<Route 
									path="/technologia" 
									exact 
									render={(props)=>
										<Technologia 
											technologie = {this.props.technologie[0]}
											links = {this.props.technologie[1]}
											updateSkarbiec = {this.props.updateSkarbiec}
											frakcja = {this.props.frakcja}
											{...props	} 
										/>}
								/>
								<Route path="/relacje" exact component={Relacje} />
								<Route path="/profil" exact component={Profil} />
							</Switch>
					</div>
				</div>
			</div>
		)
	}
}