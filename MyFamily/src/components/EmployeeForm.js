import React, { Component } from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';

import { CardSection, Input, Button } from './common';
import { connect } from 'react-redux';
import { EmployeeUpdate } from '../actions';
import DatePicker from "react-native-datepicker";

import { ImagePicker, Notifications, LinearGradient } from 'expo';
import MessageInput from './MessageInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import { Actions } from 'react-native-router-flux';
import AddEvents from './AddEvents';
import * as constants from './Constants';



let d1 = new Date();
d1.setHours((new Date().getHours())+2);
let reminderRepeatVal = constants.kYear;
// let t = new Date();
//   t.setSeconds(t.getSeconds() + 10);
  
class EmployeeForm extends Component{
    state ={
       
      
       image: 'https://bootdey.com/img/Content/avatar/avatar6.png',
       repeatValue: constants.kYear, // Default repeat value is year 
       bgColorBtnYear: constants.kSelectedColor,
       bgColorBtnMonth: constants.kNotSelectedColor,
       bgColorBtnWeek: constants.kNotSelectedColor,
        isYear: true,
        isMonth: false,
        isWeek: false,
        charCount:200,
        
    }

componentDidMount(){
    console.log(' data Event array', this.props.arrayEvent);
    if (this.props.repeatValue === constants.kYear) {
        this.setState({bgColorBtnYear:constants.kSelectedColor});
        this.setState({bgColorBtnMonth:constants.kNotSelectedColor});
        this.setState({bgColorBtnWeek:constants.kNotSelectedColor});
    } else if(this.props.repeatValue === constants.kMonth){
        this.setState({bgColorBtnYear:constants.kNotSelectedColor});
        this.setState({bgColorBtnMonth:constants.kSelectedColor});
        this.setState({bgColorBtnWeek:constants.kNotSelectedColor});
    }else{
        this.setState({bgColorBtnYear:constants.kNotSelectedColor});
        this.setState({bgColorBtnMonth:constants.kNotSelectedColor});
        this.setState({bgColorBtnWeek:constants.kSelectedColor});
    }
    console.log('In emp form  bday msg length ', this.props.bdayMsg.length);

    if(this.props.bdayMsg.length>0){
        this.setState({charCount:this.props.bdayMsg.length});
    }
}

    onReminderBtnClick(){
        if (this.props.isReminder === constants.kNo) {
           
            this.props.EmployeeUpdate({prop:'isReminder', value:constants.kYes})
           // Notifications.cancelAllScheduledNotificationsAsync();
        } else {
           
            this.props.EmployeeUpdate({prop:'isReminder', value:constants.kNo})

            // reminderRepeatVal = this.state.repeatValue;
            Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions);
        }
    }

    onAddEventBtnClick(){
            Actions.AddEvents();        
    }
    onYearBtnClick(){
        
        this.props.EmployeeUpdate({prop:'repeatValue', value:constants.kYear})
        if (this.state.isYear) {
            this.setState({
                 bgColorBtnYear: constants.kNotSelectedColor,
                 isYear: false
             });
        } else {
           this.setState({
                bgColorBtnYear: constants.kSelectedColor,
                bgColorBtnMonth: constants.kNotSelectedColor,
                bgColorBtnWeek: constants.kNotSelectedColor,
                isYear: true,
                isMonth: false,
                isWeek: false
            });
        }
       
    }
    onMonthBtnClick(){
        this.props.EmployeeUpdate({prop:'repeatValue', value:constants.kMonth})
        if (this.state.isMonth) {
            console.log('in month true ')
            this.setState({
                bgColorBtnMonth: constants.kNotSelectedColor,
                
                    isMonth: false,
                    
                });
            
        } else {
            console.log('in month else')
            this.setState({
                bgColorBtnMonth: constants.kSelectedColor,
                bgColorBtnYear: constants.kNotSelectedColor,
                bgColorBtnWeek: constants.kNotSelectedColor,
                    isMonth: false,
                    isYear: false,
                    isMonth: true
            });
        }
    }
    onWeekBtnClick(){
        this.props.EmployeeUpdate({prop:'repeatValue', value:constants.kWeek})
        if (this.state.isWeek) {
            this.setState({
                 bgColorBtnWeek: constants.kNotSelectedColor,
                 isWeek: false
             });
        } else {
           this.setState({
            bgColorBtnMonth: constants.kNotSelectedColor,
            bgColorBtnYear: constants.kNotSelectedColor,
            bgColorBtnWeek: constants.kSelectedColor,
                isMonth: false,
                isYear: false,
                isWeek: true
            });
        }
    }
