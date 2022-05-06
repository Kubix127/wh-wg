import React from 'react';

export default class Mapa extends React.Component {
constructor(props){
		super(props);
		this.state = {
			loaded: false,
		}
	}

componentDidMount() {

}

render(){
	return (
	<div>
		<img src='img/MapaWG.png' alt='mapa' className='mapa'/>
	</div>
	)
}
}