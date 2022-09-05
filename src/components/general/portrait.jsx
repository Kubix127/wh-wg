import React from 'react';
import { Link } from 'react-router-dom';

function Protrait(props) {
  return(
    <>
      <Link to={'/Archiwa/' + props.frakcja}>
        <img src={"/img/" + props.frakcja + ".png"} alt={props.frakcja}  style={{width: '300px'}}/>
      </Link>
    </>
  )
}

export default Protrait;