onChangeTextMessage(text){
    console.log( 'text length ', text.length);
    
     this.setState({charCount:text.length})
    {
        this.props.EmployeeUpdate({prop:'bdayMsg', value:text})
    }
}

    render(){
        console.log("Emp form ", this.props);
         let  image  = 'https://bootdey.com/img/Content/avatar/avatar6.png';
       
         if(this.props.image){
            image = this.props.image;
        }
        let isAnotherEventAdd = false;
        if (Array.isArray(this.props.arrayEvent)) {
            if(this.props.arrayEvent.length>0){
                isAnotherEventAdd = true
            }
        } 
        let reminderAddOrNot = false;
        if (this.props.isReminder === constants.kYes) {
            reminderAddOrNot = true;
        } 

        
        return(
            
            <View>
            <TouchableOpacity style={styles.imageBtnStyle } onPress= {this._pickImage}>
                                <Text style={{alignSelf:'center'}}>
                                   {/* Click Me! */}
                                </Text>
             <Image source={{ uri: image }} style={styles.imageStyle} />
             
                </TouchableOpacity>
    
                
                <CardSection>
                    <Input 
                    label="Name"
                    placeholder="Chandni"
                    charLimit={25}
                    onChangeText={text => this.props.EmployeeUpdate({prop:'nameUser', value:text})}
                    value={this.props.nameUser}
                    />
                </CardSection>

                <CardSection>
                <Input 
                    label={'Phone'}
                    prefix={'+91'}
                    placeholder={'Mobile Number'}
                    value={this.props.phone}
                    charLimit={10}
                    keyboardType='number-pad'
                    onChangeText={text => this.props.EmployeeUpdate({prop:'phone', value:text})}
                />
                
                 </CardSection>

                 <CardSection>

                 <Text style={styles.textStyle}>
                     Date Of Birth
                 </Text>
                     <DatePicker
                            style={styles.datePickerStyle}
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
                    <CardSection>
                    <Text style= {styles.textStyle}>
                            Add Reminder
                        </Text>
                    <View style={styles.addReminderBtnView}> 
                                <TouchableOpacity style={styles.buttonStyle} onPress={() => this.onReminderBtnClick()}>
                                      {reminderAddOrNot? <Image source={require('../../assets/correct.png')} style={styles.imgCheckMark} /> :
                                    <Image source={require('../../assets/emptyCircle.png')} style={styles.imgCheckMark} />}   
                                       
                        </TouchableOpacity>
                                        
                    </View>
                    </CardSection>
                    <CardSection>
                    <MessageInput
                        onChangeText={text =>  this.onChangeTextMessage(text)}
                        value={this.props.bdayMsg}
                      />
                       <Text style={styles.textLimit}>
                            {this.state.charCount}/200
                    </Text>
                        {/* <MessageInput 
                        label="Message"
                        placeholder="Write your wishes and blessings !!! "
                        onChangeText={text => this.props.EmployeeUpdate({prop:'bdayMsg', value:text})}
                        value={this.props.bdayMsg}
                        charLimit={100}
                        /> */}
                    </CardSection>
                    <CardSection>
                        <Text style= {styles.textStyle}>
                            Repeat Reminder
                        </Text>
                        <View style={styles.repeatReminderView}> 

                            <TouchableOpacity style={{borderWidth: 1, borderRadius: 3, marginLeft: 10, marginRight: 10, width: 50,
                                            height: 50, backgroundColor:this.state.bgColorBtnYear, alignItems:'center', justifyContent:'center'}} onPress={() => this.onYearBtnClick()}>
                                            <Text> 
                                            Year 
                                        </Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{borderWidth: 1, borderRadius: 3, marginLeft: 10, marginRight: 10, width: 50,
                                            height: 50, backgroundColor:this.state.bgColorBtnMonth, alignItems:'center', justifyContent:'center'}} onPress={() => this.onMonthBtnClick()}>
                                            <Text> 
                                            Month 
                                        </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{borderWidth: 1, borderRadius: 3, marginLeft: 10, marginRight: 10, width: 50,
                                            height: 50, backgroundColor:this.state.bgColorBtnWeek, alignItems:'center', justifyContent:'center'}} onPress={() => this.onWeekBtnClick()}>
                                            <Text> 
                                            Week 
                                        </Text>
                                </TouchableOpacity>
                                        </View>
                    </CardSection>
                    <CardSection>
                    <Text style= {styles.textStyle}>
                            Add another events
                        </Text>
                    <View style={styles.addReminderBtnView}> 
                                <TouchableOpacity style={styles.buttonStyle} onPress={() => this.onAddEventBtnClick()}>
                                      {isAnotherEventAdd? <Image source={require('../../assets/correct.png')} style={styles.imgCheckMark} /> :
                                    <Image source={require('../../assets/emptyCircle.png')} style={styles.imgCheckMark} />}   
                                       
                        </TouchableOpacity>
                                        
                                        </View>
                    </CardSection>
                   
            </View>
             
        )
    }
    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
        });
        console.log(result);
    
        if (!result.cancelled) {
            this.props.EmployeeUpdate({prop:'image', value:result.uri})
        
        }
      };

      // Validations 
      mobileValidate(phoneNumber) {
        const reg = /^[0]?[789]\d{9}$/;
        if (reg.test(phoneNumber) === false) {

            this.props.EmployeeUpdate({prop:'phone', value:phoneNumber})
            // this.setState({
            //     mobileValidate: false,
            //     phoneNumber: phoneNumber,
            // });
            return false;
        } else {

            this.props.EmployeeUpdate({prop:'phone', value:phoneNumber})
            // this.setState({
            //     mobileValidate: true,
            //     phoneNumber: phoneNumber,
            // });
            return true;
        }
    }

}

