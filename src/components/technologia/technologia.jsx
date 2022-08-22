import React from 'react';

import { Graph }  from 'react-d3-graph';
import axios from 'axios';

import DisplayEfekty from '../general/DisplayEfekty'
import CustomNode from "./customNode";

import './tree.css';





var myConfig = {
	"automaticRearrangeAfterDropNode": false,
	"collapsible": false,
	"directed": false,
	"focusAnimationDuration": 0.75,
	"focusZoom": 1,
	"freezeAllDragEvents": false,
	"height": 500,
	"highlightDegree": 1,
	"highlightOpacity": 0.5,
	"initialZoom": 0.5,
	"linkHighlightBehavior": false,
	"maxZoom": 2,
	"minZoom": 0.3,
	"nodeHighlightBehavior": false,
	"panAndZoom": false,
	"staticGraph": true,
	"staticGraphWithDragAndDrop": false,
	"width": 500,
	"d3": {
		"alphaTarget": 0.05,
		"gravity": -100,
		"linkLength": 100,
		"linkStrength": 1,
		"disableLinkForce": false
	},
	"node": {
		"color": "#d3d3d3",
		"fontColor": "black",
		"fontSize": 12,
		"fontWeight": "normal",
		"highlightColor": "red",
		"highlightFontSize": 12,
		"highlightFontWeight": "bold",
		"highlightStrokeColor": "SAME",
		"highlightStrokeWidth": 1.5,
		"labelProperty": "name",
		"mouseCursor": "pointer",
		"opacity": 1,
		"renderLabel": false,
		"size": {
			"width": 2000,
			"height": 1000
		},
		"strokeColor": "none",
		"strokeWidth": 1.5,
		"svg": "",
		"symbolType": "circle",
		"viewGenerator": node => <CustomNode node={node} />
	},
	"link": {
		"color": "#d3d3d3",
		"fontColor": "black",
		"fontSize": 8,
		"fontWeight": "normal",
		"highlightColor": "blue",
		"highlightFontSize": 8,
		"highlightFontWeight": "normal",
		"labelProperty": "label",
		"mouseCursor": "pointer",
		"opacity": 1,
		"renderLabel": false,
		"semanticStrokeWidth": false,
		"strokeWidth": 4,
		"markerHeight": 6,
		"markerWidth": 6,
		"strokeDasharray": 0,
		"strokeDashoffset": 0,
		"strokeLinecap": "butt"
	}
}

const position = [
	{id: 1, x: 0 ,y: 0},
	{id: 2, x: 0 ,y: 150},
	{id: 3, x: 300 ,y: 0},
	{id: 4, x: 300 ,y: 150},

	{id: 5, x: 650 ,y: 0},
	{id: 6, x: 650 ,y: 150},
	{id: 7, x: 950 ,y: 0},
	{id: 8, x: 950 ,y: 150},

	{id: 9, x: 1300 ,y: 0},
	{id: 10, x: 1300 ,y: 150},
	{id: 11, x: 1600 ,y: 0},
	{id: 12, x: 1600 ,y: 150},

	{id: 13, x: 1950 ,y: 0},
	{id: 14, x: 1950 ,y: 150},
	{id: 15, x: 2250 ,y: 0},
	{id: 16, x: 2250 ,y: 150},


	{id: 17, x: 50 ,y: 500},

	{id: 19, x: 350 ,y: 350},
	{id: 20, x: 350 ,y: 500},
	{id: 22, x: 350 ,y: 650},

	{id: 24, x: 650 ,y: 350},
	{id: 23, x: 650 ,y: 500},
	{id: 25, x: 650 ,y: 650},

	{id: 26, x: 950 ,y: 350},
	// {}
	{id: 27, x: 950 ,y: 650},


	{id: 29, x: 1300 ,y: 350},
	{id: 28, x: 1300 ,y: 500},
	{id: 30, x: 1300 ,y: 650},

	{id: 31, x: 1600 ,y: 350},
	// {}
	{id: 32, x: 1600 ,y: 650},

	{id: 33, x: 1900 ,y: 350},
	// {}
	{id: 34, x: 1900 ,y: 650},

	{id: 35, x: 2200 ,y: 350},
	// {}
	{id: 36, x: 2200 ,y: 650},

	{id: 37, x: 50 ,y: 850},
	{id: 38, x: 350 ,y: 850},
	{id: 39, x: 650 ,y: 850},
	{id: 40, x: 950 ,y: 850},
	{id: 41, x: 1300 ,y: 850},
	{id: 42, x: 1600 ,y: 850},
	{id: 43, x: 1900 ,y: 850},
	{id: 44, x: 2200 ,y: 850},
]



export default class technologie extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			technologie: this.props.technologie,
			loaded: false,
			config: myConfig,
			shaped: false,
			resized: false,
		}
		this.resizeGraph = this.resizeGraph.bind(this);
		this.onNodeClick = this.onNodeClick.bind(this);

	}

	componentDidMount() {
		if (this.state.technologie.nodes.length)
		this.shapeGraph()
	}

	componentDidUpdate(prevProps) {
		if (prevProps.technologie.nodes !== this.props.technologie.nodes)
		this.setState({technologie: this.props.technologie})
		console.log(this.state)
		if (this.state.technologie.nodes.length && !this.state.shaped)
		this.shapeGraph()
		if (this.state.shaped && !this.state.resized)
		{
			this.resizeGraph()
		}
	}
		
	shapeGraph() {
		console.log('shape')
		this.setState(prevState => ({
			technologie: {
				...prevState.technologie, 
				nodes: prevState.technologie.nodes.map(element => {
					var pos = position.find(e=> {return e.id===element.id}) 
					if (pos === undefined) return element
					var x = pos.x
					var y = pos.y
					return {...element, x: x, y: y}
				})

			}
		}))
		this.setState({shaped: true})
	}

	resizeGraph() {
		var height = document.getElementById('graph-id-graph-wrapper').offsetHeight
		var width = document.getElementById('graph-id-graph-wrapper').offsetWidth
		console.log(height)
		if (height !== this.state.config.height+6)
			this.setState(prevState=>({config: {...prevState.config, height: height}}))
		if (width !== this.state.config.width)
			this.setState(prevState=>({config: {...prevState.config, width: width}}))
		
		if (!this.state.resized)
			this.setState({resized: true})
	}

	onNodeClick = (id, node) => {
		if (node.Techs_needed !==0 || node.Czas === 0) {
			return
		}

		const data = {
			tech_Id: id,
		};
	
	
		return axios
			.post('/api/users/technologie/wynajdz', data)
			.then(response =>{
				if (response.data === 'Success')
				this.setState(prevState => ({
					technologie: {
						links: prevState.technologie.links,
						nodes: prevState.technologie.nodes.map(element => {
							if (element.id == id)
							element.Active = 1
							else 
							element.Active = 0
							return element
						})
					}
				}))
			})
			.catch(err => {
				console.log(err);
			})
	}

	render() {
		if (this.state.shaped)
		return (
		<div id="treeWrapper" style={{ width: '100%', height: '100%' }}>
			<Graph
				id="graph-id" // id is mandatory
				data={this.state.technologie}
				config={this.state.config}
				
				onClickNode={this.onNodeClick}
			/>	
		</div>)
		return (
			<div>Loading...</div>
		)
		
	}

}


