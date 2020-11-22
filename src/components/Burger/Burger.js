
import React from 'react';
import './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredients';

const Burger =(props)=>{

    let transformedIngredients=Object.keys(props.ingredients)
    .map(igKey=>{
        /* We are getting an object and not array that's why we used
    Object.keys()which will convert obj to array and then we can map
    over it. Also we need string and values separately for that 
    again we used Array([value inside it provides us we the 'number enterd'])
    We got the string bu tnow need numb and map again, _ -> defines blank
    and i will provide us with value and then would return key={unique value}
    and type={string}
    */
        return [...Array(props.ingredients[igKey])].map((_,i)=>{
            return <BurgerIngredient key={igKey +i} type={igKey}/>;
        });
    }).reduce((arr,el)=>{
        return arr.concat(el)
    },[]);
    /*reduce(prevValue,newValue) recives two arg and we can even intialize 
    an empty array[]. Now we will concat the respective value in prev 
    value of aarr  */
    if(transformedIngredients.length===0)
    {
        transformedIngredients = <p>Please start adding ingredients!</p>
    }
    return (
        <div className="Burger">
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};
export default Burger;