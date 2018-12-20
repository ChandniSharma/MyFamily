import React, { Component } from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';

import { CardSection, Input, Button } from './common';
import { connect } from 'react-redux';
import { EmployeeUpdate } from '../actions';
import DatePicker from "react-native-datepicker";

import { ImagePicker, Notifications } from 'expo';

let d1 = new Date();
d1.setHours((new Date().getHours())+2);

class EmployeeForm extends Component{
    state ={
       isReminderAdd: false,
       image: null,
    }
    onReminderBtnClick(){
        if (this.state.isReminderAdd) {
            this.setState({isReminderAdd:false})
            Notifications.cancelAllScheduledNotificationsAsync();
        } else {
            this.setState({isReminderAdd:true})
            Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions);
        }
    }
    render(){
        console.log("Emp form ", this.props);
        let { image } = this.state;
         
        let reminderBtnTitle = '';
        if (!this.state.isReminderAdd) {
            reminderBtnTitle = 'Click Me To Add Reminder'
            this.props.EmployeeUpdate({prop:'isReminder', value:'NO'})
        } else {
            reminderBtnTitle = 'Reminder has Added';
            this.props.EmployeeUpdate({prop:'isReminder', value:'YES'})

        }
        return(
            <ScrollView>
            <View>
            
            <TouchableOpacity style={{padding:10 ,width: 100, height: 100 , alignItems: 'center', justifyContent: 'center', position:'relative', alignSelf: 'center', borderRadius:50, backgroundColor:'white' }} onPress= {this._pickImage}>
                                <Text style={{alignSelf:'center'}}>
                                   Click Me!
                                </Text>

                {image? 
                  <Image source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} style={{ width: 100, height: 100, position: "absolute" , borderRadius:50}} />
                  : 
                  <Image source={{ uri: image }} style={{ width: 100, height: 100, position: "absolute" , borderRadius:50}} />}

                                {/* {image &&
                            <Image source={{ uri: image }} style={{ width: 100, height: 100, position: "absolute" , borderRadius:50}} />} */}
                            
                            </TouchableOpacity>
    
                
                <CardSection>
                    <Input 
                    label="Name"
                    placeholder="Chandni"
                    onChangeText={text => this.props.EmployeeUpdate({prop:'nameUser', value:text})}
                    value={this.props.nameUser}
                    />
                </CardSection>

                <CardSection>
                 <Input 
                    label="Phone"
                    placeholder="555-555-5555" 
                    onChangeText={text =>this.props.EmployeeUpdate({prop:'phone', value:text})}
                    value={this.props.phone}
                    />
                 </CardSection>

                 <CardSection>

                 <Text style={{ fontSize:17, color: 'black', justifyContent:'center', marginLeft:10}}>
                     Date Of Birth
                 </Text>

                     <DatePicker
                            style={{width: "40%",marginLeft: 20,}}
                            date={this.props.dob}
                            mode="date"
                            placeholder=""
                            format="DD-MM-YYYY"
                            // minDate={d1}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    borderColor: 'rgba(0,0,0,0.7)',
                                    borderWidth: 1,
                                    borderRadius:5
                                }
                                // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(date) => this.props.EmployeeUpdate({prop:'dob', value:date})}
                        />
                 </CardSection>
                    <View style={{marginTop: 10,  padding:10, marginBottom:10}}> 
                    <Button style={{alignSelf: 'center'}} onPress={this.onReminderBtnClick.bind(this)}>
                                        {reminderBtnTitle}
                    </Button>
                    </View>
            </View>
              </ScrollView>
        )
    }
    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          this.setState({ image: result.uri });
        }
      };
}

const localNotification = {
    title: '',
    body: '', // (string) — body text of the notification.
    ios: { // (optional) (object) — notification configuration specific to iOS.
      sound: true // (optional) (boolean) — if true, play a sound. Default: false.
    },
android: // (optional) (object) — notification configuration specific to Android.
    {
      sound: true, // (optional) (boolean) — if true, play a sound. Default: false.
      //icon (optional) (string) — URL of icon to display in notification drawer.
      //color (optional) (string) — color of the notification icon in notification drawer.
      priority: 'high', // (optional) (min | low | high | max) — android may present notifications according to the priority, for example a high priority notification will likely to be shown as a heads-up notification.
      sticky: false, // (optional) (boolean) — if true, the notification will be sticky and not dismissable by user. The notification must be programmatically dismissed. Default: false.
      vibrate: true // (optional) (boolean or array) — if true, vibrate the device. An array can be supplied to specify the vibration pattern, e.g. - [ 0, 500 ].
      // link (optional) (string) — external link to open when notification is selected.
    }
  };

  let t = new Date();
  t.setSeconds(t.getSeconds() + 10);
  const schedulingOptions = {
      
    time: t, // (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
    //repeat: repeat
  };
const mapStateToProps = (state) => {
    const {nameUser, phone,  dob, image, repeatValue, isReminder } = state.employeeForm;

    console.log( 'dob is ---',dob  );
    return {nameUser, phone,  dob, image, repeatValue, isReminder};
}

const styles = {
    pickerTextStyle:{
        fontSize: 18,
        paddingLeft: 20,
    }
}

export default connect(mapStateToProps, {EmployeeUpdate}) (EmployeeForm) ;