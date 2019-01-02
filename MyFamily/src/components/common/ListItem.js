import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as constants  from '../Constants';



const ListItem = (props) => {
    let arrayTemp = props.placeName.split('Msg:')
    console.log('complete string ', props.placeName,'array ',arrayTemp)
   let message = '';
   let imgClock;
    if(arrayTemp[1].length>0){
    let arrayWithReminder = arrayTemp[1].split('Reminder')

    console.log('array reminder ', arrayWithReminder);

    if(arrayWithReminder.length>0){

        message = arrayWithReminder[0];

        if(arrayWithReminder[1] === constants.kYes){
            imgClock =  <Image source={require('../../../assets/activeAlarm.png')} style={styles.alarmStyle} />
        }else{
            imgClock = <Image source={require('../../../assets/InactiveAlarm.png')} style={styles.alarmStyle} />
        }
      }
    }
    return (
         <View style = { styles.listItem }>
         <View style={styles.viewText}>
            <Text style={styles.textStyle}>{ arrayTemp[0] }</Text>
                <Text style={styles.textStyle}>
                {message}
                </Text>
         </View>
         <View>
            {imgClock}
            <TouchableOpacity onPress={ props.onItemPressed }>
               <Image source={require('../../../assets/DeleteIcon.png')} style={styles.imageStyle } />
            </TouchableOpacity>
         </View>
            
         </View>
        
    );
}

const styles = StyleSheet.create({
    listItem: {
        width: '100%',
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#eee',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    imageStyle:{
        width:32,
        height:32
    },
    textStyle:{
       fontSize: 14,
       justifyContent: 'center',
       alignItems:'flex-start',
    },
    viewText:{
      width:'70%',  
    },
    alarmStyle:{
        width:30,
        height:30

    },
});

export default ListItem;