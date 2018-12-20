import _ from 'lodash';
import React, { Component } from 'react';
import {View, Text, Picker } from 'react-native';
import Communications from 'react-native-communications';
import { CardSection, Card, Button, Confirm } from './common';
import { connect } from 'react-redux';
import { EmployeeUpdate, employeeSave, employeeDelete } from '../actions';
import EmployeeForm from './EmployeeForm';

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
        const {nameUser, phone, dob, image, repeatValue, isReminder} = this.props;
        console.log(" In Edit btn press ", this.props);
        this.props.employeeSave({nameUser, phone, dob, image, repeatValue, isReminder, uid: this.props.employee.uid});
    }
    onTextPress(){
      const {phone, shift} = this.props;
      Communications.text(phone, `Your upcoming shift is on ${shift}`);
    }
    onFireEmployeePress(){
       this.setState({showModal: true})
    }
    onAccept(){
      this.props.employeeDelete({ uid: this.props.employee.uid})
    }
    onDecline(){
        this.setState({showModal: false})
    }
    render(){
        console.log(" In Edit ", this.props.employee);

        return(
            <Card>
                <EmployeeForm {...this.props}/>

                <CardSection>
                    <Button onPress = {this.onButtonPress.bind(this)}>
                        Save Changes
                    </Button>
                </CardSection>

                <CardSection>
                    <Button onPress={this.onTextPress.bind(this)}>
                         Text Schedule
                    </Button>
                </CardSection>

                <CardSection>
                    <Button onPress={this.onFireEmployeePress.bind(this)}>
                         Fire Employee
                    </Button>
                </CardSection>

                <Confirm 
                  visible={this.state.showModal}
                  onAccept= {this.onAccept.bind(this)}
                  onDecline={this.onDecline.bind(this)}
                >
                    Are you sure you want to fire this employee
                </Confirm>

            </Card>
        );
    }
}
const mapStateToProps = (state) => {
  const {nameUser , phone ,  dob, image, repeatValue, isReminder} = state.employeeForm;
  return {nameUser, phone,  dob, image, repeatValue, isReminder} ;
}

export default connect (mapStateToProps , 
    {   EmployeeUpdate, 
        employeeSave,
        employeeDelete
    })
    (EmployeeEdit)