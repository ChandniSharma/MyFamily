import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const ListItem = (props) => {
    let arrayTemp = props.placeName.split('Msg:')
    console.log('complete string ', props.placeName,'array ',arrayTemp)
   let message = '';
    if(arrayTemp[1].length>0){
        message = arrayTemp[1];
    }
    return (
         <View style = { styles.listItem }>
         <View style={styles.viewText}>
            <Text style={styles.textStyle}>{ arrayTemp[0] }</Text>
                <Text style={styles.textStyle}>
                {message}
                </Text>
         </View>
            
            <TouchableOpacity onPress={ props.onItemPressed }>
               <Image source={require('../../../assets/DeleteIcon.png')} style={styles.imageStyle } />
            </TouchableOpacity>
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
    }
});

export default ListItem;