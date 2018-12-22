import React, {Component} from 'react';
import {View, Text, Picker} from 'react-native';
import { connect } from 'react-redux';
import { EmployeeUpdate,EmployeeRecordCreate } from '../actions';

import { Card, CardSection, Input, Button, Spinner} from './common';
import EmployeeForm from './EmployeeForm';
import {LinearGradient} from 'expo'; 

class EmployeeCreate extends Component{
    
    onButtonPressed(){
        const {nameUser, phone, dob, image, repeatValue, isReminder} = this.props;       
     
        this.props.EmployeeRecordCreate({nameUser, phone, dob:dob || '1-1-2000', image: image || '', repeatValue: repeatValue || '', isReminder:isReminder || 'NO'});
    }

    render(){
        
        return(
            <Card> 
                <LinearGradient
                colors={['#87CEEB', '#87BDEB', '#192f6a']}
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
    const {nameUser, phone,  dob, image, repeatValue, isReminder} = state.employeeForm;
    return{
        nameUser, phone,  dob, image, repeatValue, isReminder
    };

  };

export default connect(mapStateToProps, 
    {   EmployeeUpdate,
        EmployeeRecordCreate
    })
    (EmployeeCreate)