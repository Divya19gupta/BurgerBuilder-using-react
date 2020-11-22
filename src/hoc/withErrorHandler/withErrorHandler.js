import React,{Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary';


const withErrorHandler =(WrappedComponent,axios)=>{
    return class extends Component{
        state={
            error:null

        }
        componentWillMount(){
            this.reqInterceptor = axios.interceptors.request.use(req=>{
                this.setState({error:null});
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res=>res,error=>{
                this.setState({error:error});
            });
        }
        /*Now withErrorHandler() if attached to other compo as its
        not limited just to burger builder, it will be called again and
        again during routing may cause issue therefore we are using
        the below func as its executed when compo is not req anymore
        This func will be written inside return for functional 
        based compo */
        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);

        }
        errorConfirmedHandler=()=>{
            this.setState({error:null})
        }
        render(){
            return(
                <Auxiliary>
                    <Modal show={this.state.error}
                    clicked={this.errorConfirmedHandler}>
                        {this.state.error? this.state.error.message:null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Auxiliary>
            )
        }
    }
} 
export default withErrorHandler;