import React from 'react';

export default class DisplayEfekty extends React.Component {
	constructor(props){
		super(props);
	
		this.state = {
			efekty: this.props.efekty,
			DisplayEfekty: {},
			Zakres: ['Świat','Frakcja','Prowincja','Miasto','Budynek','Armia','Jednostka'],
			Obiekt: ['Prowincja','Miasto','Budynek','Armia','Jednostka'],
			Bonusy: ['Przychód','Przyrost','Ład','Spaczenie','Koszt','Koszt w przeludnieniu','Dochód','Wydobycie'],
		}
	}
	componentDidMount() {
		this.classifyEfekty();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.efekty !== this.props.efekty) { 
			this.setState({efekty: this.props.efekty});
			this.classifyEfekty();
		}
	}

	classifyEfekty() {
		var efekty = this.props.efekty;
		const Zakres = this.state.Zakres;
		const Obiekt = this.state.Obiekt;
		const Bonusy = this.state.Bonusy;
		var Output = {};

		efekty.forEach(efekt=>(


			Zakres.forEach(Zakres=>(
				(efekt.Zakres===Zakres && !efekt.Zakres_value) && (
					(typeof Output[Zakres] !== 'object') && (Output[Zakres] = {}),
					Obiekt.forEach(Obiekt=>(
						(efekt.Obiekt===Obiekt && !efekt.Obiekt_value) && (
							typeof Output[Zakres][Obiekt] !== 'object' && (Output[Zakres][Obiekt] = {}),
							Bonusy.forEach(Bonus=>(
								(efekt.Bonus===Bonus && !efekt.Bonus_percent) && (
									(Output[Zakres][Obiekt][Bonus] === undefined) && (Output[Zakres][Obiekt][Bonus] = 0),
									Output[Zakres][Obiekt][Bonus] += parseInt(efekt.Bonus_value)
								),
								(efekt.Bonus===Bonus && efekt.Bonus_percent) && (
									(Output[Zakres][Obiekt][Bonus+'_percent'] === undefined) && (Output[Zakres][Obiekt][Bonus+'_percent'] = 0),
									Output[Zakres][Obiekt][Bonus+'_percent'] += parseInt(efekt.Bonus_value)
								)
							))
						),
						(efekt.Obiekt===Obiekt && efekt.Obiekt_value) && (
							typeof Output[Zakres][Obiekt] !== 'object' && (Output[Zakres][Obiekt] = {}),
							typeof Output[Zakres][Obiekt][efekt.Obiekt_value] !== 'object' && (Output[Zakres][Obiekt][efekt.Obiekt_value] = {}),
							Bonusy.forEach(Bonus=>(
								(efekt.Bonus===Bonus && !efekt.Bonus_percent) && (
									(Output[Zakres][Obiekt][efekt.Obiekt_value][Bonus] === undefined) && (Output[Zakres][Obiekt][efekt.Obiekt_value][Bonus] = 0),
									Output[Zakres][Obiekt][efekt.Obiekt_value][Bonus] += parseInt(efekt.Bonus_value)
								),
								(efekt.Bonus===Bonus && efekt.Bonus_percent) && (
									(Output[Zakres][Obiekt][efekt.Obiekt_value][Bonus+'_percent'] === undefined) && (Output[Zakres][Obiekt][efekt.Obiekt_value][Bonus+'_percent'] = 0),
									Output[Zakres][Obiekt][efekt.Obiekt_value][Bonus+'_percent'] += parseInt(efekt.Bonus_value)
								)
							))
						)
					))
				),
				(efekt.Zakres===Zakres && efekt.Zakres_value) && (
					(typeof Output[Zakres] !== 'object') && (Output[Zakres] = {}),
					(typeof Output[Zakres][efekt.Zakres_value] !== 'object') && (Output[Zakres][efekt.Zakres_value] = {}),
					Obiekt.forEach(Obiekt=>(
						(efekt.Obiekt===Obiekt && !efekt.Obiekt_value) && (
							typeof Output[Zakres][efekt.Zakres_value][Obiekt] !== 'object' && (Output[Zakres][efekt.Zakres_value][Obiekt] = {}),
							Bonusy.forEach(Bonus=>(
								(efekt.Bonus===Bonus && !efekt.Bonus_percent) && (
									(Output[Zakres][efekt.Zakres_value][Obiekt][Bonus] === undefined) && (Output[Zakres][efekt.Zakres_value][Obiekt][Bonus] = 0),
									Output[Zakres][efekt.Zakres_value][Obiekt][Bonus] += parseInt(efekt.Bonus_value)
								),
								(efekt.Bonus===Bonus && efekt.Bonus_percent) && (
									(Output[Zakres][efekt.Zakres_value][Obiekt][Bonus+'_percent'] === undefined) && (Output[Zakres][efekt.Zakres_value][Obiekt][Bonus+'_percent'] = 0),
									Output[Zakres][efekt.Zakres_value][Obiekt][Bonus+'_percent'] += parseInt(efekt.Bonus_value)
								)
							))
						),
						(efekt.Obiekt===Obiekt && efekt.Obiekt_value) && (
							typeof Output[Zakres][efekt.Zakres_value][Obiekt] !== 'object' && (Output[Zakres][efekt.Zakres_value][Obiekt] = {}),
							typeof Output[Zakres][efekt.Zakres_value][Obiekt][efekt.Obiekt_value] !== 'object' && (Output[Zakres][efekt.Zakres_value][Obiekt][efekt.Obiekt_value] = {}),
							Bonusy.forEach(Bonus=>(
								(efekt.Bonus===Bonus && !efekt.Bonus_percent) && (
									(Output[Zakres][efekt.Zakres_value][Obiekt][efekt.Obiekt_value][Bonus] === undefined) && (Output[Zakres][efekt.Zakres_value][Obiekt][efekt.Obiekt_value][Bonus] = 0),
									Output[Zakres][efekt.Zakres_value][Obiekt][efekt.Obiekt_value][Bonus] += parseInt(efekt.Bonus_value)
								),
								(efekt.Bonus===Bonus && efekt.Bonus_percent) && (
									(Output[Zakres][efekt.Zakres_value][Obiekt][efekt.Obiekt_value][Bonus+'_percent'] === undefined) && (Output[Zakres][efekt.Zakres_value][Obiekt][efekt.Obiekt_value][Bonus+'_percent'] = 0),
									Output[Zakres][efekt.Zakres_value][Obiekt][efekt.Obiekt_value][Bonus+'_percent'] += parseInt(efekt.Bonus_value)
								)
							))
						)
					))
				)
				
			))
		));
		this.setState({DisplayEfekty: Output});

	}



