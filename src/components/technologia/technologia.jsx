import React from 'react';

import { nodeClickHandler, Tree } from "react-tech-tree";
import { PanZoom } from 'react-easy-panzoom';
import ReactTooltip from 'react-tooltip';
import axios from 'axios';

import DisplayEfekty from './Wydarzenia/DisplayEfekty'




var nodes = [
	[
		{Id: 'Id_1T'},
		{Id: 'Id_3T'},
		{Id: 'Id_5T'},
		{Id: 'Id_7T'},
		{Id: 'Id_9T'},
		{Id: 'Id_11T'},
		{Id: 'Id_13T'},
		{Id: 'Id_15T'},
	],
	[
		{Id: 'Id_2T'},
		{Id: 'Id_4T'},
		{Id: 'Id_6T'},
		{Id: 'Id_8T'},
		{Id: 'Id_10T'},
		{Id: 'Id_12T'},
		{Id: 'Id_14T'},
		{Id: 'Id_16T'},
	],
	[
		{Id: 'empty1'},
		{Id: 'Id_19T'},
		{Id: 'empty2'},
		{Id: 'Id_24T'},
		{Id: 'Id_26T'},
		{Id: 'empty3'},
		{Id: 'Id_29T'},
		{Id: 'Id_31T'},
		{Id: 'Id_33T'},
		{Id: 'Id_35T'},
	],
	[
		{Id: 'Id_17T'},
		{Id: 'Id_20T'},
		{Id: 'Id_23T'},
		{},
		{},
		{Id: 'Id_28T'},
		{},
		{},
		{},
		{},
	],
	[
		{Id: 'empty4'},
		{Id: 'Id_22T'},
		{Id: 'empty5'},
		{Id: 'Id_25T'},
		{Id: 'Id_27T'},
		{Id: 'empty6'},
		{Id: 'Id_30T'},
		{Id: 'Id_32T'},
		{Id: 'Id_34T'},
		{Id: 'Id_36T'},
	],
	[
		{Id: 'Id_37T'},
		{Id: 'Id_38T'},
		{Id: 'Id_39T'},
		{Id: 'Id_40T'},
		{Id: 'Id_41T'},
		{Id: 'Id_42T'},
		{Id: 'Id_43T'},
		{Id: 'Id_44T'},
	]
]

const links = [
    {"from": "Id_1T", "to": "Id_2T"},
    {"from": "Id_1T", "to": "Id_3T"},
    {"from": "Id_2T", "to": "Id_4T"},
    {"from": "Id_3T", "to": "Id_4T"},
    {"from": "Id_5T", "to": "Id_6T"},
    {"from": "Id_5T", "to": "Id_7T"},
    {"from": "Id_6T", "to": "Id_8T"},
    {"from": "Id_7T", "to": "Id_8T"},
    {"from": "Id_9T", "to": "Id_10T"},
    {"from": "Id_9T", "to": "Id_11T"},
    {"from": "Id_10T", "to": "Id_12T"},
    {"from": "Id_11T", "to": "Id_12T"},
    {"from": "Id_13T", "to": "Id_14T"},
    {"from": "Id_13T", "to": "Id_15T"},
    {"from": "Id_14T", "to": "Id_16T"},
    {"from": "Id_15T", "to": "Id_16T"},
    {"from": "Id_17T", "to": "Id_19T"},
    {"from": "Id_17T", "to": "Id_20T"},
    {"from": "Id_17T", "to": "Id_22T"},
    {"from": "Id_20T", "to": "Id_23T"},
    {"from": "Id_23T", "to": "Id_24T"},
    {"from": "Id_23T", "to": "Id_25T"},
    {"from": "Id_24T", "to": "Id_26T"},
    {"from": "Id_25T", "to": "Id_27T"},
    {"from": "Id_28T", "to": "Id_29T"},
    {"from": "Id_28T", "to": "Id_30T"},
    {"from": "Id_29T", "to": "Id_31T"},
    {"from": "Id_30T", "to": "Id_32T"},
    {"from": "Id_31T", "to": "Id_33T"},
    {"from": "Id_32T", "to": "Id_34T"},
    {"from": "Id_33T", "to": "Id_35T"},
    {"from": "Id_34T", "to": "Id_36T"},
]


