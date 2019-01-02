import React, {Component} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';

const Button = ({onPress, children}) =>{
const {buttonStyle, textStyle} = styles;

return(
    <TouchableOpacity style={styles.buttonStyle} onPress={onPress}>
            <Text style={textStyle}> 
            {children}
           </Text>
            </TouchableOpacity>
   );
}

const styles={
    buttonCenterStyle:{
        flex: 0.5,
        backgroundColor:'#ffffff',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 13,
        alignSelf: 'center',
        height:40
    },
    buttonStyle:{
        
        width:'40%',
        backgroundColor:'#ffffff',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 13,
        alignSelf: 'center',
        // marginTop: 10,
        // marginBottom: 10,
        margin: 10,
    //  marginLeft: 10,
    //  marginRight: 10,
     
    },
    textStyle:{
      
      fontSize: 18,
      borderColor: 'blue',
      alignSelf: 'center',
      backgroundColor: 'white',
      paddingTop: 10,
      paddingBottom: 10,
    }
}
export {Button} ;