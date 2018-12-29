import _ from 'lodash';
import React, { Component } from 'react';
import {View, Text, Picker, Alert } from 'react-native';
import Communications from 'react-native-communications';
import { CardSection, Card, Button, Confirm } from './common';
import { connect } from 'react-redux';
import { EmployeeUpdate, employeeSave, employeeDelete } from '../actions';
import EmployeeForm from './EmployeeForm';
import * as constants from './Constants';
import {AdMobInterstitial,AdMobBanner, PublisherBanner} from 'expo';
import {kBANNER_ID, kINTERSTIAL_ID, KVIDEO_ID, kPUBLISH_BANNER_ID} from './Constants'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'


class EmployeeEdit extends Component{
    state = {
        showModal : false
    }
    componentWillMount(){
        _.each(this.props.employee, (value, prop) => {
            this.props.EmployeeUpdate ({ prop, value});
        });
        console.log( 'in edit mode ', this.props);
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
              {text: constants.titleCancel, onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: constants.titleOk, onPress: () => {this.onPressDelete()}},
            ],
            { cancelable: false }
          )
    
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
            <KeyboardAwareScrollView  keyboardShouldPersistTaps={'always'}
            style={{flex:1}}
            showsVerticalScrollIndicator={true}>
            
            <View style={styles.viewStyle}>
                <EmployeeForm {...this.props}/>
                <PublisherBanner
                // style={styles.bottomBanner}
                bannerSize="fullBanner"
                adUnitID= {kPUBLISH_BANNER_ID} // Test ID, Replace with your-admob-unit-id
                testDeviceID="EMULATOR"
                onDidFailToReceiveAdWithError={this.bannerError}
                onAdMobDispatchAppEvent={this.adMobEvent} />
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
            </KeyboardAwareScrollView>
        );
    }
}
const mapStateToProps = (state) => {
  const {nameUser , phone ,  dob, image, repeatValue, isReminder, bdayMsg, arrayEvents} = state.employeeForm;
  return {nameUser, phone,  dob, image, repeatValue, isReminder, bdayMsg, arrayEvents} ;
}

const styles={
    viewStyle:{
     backgroundColor:'#ffffff',
     alignSelf: 'center',
     alignItems: 'center',
    },
    // bottomBanner: {
    //     position: "absolute",
    //     bottom: 0
    //   },
}

export default connect (mapStateToProps , 
    {   EmployeeUpdate, 
        employeeSave,
        employeeDelete
    })
    (EmployeeEdit)