const onClick = (e) => {
	const elements = document.getElementsByClassName('techActive');
	for (const element of elements) {
		element.classList.remove('techActive');
	}

	const data = {
		tech_Id: e.target.id.slice(3,-8),
	};

	const Id = e.target.id.slice(0,-7);

	return axios
		.post('/api/users/technologie/wynajdz', data)
		.then(response =>{
			document.getElementById(Id).classList.add('techActive');
		})
		.catch(err => {
			console.log(err);
		})
}


const MyNodeElement = ({ Nazwa, Id, efekty, opis, Czas, Techs_needed, Koszt, Active}) => (
	<>
	{!(Id === null || Id.includes('empty')) ?
		(Czas == 0) ?
		  <button id={Id} className="Node done" data-tip data-for={Id+'-tooltip'}>
		 	 {Nazwa} 
	 	 	</button>
 	 	: (Active==1) ?
 	 		<button id={Id} className="Node techActive pending" data-tip data-for={Id+'-tooltip'}>
		    {Nazwa} 
		    <div>
					{(Koszt>0) &&	<>{Koszt+'$  '}</>}
					⧖{Czas}
				</div>
	 	 	</button>
	 	: (Czas != 0 && Techs_needed == 0) ?
		  <button id={Id} className="Node pending" data-tip data-for={Id+'-tooltip'}>
		    {Nazwa} 
		    <div>
					{(Koszt>0) &&	<>{Koszt+'$  '}</>}
					⧖{Czas}
				</div>
	 	 	</button>
 	 	:	<button id={Id} className="Node" data-tip data-for={Id+'-tooltip'}>
		    {Nazwa} 
		    <div>
					{(Koszt>0) &&	<>{Koszt+'$  '}</>}
					⧖{Czas}
				</div>
	 	 	</button>

  :	
	  <div id={Id} className="Node empty"></div>
	}
  {(efekty || opis) && <ReactTooltip id={Id+'-tooltip'} place={'top'} effect={'solid'} delayUpdate={800} delayHide={400} delayShow={200}>
  	  	{/*<p>{opis}</p>*/}
  	  	{efekty && 
  	  		<DisplayEfekty efekty={efekty}/>
  	  	}
  	  	{(Czas>0 && Techs_needed==0) && <button id={Id+'-button'} onClick={onClick}>Wynajdź</button>}
    </ReactTooltip>}
  </>
);



export default class technologie extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			technologie: this.props.technologie || [],
			nodes: [],
			loaded: false,
		}
		this.passNodesProps = this.passNodesProps.bind(this)
	}

	componentDidMount() {
		this.passNodesProps();
		// ChangeColors()
	}

	componentDidUpdate(prevProps) {
		if (prevProps.technologie !== this.props.technologie) { 
			this.setState({technologie: this.props.technologie});
		}
		if (!this.state.nodes.length) {
			this.passNodesProps();
		}
		console.log(this.state)
		console.log(this.props)
		// ChangeColors()
	}


	passNodesProps() {
		if (this.state.technologie.length) {
			const techTree = this.state.technologie;
			var newNodes = [];
			nodes.forEach((row, rowIndex) =>{
				newNodes[rowIndex] = [];
				row.forEach((node, nodeIndex) =>{
					var newNode = techTree.find(element =>
						element.Id === node.Id 
					);
					if(newNode === undefined){
						newNodes[rowIndex][nodeIndex] = {};	
					} else {
						newNodes[rowIndex][nodeIndex] = newNode;
					}
				});
			});
			this.setState({nodes: newNodes});
			this.setState({loaded: true});
		}
	}

	render() {
		if(this.state.loaded){
		return (
			<div id="tech_container">
				Technologia WIP
				
				<PanZoom
		      // boundaryRatioVertical={0.5} 
		      // boundaryRatioHorizontal={0.5} 
		      enableBoundingBox
		      id='tech_panzoom'
		      disableScrollZoom='true'
		      disableDoubleClickZoom='true'
		      disableKeyInteraction='true'
		      // autoCenter={true}
		      
		    >
					<div className='TreeContainer'>
						<Tree 
							id='tech_tree' 
							nodes={this.state.nodes} 
							links={this.props.links} 
							NodeElement={MyNodeElement} 
							nodeProps={onClick}
						/>					
					</div>
				</PanZoom>
				
			</div>

		)} else {
			return(
				<div>Loading...</div>
			)
		}
	}

}


