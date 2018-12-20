import React, {Component} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';

const Button = ({onPress, children}) =>{
const {buttonStyle, textStyle} = styles;

return(
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
            <Text style={textStyle}> 
            {children}
           </Text>
            </TouchableOpacity>
);
}

const styles={
    buttonStyle:{
        flex: 0.7,
        alignSelf: 'stretch',
        backgroundColor:'#fff',
        borderColor: 'blue',
        borderWidth: 1,
        borderRadius: 3,
     marginLeft: 10,
     marginRight: 10,
     alignSelf: 'stretch',
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