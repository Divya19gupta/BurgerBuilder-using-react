import React from 'react';
// import BurgerLogo from '../../assets/Images/burger-logo.png';
import './DrawerToggle.css';
const Drawertoggle =(props)=>(
   <div className={"DrawerToggle"}onClick={props.clicked}>
       <div></div>
       <div></div>
       <div></div>
   </div>
);

export default Drawertoggle;