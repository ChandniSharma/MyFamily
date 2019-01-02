import React, {Component} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';

const MessageInput = ({label,value, onChangeText, placeholder, secureTextEntry,keyboardType, charLimit, error,prefix, onFocus}) =>{

    console.log()
    return(
        <View style={styles.viewContainer}>
            <TextInput
                    placeholder='Message'
                    style={styles.textInput}
                    onChangeText={onChangeText}
                    value={value}
                    multiline={true}
                    maxLength={200}
                    />

        </View>
          
             
        
    );
};
export default MessageInput;

const styles = {
    viewContainer:{
        width:'97%',
        height: 70,
    },
    textInput:{
        borderColor: 'gray', 
        borderWidth: 1, 
        width:'100%',
        height: 70,
        borderRadius:30,
        // marginLeft: 2,
        marginBottom: 10,
        padding:10,
    },
    textLimit:{
        fontSize:12,
        position: 'absolute',
        right: '1%',
        bottom:0,
        color: 'gray',
    //    alignSelf: 'right',
    }
}