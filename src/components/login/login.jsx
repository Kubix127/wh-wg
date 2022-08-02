import React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';



export default class Login extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			Nazwa: '',
			password: '',
			type: '',
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e){
		this.setState({ [e.target.name]: e.target.value});
	}

	onSubmit(e){
		e.preventDefault();

		const user = {
			Nazwa: this.state.Nazwa,
			password: this.state.password
		}

		if(this.state.type === 'Login'){
			return axios
				.post('/api/users/login', { user })
				.then(response => {
					console.log(response);
					if(response.data){
						const cookies = new Cookies();
						cookies.set('Gracz_Id', response.data.Id, { path: '/' });
						this.props.history.replace('/main');
						this.props.logIn();
					}
				})
				.catch(err => {
					console.log(err);
				})
		} else if(this.state.type === 'Register'){
			return axios
				.post('/api/users/register', {
					Nazwa: user.Nazwa,
					password: user.password
				})
				.then(response => {
					console.log(response);		
					if(response.data.state==='Success'){
						const cookies = new Cookies();
						cookies.set('Gracz_Id', response.data.Id, { path: '/' });
						this.props.history.replace('/main');
						this.props.logIn();	
					}
					if (response.data.state==='Już istnieje') {
						alert(response.data.state);
					}
				})
				.catch(err => {
					console.log(err);
				})
		}
	}


	render() {
		return (
			<div className="Login">
				<div id="Login">
					<form onSubmit={this.onSubmit}>
						<h2>Login</h2>
						<div className="input">
							<input 
								type="text" 
								name="Nazwa" 
								required 
								maxLength="32" 
								value={this.state.Nazwa}
								onChange={this.onChange}
							/>
							<label>Nazwa</label>
						</div>
						<div className="input">
							<input 
								type="password"
								name="password" 
								required 
								maxLength="32"
								value={this.state.password}
								onChange={this.onChange}
							/>
							<label>Hasło</label>
						</div>
						<div id="Error"></div>
						<input 
							type="submit" 
							name="Login" 
							value="Login" 
							onClick={() => this.setState({type: 'Login'})}
						/>
						<input 
							type="submit" 
							name="Login" 
							value="Rejestracja" 
							onClick={() => this.setState({type: 'Register'})}
						/>
					</form>
				</div>
			</div>
		)
	}
}