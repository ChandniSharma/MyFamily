


import React, {Component} from 'react';
import {View, Text, Alert, Image, TouchableOpacity} from 'react-native'
import {Scene, Router, Actions} from 'react-native-router-flux';
import {Button} from './common';
import LoginForm from '../LoginForm';
import EmployeeList from '../components/EmployeeList';
import EmployeeCreate from '../components/EmployeeCreate';
import EmployeeEdit from './EmployeeEdit';
import AddEvents from './AddEvents';
import firebase from 'firebase';
import * as constants from '../components/Constants';
// import { Icon } from 'native-base';

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
                    
                    renderRightButton = {() => this.addButton()}   
                    
                    initial
                    />
                    <Scene key="EmployeeCreate" 
                    component={EmployeeCreate} 
                    title="Add Member" 
                    renderRightButton={()=> this.signoutButton()}
                    
                    />
                    <Scene key = "EmployeeEdit" 
                    component={EmployeeEdit} 
                    title = "Edit Detail" 
                    renderRightButton={()=> this.signoutButton()}

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
     addButton(){
         return(
         <TouchableOpacity style={styles.addButton} onPress={()=> Actions.EmployeeCreate()}>
            <Image source={require('../../assets/plusIcon.png')} style={styles.addButtonImg}/>
      </TouchableOpacity>
      )
     }
     signoutButton(){
        return(
            <TouchableOpacity style={styles.addButton} onPress={()=> this.signOutUserMessage()}>
               <Image source={require('../../assets/Power-Button.png')} style={styles.addButtonImg}/>
         </TouchableOpacity>
         )
     }
    }

    const styles={
        navigationBarTitleStyle: {
         flex: 1,
         textAlign: 'center'
     },
     addButton:{
        width: 64,
        height: 64,
         alignItems: 'center',
         justifyContent: 'center',
     },
     addButtonImg:{
        width: 42,
        height: 42
     },
     logoutButton:{
        width: 42,
        height: 42
     }
   }; 

export default RouterComponent;


