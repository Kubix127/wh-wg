
import React from "react";
import Tooltip from "rc-tooltip";

import "rc-tooltip/assets/bootstrap.css";
import './tree.css';

import DisplayEfekty from "../general/DisplayEfekty";

// import "./res/styles/custom-node.css";

// const ICON_PATH = "./data/custom-node/res/images/";

// const ICON_TYPES = {
//   MAN: ICON_PATH + "man.svg",
//   WOMAN: ICON_PATH + "girl.svg",
//   CAR: ICON_PATH + "car.svg",
//   BIKE: ICON_PATH + "bike.svg",
// };

/**
 * Component that renders a person's name and gender, along with icons
 * representing if they have a driver license for bike and / or car.
 * @param {Object} props component props to render.
 */
function CustomNode({ node }) {
  // const isMale = person.gender === "male";

  var state = 'locked'

  if (node.Czas === 0)
    state = 'done'
  else if (node.Techs_needed === 0)
    state = 'available'
  if (node.Active)
    state = 'active'

  return (
    <>
    <Tooltip
      // overlayClassName=''
      placement="top"
      overlay= {
        <div>
          <p>{node.opis}</p>
          <p>wow</p>
          {node.efekty && 
            <DisplayEfekty efekty={node.efekty}/>
          }
        </div>
      }
    >
      <div className={'flex-container tech-node ' + state}>
        <center><h3>{node.Nazwa}</h3></center> 
      </div>
    </Tooltip>
    
      
   
    
  </>
  );
}

// const MyNodeElement = ({ Nazwa, Id, efekty, opis, Czas, Techs_needed, Koszt, Active}) => (
// 	<>
	
// 	{Id &&
// 	!(Id === null || Id.includes('empty')) ?
// 		(Czas === 0) ?
// 		  <button id={Id} className="Node done" data-tip data-for={Id+'-tooltip'}>
// 		 	 {Nazwa} 
// 	 	 	</button>
//  	 	: (Active === 1) ?
//  	 		<button id={Id} className="Node techActive pending" data-tip data-for={Id+'-tooltip'}>
// 		    {Nazwa} 
// 		    <div>
// 					{(Koszt>0) &&	<>{Koszt+'$  '}</>}
// 					⧖{Czas}
// 				</div>
// 	 	 	</button>
// 	 	: (Czas !== 0 && Techs_needed === 0) ?
// 		  <button id={Id} className="Node pending" data-tip data-for={Id+'-tooltip'}>
// 		    {Nazwa} 
// 		    <div>
// 					{(Koszt>0) &&	<>{Koszt+'$  '}</>}
// 					⧖{Czas}
// 				</div>
// 	 	 	</button>
//  	 	:	<button id={Id} className="Node" data-tip data-for={Id+'-tooltip'}>
// 		    {Nazwa} 
// 		    <div>
// 					{(Koszt>0) &&	<>{Koszt+'$  '}</>}
// 					⧖{Czas}
// 				</div>
// 	 	 	</button>

//   :	
// 	  <div id={Id} className="Node empty"></div>
// 	}
//   <ReactTooltip id={Id+'-tooltip'} place={'top'} effect={'solid'} delayUpdate={800} delayHide={400} delayShow={200}>
//   	  	{/*<p>{opis}</p>*/}
//   	  	{efekty && 
//   	  		<DisplayEfekty efekty={efekty}/>
//   	  	}
//   	  	{(Czas>0 && Techs_needed===0) && <button id={Id+'-button'} onClick={onClick}>Wynajdź</button>}
//     </ReactTooltip>}
//   </>
// );

export default CustomNode;