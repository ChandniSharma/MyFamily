import React, {Component} from 'react';
import { Text, View} from 'react-native';

const Header = (props) => {

    return (

        <View style = {styles.viewStyle}>
            <Text style={styles.textStyle}>Header hu me </Text>
        </View>
    )

}

export default Header;
//export { Header } ;

const styles={
    viewStyle: {
        
        flex: 0.1,
        backgroundColor:'#F8F8F8',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'black',
        shadowOffset: {width: 0, height:2},
        shadowOpacity: 0.6,

    },
 textStyle:{
  
   alignItems: 'center',
   justifyContent: 'center'
 }
}
