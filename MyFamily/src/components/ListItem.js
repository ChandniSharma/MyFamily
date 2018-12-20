import React, { Component} from 'react';
import {Text, TouchableWithoutFeedback, View} from 'react-native';
import {CardSection} from './common/CardSection';
import { Actions } from 'react-native-router-flux';

class ListItem extends Component{
    onPressRow(){
        Actions.EmployeeEdit({employee: this.props.employee});
    }

render(){
    const {nameUser} = this.props.employee;

    // console.log("in List Item  Name ************", nameUser, "employeeeee---", this.props.employee); 
    return(
        <TouchableWithoutFeedback onPress={this.onPressRow.bind(this)}>
            <View>
                <CardSection>
                    <Text style={styles.titleStyle}>
                        {nameUser}
                    </Text>
                </CardSection>
            </View>
        </TouchableWithoutFeedback>
        
    );
}
}

const styles={
    titleStyle:{
        fontSize: 18,
        paddingLeft: 15,
    }
}

export default ListItem;

 