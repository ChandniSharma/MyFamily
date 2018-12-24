import React, { Component} from 'react';
import {Text, TouchableWithoutFeedback, View, TouchableOpacity, Share} from 'react-native';
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
    Communications.phonecall(this.props.phone,true);

}
onPressSMS(){
    Communications.text(this.props.employee.phone, `Here is your message`);

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
    const {nameUser,phone} = this.props.employee;

    // console.log("in List Item  Name ************", nameUser, "employeeeee---", this.props.employee); 
    return(
        <TouchableWithoutFeedback onPress={this.onPressRow.bind(this)}>
        <View style={styles.viewOuter}>
            <View style={styles.viewInner}>
            
            <View style={styles.mainView}>
                <View>
                    <Text style={styles.titleStyle}>
                            {nameUser}
                        </Text>
                        <Text>
                            {phone}
                        </Text>
                </View>
                    
                    <View style={styles.rightView}>
                        <TouchableOpacity onPress={() => this.onPressCall() }>
                            <Text>
                            Call
                            </Text>
                        </TouchableOpacity>
                           
                        <TouchableOpacity onPress={() => this.onPressSMS() }>
                            <Text>
                            SMS
                            </Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity onPress={() => this.onPressShare() }>
                            <Text>
                            Share 
                            </Text>
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
    mainView:{
     flexDirection: 'row',
     alignItems:'center'
    },
    titleStyle:{
        fontSize: 18,
        // paddingLeft: 5,
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
        backgroundColor: 'white',
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

 