import React, {Component} from 'react';
import {View, Text, Picker} from 'react-native';
import { connect } from 'react-redux';
import { EmployeeUpdate,EmployeeRecordCreate } from '../actions';

import { Card, CardSection, Input, Button, Spinner} from './common';
import EmployeeForm from './EmployeeForm';
import {LinearGradient} from 'expo'; 

class EmployeeCreate extends Component{
    
    onButtonPressed(){
        const {nameUser, phone, dob, image, repeatValue, isReminder, bdayMsg} = this.props;       
     
        this.props.EmployeeRecordCreate({nameUser, phone, dob:dob || '1-1-2000', image: image || '', repeatValue: repeatValue || '', isReminder:isReminder || 'NO', bdayMsg:bdayMsg || ''});
    }

    render(){
        
        return(
            <Card> 
                <LinearGradient
                colors={['#ffffff', '#ffffff', '#ffffff']}
                >
                <EmployeeForm  />
                <Button  onPress={this.onButtonPressed.bind(this)}>
                        Save
                    </Button>
                </LinearGradient>
            </Card>
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
    const {nameUser, phone,  dob, image, repeatValue, isReminder, bdayMsg} = state.employeeForm;
    return{
        nameUser, phone,  dob, image, repeatValue, isReminder, bdayMsg
    };

  };

export default connect(mapStateToProps, 
    {   EmployeeUpdate,
        EmployeeRecordCreate
    })
    (EmployeeCreate)