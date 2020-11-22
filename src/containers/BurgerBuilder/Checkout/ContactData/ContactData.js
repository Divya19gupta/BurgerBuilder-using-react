import React, {Component} from 'react';
import Button from '../../../../components/UI/Button/Button';
import './ContactData.css';
import axios from '../../../../axios-order';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import Input from '../../../../components/UI/Input/Input';
class ContactData extends Component{
    state={
        orderForm:{
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            zipCode:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'ZIP Code'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:5,
                    maxLength:5
                },
                valid:false,
                touched:false
            },
            country:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Country'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your E-Mail'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            deliverymethod:{
                elementType:'select',
                elementConfig:{
                   options:[
                       {value: 'fastest', displayValue: 'Fastest'},
                       {value: 'cheapest', displayValue:'Cheapest'}
                   ]
                },
                value:'fastest',
                validation:{},
                valid:true
            }
        },
        loading:false,
        formIsValid:false
    }
   
    orderHandler=(event)=>{
    //from has a defualt behaviour of rerendering 
    //thats why we used the below method
        event.preventDefault();
        this.setState({loading:true});
        
        const formData={};
        for(let identifier in this.state.orderForm)
        {
            formData[identifier]=this.state.orderForm[identifier].value;
        }
        
        const order={
            ingredients:this.props.ingredients,
            price:this.props.price,
            orderData:formData
            //Dummy order Data
        }
        //for firebase:- nodeName.json
        axios.post('/orders.json',order)
        .then(response=>{
            // console.log(response);
            this.setState({loading:false});
            this.props.history.push("/");
        }).catch(error=>{
            console.log(error);
            this.setState({loading:false});
        })
    }
        //value='' rules=validation conatining required feild
    checkValidity(value,rules){
        let isValid=true;

        if(!rules)
        {
            return true;
        }

        if(rules.required)
        {
            isValid=value!=='' &&isValid;
        }
        if(rules.minLength)
        {
            isValid = value.length>=rules.minLength && isValid;
        }
        if(rules.maxLength)
        {
            isValid = value.length<=rules.maxLength && isValid;
        }
        return isValid;
    }

    inputChangeHandler=(event, inputIdentifier)=>{
        const updatedOrderForm={
            ...this.state.orderForm
        }
        const updatedFormElement={
            ...updatedOrderForm[inputIdentifier]
        }
        updatedFormElement.value=event.target.value;
       
        updatedFormElement.valid= this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
        //console.log(updatedFormElement);
       
        updatedFormElement.touched=true;
        // console.log(updatedFormElement.touched);

        updatedOrderForm[inputIdentifier]=updatedFormElement;
        
        let formIsValid=true;
        for(let i in updatedOrderForm){
            formIsValid=updatedOrderForm[i].valid && formIsValid;
        }
        console.log(formIsValid);
        this.setState({orderForm:updatedOrderForm, formIsValid:formIsValid});
    }
    render()
    {
        const formElementsArray = [];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config: this.state.orderForm[key]
            });
        }
        let form =(
                <form onSubmit={this.orderHandler}>
                    {formElementsArray.map(el=>(
                        <Input 
                        key={el.id}
                        elementType={el.config.elementType}
                        elementConfig={el.config.elementConfig}
                        value={el.config.value}
                        invalid={!el.config.valid}
                        shouldValidate={el.config.validation}
                        touched={el.config.touched}
                        changed={(event)=>this.inputChangeHandler(event,el.id)}
                        />
                    ))}
                    <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
                </form>
        );
        if(this.state.loading){
            form=<Spinner/>
        }
        return(
            <div className="ContactData">
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}
export default ContactData;