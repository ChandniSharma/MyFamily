import React, {Component} from 'react';
import {View, Text, Picker, Alert} from 'react-native';
import { connect } from 'react-redux';
import { EmployeeUpdate,EmployeeRecordCreate } from '../actions';

import { Card, CardSection, Input, Button, Spinner} from './common';
import EmployeeForm from './EmployeeForm';
import {LinearGradient} from 'expo'; 
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import * as constants from './Constants';
import {AdMobInterstitial,AdMobBanner, PublisherBanner} from 'expo';
import {kBANNER_ID, kINTERSTIAL_ID, KVIDEO_ID, kPUBLISH_BANNER_ID} from './Constants'


class EmployeeCreate extends Component{
    
    onButtonPressed(){

       

        const {nameUser, phone, dob, image, repeatValue, isReminder, bdayMsg, arrayEvents} = this.props;  
        
        console.log(' Events  ',arrayEvents);

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
        
        this.props.EmployeeRecordCreate({nameUser, phone: phone || '', dob:dob || '1-1-2020', image: image || '', repeatValue: repeatValue || '', isReminder:isReminder || constants.kNo, bdayMsg:bdayMsg || '', arrayEvents:arrayEvents || []});
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
                <PublisherBanner
            style={styles.bottomBanner}
                bannerSize="fullBanner"
                adUnitID= {kPUBLISH_BANNER_ID} // Test ID, Replace with your-admob-unit-id
                testDeviceID="EMULATOR"
                onDidFailToReceiveAdWithError={this.bannerError}
                onAdMobDispatchAppEvent={this.adMobEvent} />
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
    },
    // bottomBanner: {
    //     position: "absolute",
    //     bottom: 0
    //   },
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