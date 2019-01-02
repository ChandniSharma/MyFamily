import _ from 'lodash';
import React, { Component } from 'react';
import {View, Text, Picker, Alert, FlatList,AsyncStorage} from 'react-native';
import Communications from 'react-native-communications';
import { CardSection, Card, Button, Confirm } from './common';
import { connect } from 'react-redux';
import { EmployeeUpdate, employeeSave, employeeDelete } from '../actions';
import EmployeeForm from './EmployeeForm';
import * as constants from './Constants';
import {AdMobInterstitial,AdMobBanner, PublisherBanner} from 'expo';
import {kBANNER_ID, kINTERSTIAL_ID, KVIDEO_ID, kPUBLISH_BANNER_ID} from './Constants'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import ListItem from './common/ListItem';

class EmployeeEdit extends Component{
    state = {
        showModal : false
    }
    componentWillMount(){
        _.each(this.props.employee, (value, prop) => {
            this.props.EmployeeUpdate ({ prop, value});
        });
    }
    logInToken = async (token) => {
        await AsyncStorage.setItem(constants.kClassNameComeFrom,token)
    }
    componentDidMount(){
        this.logInToken(constants.kEditClass);
    }
    onButtonPress(){
        const {nameUser, phone, dob, image, repeatValue, isReminder, bdayMsg, arrayEvents, isEmergencyCall} = this.props;  

        console.log(" In Edit btn press ", this.props);
        this.props.employeeSave({nameUser:nameUser || '', phone: phone || '', dob:dob || '1-1-2020', image: image || '', repeatValue: repeatValue || '', isReminder:isReminder || constants.kNo, bdayMsg:bdayMsg || '', arrayEvents:arrayEvents || [], isEmergencyCall:isEmergencyCall || constants.kNo, uid: this.props.employee.uid});
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
    eventList = () => {
        return (
            <View style={styles.listContainer}>
                    <FlatList
                        data = { this.props.arrayEvents }
                        scrollEnabled={true}
                        marginBottom={50}
                        keyExtractor={(item, index) => index.toString()}
                            renderItem = { info => (
                            <ListItem 
                                placeName={ info.item.value }
                            //  onItemPressed={() => this.onItemDeleted(info.item.key)}
                            />
                            )}
                        />
            </View>
            
            )
        }
    render(){
        console.log(" In Edit ", this.props.employee);

        return(
            <KeyboardAwareScrollView  keyboardShouldPersistTaps={'always'}
            style={{flex:1}}
            showsVerticalScrollIndicator={true}>
            
            <View style={styles.viewStyle}>
                <EmployeeForm {...this.props}/>
               
                <CardSection>
                    <Button onPress = {this.onButtonPress.bind(this)}>
                        Save Changes
                    </Button>
                    <Button onPress={this.onFireEmployeePress.bind(this)}>
                         Delete Member
                    </Button>
                </CardSection>
                {/* <View style = { styles.listContainer }>
                { this.eventList() }
                 </View> */}
                {/* <CardSection>
                    <Button onPress={this.onFireEmployeePress.bind(this)}>
                         Delete Member
                    </Button>
                </CardSection> */}
               
                {/* <PublisherBanner
                // style={styles.bottomBanner}
                bannerSize="fullBanner"
                adUnitID= {kPUBLISH_BANNER_ID} // Test ID, Replace with your-admob-unit-id
                testDeviceID="EMULATOR"
                onDidFailToReceiveAdWithError={this.bannerError}
                onAdMobDispatchAppEvent={this.adMobEvent} /> */}
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
  const {nameUser , phone ,  dob, image, repeatValue, isReminder, bdayMsg, arrayEvents,isEmergencyCall} = state.employeeForm;
  return {nameUser, phone,  dob, image, repeatValue, isReminder, bdayMsg, arrayEvents, isEmergencyCall} ;
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