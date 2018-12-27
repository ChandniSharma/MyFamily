import React, {Component} from 'react';
import {View, Text, Picker} from 'react-native';
import { connect } from 'react-redux';
import { EmployeeUpdate,EmployeeRecordCreate } from '../actions';

import { Card, CardSection, Input, Button, Spinner} from './common';
import EmployeeForm from './EmployeeForm';
import {LinearGradient} from 'expo'; 
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import * as constants from './Constants';


class EmployeeCreate extends Component{
    
    onButtonPressed(){

        const {nameUser, phone, dob, image, repeatValue, isReminder, bdayMsg, arrayEvents} = this.props;     
        if(nameUser.trim() === '' || phone.trim() === '') {
            return;
         }else{
                if (phone.length === 0 || phone.length!=10) {
                    Alert.alert(
                        '',
                        constants.msgMobileNumber,
                        [
                          {text: constants.titleOk, onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                        ],
                        { cancelable: false }
                      )
                      return;
                    }
            }
        
        this.props.EmployeeRecordCreate({nameUser, phone: phone || '', dob:dob || '1-1-2000', image: image || '', repeatValue: repeatValue || '', isReminder:isReminder || 'NO', bdayMsg:bdayMsg || '', arrayEvents:arrayEvents || []});
    }

    render(){
        
        return(
            <KeyboardAwareScrollView  keyboardShouldPersistTaps={'always'}
            style={{flex:1}}
            showsVerticalScrollIndicator={true}>
             <View> 
                 <LinearGradient
                colors={['#ffffff', '#ffffff', '#ffffff']}
                >
                <EmployeeForm  />
                <Button  onPress={this.onButtonPressed.bind(this)}>
                        Save
                    </Button>
                </LinearGradient>
            </View>
            </KeyboardAwareScrollView>
        );
    } 
}

const styles = {
    pickerTextStyle:{
        fontSize: 18,
        paddingLeft: 20,
    }
}

const mapStateToProps = (state) =>{
    const {nameUser, phone,  dob, image, repeatValue, isReminder, bdayMsg, arrayEvents} = state.employeeForm;
    return{
        nameUser, phone,  dob, image, repeatValue, isReminder, bdayMsg, arrayEvents
    };

  };

export default connect(mapStateToProps, 
    {   EmployeeUpdate,
        EmployeeRecordCreate
    })
    (EmployeeCreate)