import React, { Component} from 'react';
import {Text, TouchableWithoutFeedback, View, TouchableOpacity, Share, Image} from 'react-native';
import {CardSection} from './common/CardSection';
import { Actions } from 'react-native-router-flux';
import { Button } from './common';
import Communications from 'react-native-communications';


class ListItem extends Component{
    onPressRow(){
        Actions.EmployeeEdit({employee: this.props.employee});
    }
onPressCall(){
    // Communications.phonecall('+918518016290',true);
    Communications.phonecall('+91'+this.props.phone,true);

}
onPressSMS(){
    Communications.text('+91'+this.props.employee.phone, `Here is your message`);

}
 onPressShare () {
    try {
      const result = Share.share({
        message:
          'This is very good application pls download it. ',
      })

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

render(){
    const {nameUser,phone, dob, image, repeatValue} = this.props.employee;

     console.log("in List Item  Name ************", nameUser, "employeeeee---", this.props.employee); 
    let  imageIcon  = 'https://bootdey.com/img/Content/avatar/avatar6.png';
       
         if(image){
            imageIcon = image;
        }
        let repeatMessage = '';
        if(repeatValue){
            repeatMessage =  'Repeat reminder every'+' '+repeatValue;
        }
    return(
        <TouchableWithoutFeedback onPress={this.onPressRow.bind(this)}>
        <View style={styles.viewOuter}>
            <View style={styles.viewInner}>
            
            <View style={styles.mainView}>
            <View>
              <Image source={{ uri: imageIcon }} style={styles.imageStyle} />
            </View>
                <View style={styles.leftView}>
                    <Text style={styles.titleStyle}>
                            {nameUser}
                        </Text>
                        <Text>
                            +91-{phone}
                        </Text>
                        <Text>
                            {dob}
                        </Text>
                        <Text>
                           {repeatMessage}
                        </Text>
                </View>
                    
                    <View style={styles.rightView}>
                        <TouchableOpacity onPress={() => this.onPressCall() }>
                         <Image style={styles.callImg} source={require('../../assets/Call.png')} />
                        </TouchableOpacity>
                           
                        <TouchableOpacity onPress={() => this.onPressSMS() }>
                           <Image style={styles.message} source={require('../../assets/Message.png')} />
                        </TouchableOpacity>
                        
                        <TouchableOpacity onPress={() => this.onPressShare() }>
                           <Image style={styles.share} source={require('../../assets/Share.png')} />
                        </TouchableOpacity>
                    </View>
                
                </View>

             </View>            
             </View>
        </TouchableWithoutFeedback>
        
    );
}
}


const styles={
    callImg:{
        width:32,
        height:32
    },
    message:{
        width:32,
        height:32
    },
    share:{
        width:32,
        height:32
    },
    imageStyle:{
        width: 70, height: 70, borderRadius:35, 
    }, 
    mainView:{
     flexDirection: 'row',
     alignItems:'center'
    },
    titleStyle:{
        fontSize: 18,
        // paddingLeft: 5,
    },
    leftView:{
      marginLeft: 5,
    },
    rightView:{
     right: '2%',
    //  backgroundColor:'pink',
     position:'absolute', 
     
    
    },
    viewOuter:{

        padding: 10,
     },
    viewInner:{
        padding: 15,
        backgroundColor: '#f2f2f2',
        borderBottomColor : 'gray',
        borderWidth: 0.8,
        // borderLeftWidth: 0.5,
        shadowColor: 'black',
        shadowOffset: {width:1.0,height:2},
        shadowOpacity: 0.5,
        shadowRadius: 1.5,
        elevation: 3,

    },
}

export default ListItem;

 