import React, { Component} from 'react';
import {Text, TouchableWithoutFeedback, View} from 'react-native';
import {CardSection} from './common/CardSection';
import { Actions } from 'react-native-router-flux';
import { Button } from './common';

class ListItem extends Component{
    onPressRow(){
        Actions.EmployeeEdit({employee: this.props.employee});
    }

render(){
    const {nameUser,phone} = this.props.employee;

    // console.log("in List Item  Name ************", nameUser, "employeeeee---", this.props.employee); 
    return(
        <TouchableWithoutFeedback onPress={this.onPressRow.bind(this)}>
            <View>
                <CardSection>
                    <Text style={styles.titleStyle}>
                        {nameUser}
                    </Text>
                    <Text>
                        {phone}
                    </Text>
                    <View style={styles.rightView}>
                        <Button>
                            Call
                        </Button>
                        <Button>
                            SMS
                        </Button>
                        <Button>
                            Share
                        </Button>
                    </View>
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
    },
    rightView:{
     marginRight: 10,
     flexDirection: 'row',
    }
}

export default ListItem;

 