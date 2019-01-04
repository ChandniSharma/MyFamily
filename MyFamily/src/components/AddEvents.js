import React, {Component} from 'react';
import { StyleSheet, View, TextInput, FlatList, Text, Alert, Image, TouchableOpacity, Keyboard, TouchableWithoutFeedback, ScrollView,AsyncStorage } from 'react-native';
import ListItem from './common/ListItem';

import DatePicker from "react-native-datepicker";
import InputEvent from './common/InputEvent';
import * as constants from './Constants';
import MessageInput from './MessageInput';
import { Actions } from 'react-native-router-flux';
import {CardSection, Card, Button} from './common';
import { EmployeeUpdate } from '../actions';
import { connect } from 'react-redux';


const DismissKeyboardHOC = (Comp) => {
    return ({ children, ...props }) => (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Comp {...props}>
          {children}
        </Comp>
      </TouchableWithoutFeedback>
    );
  };
   const DismissKeyboardView = DismissKeyboardHOC(View)
  
class AddEvents extends Component {

state = {
    placeName: '',
    places: [],
    dateEvent: '',
    message:'',
    reminderAddOrNot:constants.kNo,
    classNameComeFrom:'',
}

 componentDidMount(){

    this._getStorageValue()
     console.log('in Add Events ',this.props.arrayEvents );

     let cloneArray = [];
     if(Array.isArray(this.props.arrayEvents)){
         if(this.props.arrayEvents.length>0){
            cloneArray = this.props.arrayEvents.concat();
            this.setState({places:cloneArray});
            console.log('places in didmount ', this.state.places, 'clone array ', cloneArray);
         }
     }
     
 }
 componentWillMount(){
     
 }
 async _getStorageValue(){
    const token = await AsyncStorage.getItem(constants.kClassNameComeFrom)
    console.log(token)
    if (!token == '') {
        this.setState({classNameComeFrom:token});
   }
 }

placeSubmitHandler = () => {
    
    if(this.state.placeName.trim() === '' || this.state.dateEvent.trim() === '' || this.state.placeName.length>20) {
    return;
    }else{
       
        if(this.state.places.length>4){
            Alert.alert(
                '',
                constants.msgEventAddLimit,
                [
                  {text: constants.titleOk, onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                ],
                { cancelable: false }
              )
               return;   
        }
       }      
        this.setState(prevState => {
            return {
                    places: prevState.places.concat({
                    key: Math.random(), 
                    value: prevState.placeName+' '+':'+' '+prevState.dateEvent+' '+'Msg:'+prevState.message+'Reminder'+prevState.reminderAddOrNot
            })
            }
        });
    
   this.setState({
      placeName: '',
      dateEvent: '',
      message:'',
      reminderAddOrNot:constants.kNo,
   });	
}
onReminderBtnClick(){
      if (this.state.reminderAddOrNot === constants.kNo) {
              
              this.setState({reminderAddOrNot:constants.kYes});
      } else {
          this.setState({reminderAddOrNot:constants.kNo});
          
      }
  }

placeNameChangeHandler = (value) => {
  this.setState({
      placeName: value
    });    
}

placesOutput = () => {
   return (
       <View style={styles.listContainer}>
            <FlatList
                data = { this.state.places }
                scrollEnabled={true}
                marginBottom={50}
                keyExtractor={(item, index) => index.toString()}
                    renderItem = { info => (
                    <ListItem 
                        placeName={ info.item.value }
                        onItemPressed={() => this.onItemDeleted(info.item.key)}
                    />
                    )}
                />
       </View>
    )
}

onItemDeleted = (key) => {
   this.setState(prevState => {
      return {
         places: prevState.places.filter(place => {
            return place.key !== key;
      })
     }
    })
}

render() {

    let imgClock;
    if(this.state.reminderAddOrNot === constants.kYes){
        imgClock =  <Image source={require('../../assets/activeAlarm.png')} style={styles.alarmStyle} />
    }else{
        imgClock = <Image source={require('../../assets/InactiveAlarm.png')} style={styles.alarmStyle} />
    }
    let viewBottom = <View />;
  let isEditView = false;
  console.log('Add Events ===== ',this.state.classNameComeFrom );
            if(this.state.classNameComeFrom === constants.kEditClass){
                isEditView = true;
            }
   return (
    <View style={{flex: 1, backgroundColor:'#ffffff'}}> 
   
    <View style={ styles.container }>
    
   {!isEditView?<DismissKeyboardView style = { styles.inputContainer }>
              <InputEvent 
                    label={'Event Name'}
                    placeholder={'Chandni'}
                    value={this.state.placeName}
                    onChangeText={this.placeNameChangeHandler }
                    charLimit={20}
                    />
                     <DatePicker
                            style={styles.datePickerStyle}
                            date={this.state.dateEvent}
                            mode="date"
                            placeholder="Event Date"
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
                                    borderColor:'gray',
                                    borderWidth: 1,
                                    borderRadius:15
                                }
                                // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(date) => this.setState({dateEvent:date})}
                        />
         
         <TouchableOpacity style={styles.placeButton} onPress={ this.placeSubmitHandler  }>
                        <Image source={require('../../assets/plusIcon.png')} style={styles.imageStyle } />
                     </TouchableOpacity>
       
        </DismissKeyboardView>:<View />}
        {!isEditView? 
        <CardSection>
        <MessageInput 
                    label={'Message'}
                    placeholder={'Message'}
                    value={this.state.message}
                    onChangeText={(text) => this.setState({message:text})}
                    />
                     <Text style={styles.textLimit}>
                            {this.state.message.length}/200
                    </Text>
        </CardSection>:<View />}
        {!isEditView?
        <CardSection>
                    <Text style= {styles.textStyle}>
                            Add Reminder
                        </Text>
                    <View style={styles.addReminderBtnView}> 
                                <TouchableOpacity style={styles.buttonStyle} onPress={() => this.onReminderBtnClick()}>
                                      {imgClock}   
                               </TouchableOpacity>
                    </View>
                    </CardSection> 
                  :<View />}

            <View style = { styles.listContainer }>
                { this.placesOutput() }
           </View>

      </View>
     {!isEditView?<View style={styles.viewBottom}>
                            <Text style={styles.textNote}>
                                Note: You can add upto 5 events.
                            </Text>
                            <CardSection>
                                        <Button onPress={()=> this.onClickBack()}>
                                        Back To Add View
                                        </Button>
                                    </CardSection>
                        </View>:<View />}
       </View>
    );
  }
  onClickBack(){
    //   console.log('on click back in add  ',this.state.places);

       this.props.EmployeeUpdate({prop:'arrayEvents', value:this.state.places});
       Actions.pop({arrayEvents:this.state.places});
   }
}

