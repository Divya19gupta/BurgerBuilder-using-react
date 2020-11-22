import React from 'react';
import BurgerLogo from '../../assets/Images/burger-logo.png';
import './Logo.css';
const Logo =(props)=>(
   <div className={"Logo"} style={{height:props.height}}>
       
       <img src={BurgerLogo} alt="burger"></img>
   </div>
);

export default Logo;