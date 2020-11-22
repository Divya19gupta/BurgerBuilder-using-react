import React from 'react';
import {NavLink} from 'react-router-dom';

import './NavigationItem.css';
// import Logo from '../../Logo/Logo';
//We can see that active classes which we assigned in the css classes
//doesnt attach at run time, therefore we will use active class name
//navlink prop
const NavItem =(props)=>(
    <li className={"NavItem"}>
        <NavLink to={props.link}
        activeClassName={"active"}
        exact
        >{props.children}
            </NavLink>
    </li>
);

export default NavItem;