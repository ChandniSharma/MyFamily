import _ from 'lodash';
import React, { Component } from 'react';
import {View, Text, Picker, Alert } from 'react-native';
import Communications from 'react-native-communications';
import { CardSection, Card, Button, Confirm } from './common';
import { connect } from 'react-redux';
import { EmployeeUpdate, employeeSave, employeeDelete } from '../actions';
import EmployeeForm from './EmployeeForm';
import * as constants from './Constants';


class EmployeeEdit extends Component{
    state = {
        showModal : false
    }
    componentWillMount(){
        _.each(this.props.employee, (value, prop) => {
            this.props.EmployeeUpdate ({ prop, value});
        });
        
    }
    onButtonPress(){
        const {nameUser, phone, dob, image, repeatValue, isReminder,bdayMsg ,arrayEvents} = this.props;
        console.log(" In Edit btn press ", this.props);
        this.props.employeeSave({nameUser, phone, dob, image, repeatValue, isReminder,bdayMsg, arrayEvents, uid: this.props.employee.uid});
    }
    onTextPress(){
      const {phone, shift} = this.props;
      Communications.text(phone, `Your upcoming shift is on ${shift}`);
    }
    onFireEmployeePress(){
        Alert.alert(
            constants.titleDelete,
            constants.msgDeleteMember,
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'Ok', onPress: () => {this.onPressDelete()}},
            ],
            { cancelable: false }
          )
    //    this.setState({showModal: true})
    }
    onPressDelete(){
      this.props.employeeDelete({ uid: this.props.employee.uid})
    }
    onDecline(){
        this.setState({showModal: false})
    }
    render(){
        console.log(" In Edit ", this.props.employee);

        return(
            <View>
                <EmployeeForm {...this.props}/>

                <CardSection>
                    <Button onPress = {this.onButtonPress.bind(this)}>
                        Save Changes
                    </Button>
                </CardSection>

                <CardSection>
                    <Button onPress={this.onFireEmployeePress.bind(this)}>
                         Delete Member
                    </Button>
                </CardSection>

                {/* <Confirm 
                  visible={this.state.showModal}
                  onAccept= {this.onAccept.bind(this)}
                  onDecline={this.onDecline.bind(this)}
                >
                    Are you sure you want to delete this member?
                </Confirm> */}

            </View>
        );
    }
}
const mapStateToProps = (state) => {
  const {nameUser , phone ,  dob, image, repeatValue, isReminder, bdayMsg, arrayEvents} = state.employeeForm;
  return {nameUser, phone,  dob, image, repeatValue, isReminder, bdayMsg, arrayEvents} ;
}

export default connect (mapStateToProps , 
    {   EmployeeUpdate, 
        employeeSave,
        employeeDelete
    })
    (EmployeeEdit)