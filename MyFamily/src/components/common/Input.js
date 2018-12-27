import React, {Component} from 'react';
import { TextField } from 'react-native-material-textfield';

const Input = ({label,value, onChangeText, placeholder, secureTextEntry,keyboardType, charLimit, error,prefix, onFocus}) =>{

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
                onFocus={onFocus}
                characterRestriction={charLimit}
                containerStyle={viewContainerStyle}
                inputContainerStyle={textInputStyle}
                secureTextEntry={secureTextEntry}
                onChangeText={onChangeText}
                disabledLineWidth={0}
                affixTextStyle={affixTextStyle}
                lineWidth={0}
                 labelHeight={15}
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
export  {Input};

const styles = {

    viewContainerStyle:{
     flex: 1,
     flexDirection: 'row',
     borderColor: 'gray',
     borderWidth: 1,
     borderRadius: 23,
     height: 50,
     alignItems: 'center',
     justifyContent:'center',
     marginLeft: 10,
     marginRight: 10,
    //  backgroundColor:'green'
    },
    labelStyle:{
       fontSize: 28,
        backgroundColor:'white',
       top:-5,
       color:'blue'
    },
   
    textInputStyle:{
        flex:0.98,
        marginLeft: 20,
        marginRight:15,
        justifyContent: 'center',
        // backgroundColor:'pink'
        // fontSize: 18, 
        // lineHeight: 23
    }

}