const mapStateToProps = (state) => {
    const {arrayEvents } = state.employeeForm;

    
    return {arrayEvents};
}

export default connect (mapStateToProps, {EmployeeUpdate})(AddEvents);

const styles = StyleSheet.create({
      container: {
    	   paddingTop: '5%',
    	  justifyContent: 'flex-start',
          alignItems: 'center',
          
      },
      alarmStyle:{
        width:32,
        height:32
      },
      messageView:{
        marginTop: 10,
        marginBottom: 10,
      },
      inputContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      marginBottom:10
    //   marginTop:'8%'
      },
      placeInput: {
      width: '40%',
      left:10,
      borderColor: 'gray',
        borderWidth: 1,
         borderRadius: 10,
        height: 40,
        backgroundColor:'#ffffff',
      },
      mobile: {
        width: '40%',
        borderColor: 'gray',
          borderWidth: 1,
           borderRadius: 10,
          height: 40,
          backgroundColor:'#ffffff',
          right:10
        },

      placeButton: {
       width: '20%',
       paddingLeft:'2%'
      },
      listContainer: {
        marginTop:10,
        width: '100%',
        height: '79%'
      },
      imageStyle:{
        width:32,
        height:32,
       
    },
    viewBottom:{
        marginTop:10,
        width:'100%',
        position:'absolute',
        alignItems: 'center',
        bottom:5,
    },
    textNote:{
        color: '#656565',
        fontSize: 14,
        paddingBottom: '-5%',
       },
       datePickerStyle:{
        width: "40%",
        marginLeft: 5,
        borderRadius: 20
    },
    textLimit:{
        fontSize:12,
        position: 'absolute',
        right: '8%',
        bottom:'5%',
        color: 'gray',
    
    },
    textStyle:{
        fontSize:17, color: 'black', justifyContent:'center', marginLeft:15,
        marginTop: 10
    },
    addReminderBtnView:{
        marginTop: 5,  
        marginLeft:10,
       
    },
});