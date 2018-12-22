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
        
        width:'70%',
        backgroundColor:'#ffffff',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 3,
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 10,
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