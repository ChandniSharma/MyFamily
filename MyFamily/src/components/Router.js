


import React, {Component} from 'react';
import {View, Text, Alert} from 'react-native'
import {Scene, Router, Actions} from 'react-native-router-flux';
import LoginForm from '../LoginForm';
import EmployeeList from '../components/EmployeeList';
import EmployeeCreate from '../components/EmployeeCreate';
import EmployeeEdit from './EmployeeEdit';
import AddEvents from './AddEvents';
import firebase from 'firebase';
import * as constants from '../components/Constants';

 class  RouterComponent extends Component{
    signOutUserMessage = async () => {

        Alert.alert(
            constants.titleAlertLogout,
            constants.msgLogout,
            [
              {text: constants.titleCancel, onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: constants.titleOk, onPress: () => {this.signOutAction()}},
            ],
            { cancelable: false }
          )
       
    }
    signOutAction = async () =>{
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
                <Scene key="root" hideNavBar titleStyle={styles.navigationBarTitleStyle}>
                
                <Scene key="auth">
                    <Scene key="login" component={LoginForm} title="Login"  />
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
                     rightTitle="Signout"
                    onRight={()=> this.signOutUserMessage()}
                    // rightButtonImage={require('../../assets/Power-Button.png')}
                    />
                    <Scene key = "EmployeeEdit" 
                    component={EmployeeEdit} 
                    title = "Edit Detail" 
                     rightTitle="Signout"
                    onRight={()=> this.signOutUserMessage()}
                    // rightButtonImage={require('../../assets/Power-Button.png')}
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

    const styles={
        navigationBarTitleStyle: {
         flex: 1,
         textAlign: 'center'
     }
   }; 

export default RouterComponent;


