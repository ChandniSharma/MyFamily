import React, {Component} from 'react';
import { StyleSheet, View, TextInput, FlatList, Text, Alert, Image, TouchableOpacity, Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native';
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
}

 componentDidMount(){
     console.log('in Add Events ',this.props.arrayEvent );
     let cloneArray = [];
     if(Array.isArray(this.props.arrayEvent)){
         if(this.props.arrayEvent.length>0){
            cloneArray = this.props.arrayEvent.concat();
            this.setState({places:cloneArray});
            console.log('places in didmount ', this.state.places, 'clone array ', cloneArray);
         }
     }
     
 }
 componentWillMount(){
     
 }

placeSubmitHandler = () => {
    let alertMessage=''; 
    if(this.state.placeName.trim() === '' || this.state.dateEvent.trim() === '') {
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
                    value: prevState.placeName+' '+':'+' '+prevState.dateEvent+' '+'Msg:'+prevState.message
            })
            }
        });
    
   this.setState({
      placeName: '',
      dateEvent: '',
      message:''
   });	
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
   return (
    <View style={{flex: 1, backgroundColor:'#ffffff'}}> 
   
    <View style={ styles.container }>
    
   <DismissKeyboardView style = { styles.inputContainer }>
              <InputEvent 
                    label={'Event Name'}
                    placeholder={'Chandni'}
                    value={this.state.placeName}
                    onChangeText={this.placeNameChangeHandler }
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
       
        </DismissKeyboardView>
        <CardSection>
        <MessageInput 
                    label={'Message'}
                    placeholder={'Message'}
                    value={this.state.message}
                    onChangeText={(text) => this.setState({message:text})}
                    />
        </CardSection>
        

            <View style = { styles.listContainer }>
                { this.placesOutput() }
           </View>

      </View>
       <View style={styles.viewBottom}>
            <Text style={styles.textNote}>
                Note: You can add upto 5 events.
            </Text>
            <CardSection>
                        <Button onPress={()=> this.onClickBack()}>
                           Back To Add View
                        </Button>
                    </CardSection>
         </View>
    </View>
    );
  }
  onClickBack(){
    //   console.log('on click back in add  ',this.state.places);

      this.props.EmployeeUpdate({prop:'arrayEvent', value:this.state.places});
      Actions.EmployeeCreate({arrayEvent:this.state.places});


    // this.props.navigation.navigate('Home',{
    //     itemId: 86,
    //     otherParam: 'anything you want here',
    //   });
   }
}

const mapStateToProps = (state) => {
    const {arrayEvent } = state.employeeForm;

    
    return {arrayEvent};
}

export default connect (mapStateToProps, {EmployeeUpdate})(AddEvents);

const styles = StyleSheet.create({
      container: {
    	   paddingTop: '5%',
    	  justifyContent: 'flex-start',
          alignItems: 'center',
          
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
        height: '82%'
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
        marginLeft: 20,
        borderRadius: 20
    },

});