// Dopisać wypisywanie jeden poziom niżej dla Zakres_value lub napisać funkcję wypisującą poziom niżej
	render() {
		const DisplayEfekty = this.state.DisplayEfekty;
		return(
			<div>
				{Object.keys(DisplayEfekty).map((Zakres)=>(
					<React.Fragment key={Zakres}>
						{Zakres}:
					<ul>
						{Object.keys(DisplayEfekty[Zakres]).map((Obiekt)=>(
							<React.Fragment key={Obiekt}>
						<li>
							{Obiekt}:
							<ul>
							{Object.keys(DisplayEfekty[Zakres][Obiekt]).map((Bonus_Obiekt)=>(
									<React.Fragment key={Bonus_Obiekt}>
									{(typeof DisplayEfekty[Zakres][Obiekt][Bonus_Obiekt] !== 'object') 
									?
									(Bonus_Obiekt.split('_')[1] !== 'percent') 
										?
										<li>{Bonus_Obiekt}: {DisplayEfekty[Zakres][Obiekt][Bonus_Obiekt]}</li>	
										:
										<li>{Bonus_Obiekt.split('_')[0]}: {DisplayEfekty[Zakres][Obiekt][Bonus_Obiekt]}%</li>
									:
									<>
									<li>
									{Bonus_Obiekt}:
									<ul>
									{Object.keys(DisplayEfekty[Zakres][Obiekt][Bonus_Obiekt]).map((Bonus)=>(
										(typeof DisplayEfekty[Zakres][Obiekt][Bonus_Obiekt][Bonus] !== 'object')
										?
											<React.Fragment key={Bonus}>
											{(Bonus.split('_')[1] !== 'percent') 
												?
												<li>{Bonus}: {DisplayEfekty[Zakres][Obiekt][Bonus_Obiekt][Bonus]}</li>	
												:
												<li>{Bonus.split('_')[0]}: {DisplayEfekty[Zakres][Obiekt][Bonus_Obiekt][Bonus]}%</li>}
											</React.Fragment>
										:
										 <React.Fragment key={Bonus}>
											 <li>
											 	{Bonus}:
											 	<ul>
												 	{Object.keys(DisplayEfekty[Zakres][Obiekt][Bonus_Obiekt][Bonus]).map((Bonus2)=>(
												 		<React.Fragment key={Bonus2}>
													{(Bonus2.split('_')[1] !== 'percent') 
														?
														<li>{Bonus2}: {DisplayEfekty[Zakres][Obiekt][Bonus_Obiekt][Bonus][Bonus2]}</li>	
														:
														<li>{Bonus2.split('_')[0]}: {DisplayEfekty[Zakres][Obiekt][Bonus_Obiekt][Bonus][Bonus2]}%</li>}
													</React.Fragment>
												 	))}
											 	</ul>
											 </li>
										 </React.Fragment>
									))}
									</ul>
									</li>
									</>
									}
									</React.Fragment>
								))}
							</ul>
						</li>
							</React.Fragment>
						))}
					</ul>
					</React.Fragment>
				))}
			</div>
		)
	}
}