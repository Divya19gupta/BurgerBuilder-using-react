import React,{Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


//global const created in capital letters
const INGREDIENTS_PRICES = {
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7
}

class BurgerBuilder extends Component{

    state={
        ingredients:null,
        totalPrice:4,
        purchasable:false,
        purchasing:false,
        loading:false,
        error:false
    }
    componentDidMount(){
        axios.get('https://react-burgerbuilder-d18ca.firebaseio.com/ingredients.json')
        .then(response=>{
            this.setState({ingredients:response.data});
        } )
        .catch(error=>{
            this.setState({error:true});
        })
    }
    /*render() syntax will not work correctly if we are using this
    keyword if the method is triggered through an event due to the
    way this keyword works in js it will then not refer to the class
    remove and addIngredients worked bec we used arrow func as they contain
    the state and context to handle it
    Use same here.
    */ 
    purchaseHandler=()=>
    {
        this.setState({purchasing:true})
    }
    //this worked here bec it was called as a func and not as event
    updatePurchaseState(ingredients){
         //created duplicate object
        //WE REMOVED IT BECAUSE THE STATE IS BEING UPDATING SIMULATANEUOSLY
         //converting objext to array
         const sum = Object.keys(ingredients)
         .map(igKey=>{
            return ingredients[igKey];
         })
         .reduce((sum,el)=>{
            return sum+el;
         },0);
         this.setState({purchasable:sum>0})
    }

    addIngredientHandler=(type)=>{
        //to know abou the old ingredient
        const oldCount = this.state.ingredients[type];
        const updatedCounted = oldCount + 1;
        //to update state we will create new var as state should be updated
        //in immutable way
        const updatedIngredients ={
            ...this.state.ingredients //we are adding old ingredients here
        }
        updatedIngredients[type]=updatedCounted; //updating new value
        
        const priceAddition = INGREDIENTS_PRICES[type];//taking value from above
        const oldPrice = this.state.totalPrice;//price in state
        const newPrice = priceAddition + oldPrice; 
        this.setState({totalPrice:newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler=(type)=>{
         //to know abou the old ingredient
         const oldCount = this.state.ingredients[type];
         //condition to add if already value is 0 and we are decreasing
         //it further, by this it will return and value will not
         //decrease to negative
         if(oldCount<=0)
         return;

         const updatedCounted = oldCount - 1;
         //to update state we will create new var as state should be updated
         //in immutable way
         const updatedIngredients ={
             ...this.state.ingredients //we are adding old ingredients here
         }
         updatedIngredients[type]=updatedCounted; //updating new value
         
         const priceDeduction = INGREDIENTS_PRICES[type];//taking value from above
         const oldPrice = this.state.totalPrice;//price in state
         const newPrice = oldPrice - priceDeduction; 
         this.setState({totalPrice:newPrice, ingredients: updatedIngredients});
         this.updatePurchaseState(updatedIngredients);
    }
    purchaseCancelHandler = ()=>{
        this.setState({purchasing:false})
    }

    purchaseContinue =()=>{
        // alert("Continue!");
        
        const qparams=[];
        for(let i in this.state.ingredients)
        {
            //[propname] + [((key)=(something))] [value we enter]
            qparams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]));
        }
        qparams.push('price='+ this.state.totalPrice);
        const qstring = qparams.join('&');
        this.props.history.push({
            pathname:'/checkout',
            search:'?'+qstring
        });
    }
    render(){
        let orderSummary = null;
        const disabledInfo={
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0
        }
        //{salad:true, meat:false ...}
        let burger = this.state.error?<p style={{textAlign:'center'}}>Ingredients can't be loaded</p> : <Spinner/>
        if(this.state.ingredients){
            burger = ( 
                <Auxiliary>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    ordered={this.purchaseHandler}
                    purchasable={this.state.purchasable}
                    />  
                </Auxiliary>
            );
            orderSummary = <OrderSummary 
            ingredients={this.state.ingredients}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinue}
            price={this.state.totalPrice}/>
        }
        if(this.state.loading){
            orderSummary= <Spinner/>
        }
        return(
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                   {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        );
    }
}
export default withErrorHandler(BurgerBuilder,axios);