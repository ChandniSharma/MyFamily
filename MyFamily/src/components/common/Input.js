import React, {Component} from 'react';
import { TextInput, View, Text} from 'react-native';


const Input = ({label,value, onChangeText, placeholder, secureTextEntry}) =>{

    const {viewContainerStyle, labelStyle, textInputStyle } = styles;
    return(
        <View style={viewContainerStyle}> 

            <Text style={labelStyle}>{label}</Text>

            <TextInput 
            secureTextEntry={secureTextEntry}
            autoCorrect={false}
            
            placeholder={placeholder}
            style={textInputStyle}
            value={value}
            onChangeText={onChangeText}
            />
        </View>
    );
}
// export default Input;
export { Input } ;
const styles = {

    viewContainerStyle:{
     flex: 1,
     flexDirection: 'row',
     height: 40,
     alignItems: 'center',
    },
    labelStyle:{
       paddingLeft: 20,
       color: 'black',
       fontSize: 18,
       flex: 1
    },

    textInputStyle:{
        flex: 2,
        
        height: 40,
        width: 100,
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18, 
        lineHeight: 23
    }

}