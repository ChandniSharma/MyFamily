import React, { Component } from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image, TextInput,FlatList, AsyncStorage } from 'react-native';

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
import ListItem from './common/ListItem';


// let d1 = new Date();
// d1.setHours((new Date().getHours())+2);
// let reminderRepeatVal = constants.kYear;
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
        reminderAddOrNot:false,
        isEmergencyFlag:false,
        classNameComeFrom:''
    }

componentDidMount(){
    
    this._getStorageValue();

    // For setting value received from DB. 

    if(this.props.isEmergencyCall === constants.kNo){
        this.setState({isEmergencyFlag:false});
    }else{
        this.setState({isEmergencyFlag:true});
    }
  
    
}
async _getStorageValue(){
    const token = await AsyncStorage.getItem(constants.kClassNameComeFrom)
    console.log(token)
    if (!token == '') {
        this.setState({classNameComeFrom:token});
   }
   console.log('Emp Form *********',this.state.classNameComeFrom, '***********');

 }
   
    onEmergencyCallBtnClick(){
    
        if (this.props.isEmergencyCall && this.props.isEmergencyCall == constants.kNo) {

            this.props.EmployeeUpdate({prop:'isEmergencyCall', value:constants.kYes})
            this.setState({isEmergencyFlag:true});

        } else {
            this.props.EmployeeUpdate({prop:'isEmergencyCall', value:constants.kNo})
            this.setState({isEmergencyFlag:false});
        }
    }
    onAddEventBtnClick(){
            Actions.AddEvents();        
    }
    
   
    onChangeTextMessage(text){
        console.log( 'text length ', text.length);
        
        this.setState({charCount:text.length})
        
            this.props.EmployeeUpdate({prop:'bdayMsg', value:text})
        
    }
    onChangePhoneText(text){
        this.props.EmployeeUpdate({prop:'phone', value:text.replace(/[^0-9]/g, '')})
    }
    emergencyCall(){
        // use react-native-immediate-phone-call when update to react native from expo
          console.log(' ****  emergencyBtnClick ');
                // RNImmediatePhoneCall.immediatePhoneCall('0123456789');
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
      

         let image  = 'https://bootdey.com/img/Content/avatar/avatar6.png';
       
         if(this.props.image){
            image = this.props.image;
        }
        let isAnotherEventAdd = false;
            if (Array.isArray(this.props.arrayEvents)) {
                if(this.props.arrayEvents.length>0){
                    isAnotherEventAdd = true;
                }
            } 
            let isEmegency = false;
            if(this.props.isEmergencyCall === constants.kNo){
               isEmegency = false;
            }else {
                isEmegency = true;
            }
            let isEditView = true;
            if(this.state.classNameComeFrom === constants.kCreateClass){
               isEditView =  false;
            }
        return(
            <View>
                <View style= {styles.emergencyBtn}>
            <TouchableOpacity onPress={()=>this.emergencyCall()}>
                    <Image style={styles.emergencyCallImg} source={require('../../assets/CallEmergency.png')}/>
                </TouchableOpacity>
            </View>
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
                    keyboardType='numeric'
                    onChangeText={text =>  this.props.EmployeeUpdate({prop:'phone', value:text.replace(/[^0-9]/g, '')})}
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
                                    Mark this no. for emergency call
                        </Text>
                       <View style={styles.addReminderBtnView}> 
                                <TouchableOpacity style={styles.buttonStyle} onPress={() => this.onEmergencyCallBtnClick()}>
                                      {isEmegency? <Image source={require('../../assets/correct.png')} style={styles.imgCheckMark} /> :
                                 <Image source={require('../../assets/emptyCircle.png')} style={styles.imgCheckMark} />}   
                                       
                        </TouchableOpacity>
                       </View>
                    </CardSection>
                    <CardSection>
                            <Text style= {styles.textStyle}>
                                    Add events
                                </Text>
                            <View style={styles.addReminderBtnView}> 
                                        <TouchableOpacity style={styles.buttonStyle} onPress={() => this.onAddEventBtnClick()}>
                                            {isAnotherEventAdd? <Image source={require('../../assets/correct.png')} style={styles.imgCheckMark} /> :
                                            <Image source={require('../../assets/emptyCircle.png')} style={styles.imgCheckMark} />}   
                                            
                                </TouchableOpacity>
                            </View>
                    </CardSection>
                    
                    {/* <View style = { styles.listContainer }>
                             { this.eventList() }
                      </View> */}
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
      
}

const localNotification = {
    title: 'Reminder',
    body: 'Hey today is the birth date of chandni', // (string) — body text of the notification.
    ios: { // (optional) (object) — notification configuration specific to iOS.
      sound: true, // (optional) (boolean) — if true, play a sound. Default: false.
      vibrate: true
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

  
  let timeMonth= new Date();
//   timeMonth.setSeconds(timeMonth.getSeconds() + 10);
   timeMonth.setDate(timeMonth.getMonth()+1);

   console.log( 'month time calculated ', timeMonth);

  const schedulingOptionMonth = {
      
    time: timeMonth, 
   repeat: 'month' // Reminder repeat duration 
  };

  let timeWeek = new Date();
  timeWeek.setDate(timeWeek.getDate()+7);

  const schedulingOptionWeek = {
      time: timeWeek
  }
    let timeYear = new Date();
    timeYear.setDate(timeYear.getFullYear()+1);

  const schedulingOptionYear = {
    time: timeYear,
    repeat: 'year'
  }

const mapStateToProps = (state) => {
    const {nameUser, phone,  dob, image, repeatValue, isReminder, bdayMsg, arrayEvents,isEmergencyCall } = state.employeeForm;
    return {nameUser, phone,  dob, image, repeatValue, isReminder, bdayMsg, arrayEvents,isEmergencyCall};
}

const styles = {
    listContainer: {
        marginTop:10,
        width: '100%',
        height: '79%'
      },
    emergencyBtn:{
        marginTop:'2%',
        right: '3%',
        marginBottom: '5%',
       textAlign:'right',
       position: 'absolute'
    },
    emergencyCallImg:{
        width:32,
        height:32,
        alignSelf:'center'
    },
    pickerTextStyle:{
        fontSize: 18,
        paddingLeft: 20,
    },
    textStyle:{
        fontSize:17, color: 'black', justifyContent:'center', marginLeft:15,
        marginTop: 10
    },
    datePickerStyle:{
        width: "62%",
        marginLeft: 20,
    },
    imageStyle:{
        width: 100, height: 100, position: "absolute" , borderRadius:50
    }, 
    imageBtnStyle:{
        marginTop:10,
        padding:10 ,
        width: 100, 
        height: 100 , 
        alignItems: 'center',
        justifyContent: 'center', 
        position:'relative', 
        alignSelf: 'center', 
        borderRadius:50, 
        backgroundColor:constants.kNotSelectedColor
    },
    addReminderBtnView:{
        marginTop: 10,  
       
        marginLeft:10,
       
    },
    emergencyView:{
     marginTop:10,
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
        right: '8%',
        bottom:'5%',
        color: 'gray',
    
    }    

}

export default connect(mapStateToProps, {EmployeeUpdate}) (EmployeeForm) ;