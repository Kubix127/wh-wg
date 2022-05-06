import React from 'react';



export default class FrakcjaSaldo extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			Saldo: this.props.frakcja.Saldo,
			Dochody: this.props.frakcja.Dochody,
		}
	}

	componentDidMount(){
		console.log(this.state);

	}

	componentDidUpdate(prevProps) {
		if (prevProps.frakcja.Saldo != this.props.frakcja.Saldo) {
			this.setState({Saldo: this.props.frakcja.Saldo});
		}
	}


	render(){
		return (
			<div>
				Saldo:{this.state.Saldo}({this.state.Dochody})
			</div>
		)
	}
}
