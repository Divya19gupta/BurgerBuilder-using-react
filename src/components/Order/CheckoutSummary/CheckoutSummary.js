import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import './CheckoutSummary.css'
const CheckoutSummary=(props)=>{
    return(
        <div className="CheckoutSummary">
            <h1>We hope it tastes well</h1>
            <div style={{width:'100%', marggin:'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnType="Danger"
            clicked={props.onCheckoutCancelled}>CANCEL</Button>
            <Button btnType="Success" 
            clicked={props.onCheckoutContinued}>CONTINUE</Button>
        </div>
    )
}
export default CheckoutSummary;