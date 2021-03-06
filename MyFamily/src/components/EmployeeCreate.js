import React, {Component} from 'react';
import {View, Text, Picker, Alert, AsyncStorage} from 'react-native';
import { connect } from 'react-redux';
import { EmployeeUpdate,EmployeeRecordCreate, employeeRecordRefresh } from '../actions';

import { Card, CardSection, Input, Button, Spinner} from './common';
import EmployeeForm from './EmployeeForm';
import {LinearGradient} from 'expo'; 
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import * as constants from './Constants';
import {AdMobInterstitial,AdMobBanner, PublisherBanner} from 'expo';
import {kBANNER_ID, kINTERSTIAL_ID, KVIDEO_ID, kPUBLISH_BANNER_ID} from './Constants'


class EmployeeCreate extends Component{
    setStorageValue = async (token, number) => {
        await AsyncStorage.setItem(constants.kClassNameComeFrom,token);
        await AsyncStorage.setItem(constants.kIsNeedToRefreshEmpForm, constants.kNo);
        await AsyncStorage.setItem(constants.kemergencyNumber,number);

        let number = await AsyncStorage.getItem(constants.kemergencyNumber);
        console.log('number is ',number);
    }
    async _getStorageValue(){
        const token = await AsyncStorage.getItem(constants.kIsNeedToRefreshEmpForm)
        console.log(token)
        if (!token == '' && token === constants.kYes) {
            this.props.employeeRecordRefresh();
       }
     }
    componentDidMount(){
        this._getStorageValue();
        this.setStorageValue(constants.kCreateClass);
    }
   
    onButtonPressed(){
        const {nameUser, phone, dob, image, repeatValue, isReminder, bdayMsg, arrayEvents, isEmergencyCall} = this.props;  
        
        console.log(' Events  ',arrayEvents);

        if(nameUser.trim() === '' || phone.trim() === '') {
            Alert.alert(
                constants.validationTitle,
                constants.msgEmptyCredentials,
                [
                    {text: constants.titleOk, onPress: () => console.log('Ok Pressed'), style: 'cancel'},
                ],
                { cancelable: false }
                )
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
            if(isEmergencyCall){

            }
        this.props.EmployeeRecordCreate({nameUser, phone: phone || '', dob:dob || '1-1-2000', image: image || '', repeatValue: repeatValue || '', isReminder:isReminder || constants.kNo, bdayMsg:bdayMsg || '', arrayEvents:arrayEvents || [], isEmergencyCall:isEmergencyCall || constants.kNo});
    }

    render(){
        
        return(
            <KeyboardAwareScrollView  keyboardShouldPersistTaps={'always'}
            style={{flex:1}}
            showsVerticalScrollIndicator={true}>
             <View style={styles.mainView}> 
                 
                <EmployeeForm isComeFrom='EmployeeCreate' />
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
                
            </View>
            </KeyboardAwareScrollView>
        );
    } 
}

const styles = {
    mainView:{
        backgroundColor:'#ffffff',

    },
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
    const {nameUser, phone,  dob, image, repeatValue, isReminder, bdayMsg, arrayEvents, isEmergencyCall} = state.employeeForm;
    return{
        nameUser, phone,  dob, image, repeatValue, isReminder, bdayMsg, arrayEvents,isEmergencyCall
    };

  };

export default connect(mapStateToProps, 
    {   EmployeeUpdate,
        EmployeeRecordCreate,
        employeeRecordRefresh
    })
    (EmployeeCreate)