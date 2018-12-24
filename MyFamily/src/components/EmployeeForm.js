import React, { Component } from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';

import { CardSection, Input, Button } from './common';
import { connect } from 'react-redux';
import { EmployeeUpdate } from '../actions';
import DatePicker from "react-native-datepicker";

import { ImagePicker, Notifications, LinearGradient } from 'expo';
import MessageInput from './MessageInput';


let d1 = new Date();
d1.setHours((new Date().getHours())+2);
let reminderRepeatVal = 'year';
// let t = new Date();
//   t.setSeconds(t.getSeconds() + 10);
  
class EmployeeForm extends Component{
    state ={
       isReminderAdd: false,
       image: 'https://bootdey.com/img/Content/avatar/avatar6.png',
       repeatValue: 'year', // Default repeat value is year 
       bgColorBtnYear: 'pink',
       bgColorBtnMonth: '#ffffff',
       bgColorBtnWeek: '#ffffff',
        isYear: true,
        isMonth: false,
        isWeek: false,
        
    }



    onReminderBtnClick(){
        if (this.state.isReminderAdd) {
            this.setState({isReminderAdd:false})
           // Notifications.cancelAllScheduledNotificationsAsync();
        } else {
            this.setState({isReminderAdd:true})
            // reminderRepeatVal = this.state.repeatValue;
            Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions);
        }
    }
    onYearBtnClick(){
        
        
        this.props.EmployeeUpdate({prop:'repeatValue', value:'year'})
        if (this.state.isYear) {
            this.setState({
                 bgColorBtnYear: 'white',
                 isYear: false
             });
        } else {
           this.setState({
                bgColorBtnYear: 'pink',
                bgColorBtnMonth: 'white',
                bgColorBtnWeek: 'white',
                isYear: true,
                isMonth: false,
                isWeek: false
            });
        }
       
    }
    onMonthBtnClick(){
        this.props.EmployeeUpdate({prop:'repeatValue', value:'month'})
        if (this.state.isMonth) {
            console.log('in month true ')
            this.setState({
                bgColorBtnMonth: 'white',
                
                    isMonth: false,
                    
                });
            
        } else {
            console.log('in month else')
            this.setState({
                bgColorBtnMonth: 'pink',
                bgColorBtnYear: 'white',
                bgColorBtnWeek: 'white',
                    isMonth: false,
                    isYear: false,
                    isMonth: true
            });
        }
    }
    onWeekBtnClick(){
        this.props.EmployeeUpdate({prop:'repeatValue', value:'week'})
        if (this.state.isWeek) {
            this.setState({
                 bgColorBtnWeek: 'white',
                 isWeek: false
             });
        } else {
           this.setState({
            bgColorBtnMonth: 'white',
            bgColorBtnYear: 'white',
            bgColorBtnWeek: 'pink',
                isMonth: false,
                isYear: false,
                isWeek: true
            });
        }
    }

    render(){
        console.log("Emp form ", this.props);
         let  image  = 'https://bootdey.com/img/Content/avatar/avatar6.png';
       
         if(this.props.image){
            image = this.props.image;
        }

        let reminderBtnTitle = '';
        if (!this.state.isReminderAdd) {
            reminderBtnTitle = 'Add Reminder'
            this.props.EmployeeUpdate({prop:'isReminder', value:'NO'})
        } else {
            reminderBtnTitle = 'Reminder Added';
            this.props.EmployeeUpdate({prop:'isReminder', value:'YES'})

        }
        return(
            <ScrollView>
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
                                      {this.state.isReminderAdd? <Image source={require('../../assets/correct.png')} style={styles.imgCheckMark} /> :
                                    <Image source={require('../../assets/emptyCircle.png')} style={styles.imgCheckMark} />}   
                                       
                        </TouchableOpacity>
                                        
                                        </View>
                    </CardSection>
                    <CardSection>
                        <MessageInput 
                        label="Message"
                        placeholder="Write your wishes and blessings !!! "
                        onChangeText={text => this.props.EmployeeUpdate({prop:'bdayMsg', value:text})}
                        value={this.props.bdayMsg}
                        />
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
            this.props.EmployeeUpdate({prop:'image', value:result.uri})
        
        }
      };
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
    repeat: 'year' // Reminder repeat duration 
  };

const mapStateToProps = (state) => {
    const {nameUser, phone,  dob, image, repeatValue, isReminder, bdayMsg } = state.employeeForm;

    console.log( 'dob is ---',dob  );
    return {nameUser, phone,  dob, image, repeatValue, isReminder, bdayMsg};
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
        position:'relative', alignSelf: 'center', borderRadius:50, backgroundColor:'white'
    },
    addReminderBtnView:{
        marginTop: 10,  
        marginBottom:10,
        marginLeft:10,
       
    },
    repeatReminderView:{
        flexDirection: 'row',
        flex: 1,
        marginBottom:40,
    },
     yearBtn:{
        borderWidth: 1,
        borderRadius: 3,
        marginLeft: 10,
        marginRight: 10,
        width: 35,
        height: 35,
        backgroundColor:'pink'
        },
    imgCheckMark:{
        width:32,
        height: 32,
         
    },
        

}

export default connect(mapStateToProps, {EmployeeUpdate}) (EmployeeForm) ;