const localNotification = {
    title: 'Reminder',
    body: 'Hey today is the birth date of chandni', // (string) — body text of the notification.
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
  console.log( 'repeat value ', reminderRepeatVal)
  const schedulingOptions = {
      
    time: t, 
    repeat: constants.kYear // Reminder repeat duration 
  };

const mapStateToProps = (state) => {
    const {nameUser, phone,  dob, image, repeatValue, isReminder, bdayMsg, arrayEvent } = state.employeeForm;

    
    return {nameUser, phone,  dob, image, repeatValue, isReminder, bdayMsg, arrayEvent};
}

const styles = {
    pickerTextStyle:{
        fontSize: 18,
        paddingLeft: 20,
    },
    textStyle:{
        fontSize:17, color: 'black', justifyContent:'center', marginLeft:10,
        marginTop: 10
    },
    datePickerStyle:{
        width: "40%",
        marginLeft: 20,
    },
    imageStyle:{
        width: 100, height: 100, position: "absolute" , borderRadius:50
    }, 
    imageBtnStyle:{
        padding:10 ,
        width: 100, 
        height: 100 , 
        alignItems: 'center',
        justifyContent: 'center', 
        position:'relative', alignSelf: 'center', borderRadius:50, backgroundColor:constants.kNotSelectedColor
    },
    addReminderBtnView:{
        marginTop: 10,  
        marginBottom:10,
        marginLeft:10,
       
    },
    repeatReminderView:{
        flexDirection: 'row',
        flex: 1,
        
    },
     yearBtn:{
        borderWidth: 1,
        borderRadius: 3,
        marginLeft: 10,
        marginRight: 10,
        width: 35,
        height: 35,
        backgroundColor:constants.kSelectedColor,
        },
    imgCheckMark:{
        width:32,
        height: 32,
         
    },
    textLimit:{
        fontSize:12,
        position: 'absolute',
        right: '13%',
        bottom:'5%',
        color: 'gray',
    
    }    

}

export default connect(mapStateToProps, {EmployeeUpdate}) (EmployeeForm) ;