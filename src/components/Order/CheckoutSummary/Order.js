import React from 'react';
import './Order.css';

const Order =(props)=>{
    const ingredients=[];
    for(let iname in props.ingredients)
    {
        ingredients.push({
            name: iname,
            amount: props.ingredients[iname]
        })
    }
    const ioutput = ingredients.map(ig=>{
        return <span
        style={{
            textTransform:'capitalize',
            display:'inline-block',
            margin:'0px 8px',
            border:'1px solid #ccc',
            padding:'5px'
        }}
        key={ig.name}>{ig.name} ({ig.amount}) </span>
    })
    return(
        <div className="Order">
            <p>Ingredients:{ioutput}</p>
            <p>Price:<strong>{props.price.toFixed(2)}</strong></p>
        </div>
    );
    
}
export default Order;