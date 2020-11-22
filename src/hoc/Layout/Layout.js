import React,{Component} from 'react';
import Auxiliary from '../Auxiliary';
import './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component{
    state={
        showSideDrawer:false
    }
    sideDrawerClosedHandler=()=>{
        this.setState({showSideDrawer:false});
    }
    sideDrawerToggleHandler=()=>{
        this.setState((prevState)=>{
            return {showSideDrawer: !prevState.showSideDrawer};
        })
        /*One should NOT use this.state inside seState
        as it will lead to anonymous results, therefore take 
        input as prevstate and then use it furthur to 
        update state*/
    }
    render(){
        return(
            <Auxiliary>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer 
                open={this.state.showSideDrawer}
                closed={this.sideDrawerClosedHandler} 
                />
                <main className={"Content"}>
                    {this.props.children}
                </main>
            </Auxiliary>
        )
    }
}
export default Layout;