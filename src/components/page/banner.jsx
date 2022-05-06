import React from 'react';
import { NavLink } from 'react-router-dom';

function banner() {
	return (
		<header id="Banner">
			<h1><NavLink exact to="/">Warhammer WG</NavLink></h1>
		</header>
	)
}

export default banner;