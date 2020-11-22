import React from 'react';
import './NavigationItems.css';
 import NavigationItem from './NavigationItem/NavigationItem';

const NavItems =()=>(
   <ul className={"NavItems"}>
      <NavigationItem link="/">Burger Item</NavigationItem>
      <NavigationItem link="/orders">Orders</NavigationItem>
   </ul>
);

export default NavItems;