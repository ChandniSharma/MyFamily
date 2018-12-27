


import React, {Component} from 'react';
import {Scene, Router, Actions} from 'react-native-router-flux';
import LoginForm from '../LoginForm';
import EmployeeList from '../components/EmployeeList';
import EmployeeCreate from '../components/EmployeeCreate';
import EmployeeEdit from './EmployeeEdit';
import AddEvents from './AddEvents';
import firebase from 'firebase';

 class  RouterComponent extends Component{
    signOutUser = async () => {
        try {
            await firebase.auth().signOut();
            Actions.auth();
        } catch (e) {
            console.log(e);
        }
    }
   render(){

   
        return(
            <Router>
                <Scene key="root" hideNavBar >
                <Scene key="auth">
                    <Scene key="login" component={LoginForm} title="Login" />
                    {/* <Scene key="EmployeeCreate" component={EmployeeCreate} title="Add Member" /> */}
                </Scene>
                <Scene key="main">
                    <Scene key ="EmployeeList" 
                    component = {EmployeeList} 
                    title = "Member List" 
                    rightTitle="Add"
                    onRight={()=>{ Actions.EmployeeCreate()}}
                    initial
                    />
                    <Scene key="EmployeeCreate" 
                    component={EmployeeCreate} 
                    title="Add Member" 
                    />
                    <Scene key = "EmployeeEdit" 
                    component={EmployeeEdit} 
                    title = "Edit Detail" 
                    rightTitle="Signout"
                    onRight={()=> this.signOutUser()}
                    />

                <Scene key = "AddEvents" 
                    component={AddEvents} 
                    title = "Add More Events" 
                    />
                    
                </Scene>
                </Scene>
            </Router>
        );
     }
    }

        

export default RouterComponent;


