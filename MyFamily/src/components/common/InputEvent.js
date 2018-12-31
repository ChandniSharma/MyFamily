import React, {Component} from 'react';
import { TextInput, View, Text} from 'react-native';
import { TextField } from 'react-native-material-textfield';

const InputEvent = ({label,value, onChangeText, placeholder, secureTextEntry,keyboardType, charLimit, error,prefix}) =>{

    const {viewContainerStyle, labelStyle, textInputStyle,affixTextStyle } = styles;
    return(
          <TextField
                 label={label}
                labelTextStyle={labelStyle}
                value={value}
                prefix={prefix}
                keyboardType={keyboardType}
                textColor='#000000'
                baseColor = '#656565'
                fontSize={18}
              characterRestriction={charLimit}
                containerStyle={viewContainerStyle}
                inputContainerStyle={textInputStyle}
                secureTextEntry={secureTextEntry}
                onChangeText={onChangeText}
                disabledLineWidth={0}
                affixTextStyle={affixTextStyle}
                lineWidth={0}
                 labelHeight={5}
            /> 
        // <View style={viewContainerStyle}> 
        //     <Text style={labelStyle}>{label}</Text>
        //     <TextInput 
        //     secureTextEntry={secureTextEntry}
        //     autoCorrect={false}
        //     placeholder={placeholder}
        //     style={textInputStyle}
        //     value={value}
        //     onChangeText={onChangeText}
        //     />
        // </View>
    );
};
export default InputEvent;

const styles = {

    viewContainerStyle:{
     width:'45%',
     flexDirection: 'row',
     borderColor: 'gray',
     borderWidth: 1,
     borderRadius: 15,
     height: 40,
     alignItems: 'flex-start',
     justifyContent:'center',
     marginLeft: 10,
     marginRight: 3,
    // /  backgroundColor:'green'
    },
    labelStyle:{
       fontSize: 28,
        // backgroundColor:'white',
       top:-2,
       color:'blue',
    //    backgroundColor:'yellow'
    },
   
    textInputStyle:{
        flex:0.98,
        marginLeft: 20,
        marginRight:15,
        justifyContent: 'center',
        //  backgroundColor:'pink'
        // fontSize: 18, 
        // lineHeight: 23
    }

}