import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import Cookies from 'universal-cookie';


import ProfileIcon from '../profil/profileIcon'

function RenderNav(refresh, role) {
	if (role==="Obserwator") {
		return(
			<ul>
				<li><NavLink exact to="/main">Strona Główna</NavLink></li>
				<li><NavLink to="/Wydarzenia">Wydarzenia</NavLink></li>
				<li><NavLink to="/Nowosci">Nowości</NavLink></li>
				<li><NavLink to="/Archiwa">Archiwa</NavLink></li>
			</ul>
		)
	} else if (role==="GM") {
		return(
			<ul>
				<li><NavLink exact to="/main">Strona Główna</NavLink></li>
				<li><NavLink to="/Wydarzenia">Wydarzenia</NavLink></li>
				<li><NavLink to="/Nowosci">Nowości</NavLink></li>
				<li><NavLink to="/Archiwa">Archiwa</NavLink></li>
			</ul>
		)
	} else {
		return (
			<ul>
				<li><NavLink exact to="/main">Strona Główna</NavLink></li>
				<li><NavLink to="/Wydarzenia">Wydarzenia</NavLink></li>
				<li><NavLink to="/Nowosci">Nowości</NavLink></li>
				<li><NavLink to="/Archiwa/">Archiwa</NavLink></li>
				<li><NavLink to="/Prowincje">Prowincje</NavLink></li>
				<li><NavLink to="/Armie">Armia</NavLink></li>
				{/*<li><NavLink to="/Agenci">Agenci</NavLink></li>*/}
				<li><NavLink to="/Mapa">Mapa</NavLink></li>
				<li><NavLink to="/Technologia">Technologia</NavLink></li>
				<li><NavLink to="/Relacje">Relacje</NavLink></li>
				<li><NavLink to="/battle">battle</NavLink></li>
			</ul>
		)
	}
}



function openMenu(){
	const menu = document.getElementById("menu");
	const nav = document.getElementById("nav");
	const banner = document.getElementById("Banner");
	const main = document.getElementById("main");
	const footer = document.getElementById("footer");

	menu.classList.toggle("active");
	nav.classList.toggle("active");
	banner.classList.toggle("active");
	main.classList.toggle("active");
	footer.classList.toggle("active");
}




export default class Menu extends React.Component {
	constructor(props){
		super(props);
		this.state={
			Rola: this.props.Rola,
		}
	}

	logOut() {
		const cookies = new Cookies();
		cookies.remove('Gracz_Id', { path: '/' });
	}

	render(){
		return (
			<div>
				<div id="menu" onClick={openMenu} />
				<nav id="nav">
					{RenderNav(this.props.refresh, this.state.Rola)}
					<div className="profile">
						<Link to='/Profil'>
							<ProfileIcon Rola={this.state.Rola} />
						</Link>
						<button onClick={() => {this.logOut(); this.props.logIn();}}>Wyloguj</button>
					</div>
				</nav>
			</div>
		)	
	}
}
