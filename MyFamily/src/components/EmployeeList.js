import _ from 'lodash';
import React, {Component} from 'react';
import {View, Text, ListView, Image} from 'react-native';
import { connect } from 'react-redux';
import { employeesFetch } from '../actions';
import ListItem from './ListItem';
import { Button } from './common';
import { Actions } from 'react-native-router-flux';



class EmployeeList extends Component{

    componentWillMount(){
        this.props.employeesFetch();

       this.createDataSource(this.props);
    }
    componentWillReceiveProps(nextProps){
        // Next props are the next set of props that the component will be rendered with 
        // this.props are the old set of props
        // this.props.employeesFetch();
        this.createDataSource(nextProps);
    }

    createDataSource(employees){
        const ds = new ListView.DataSource({
            rowHasChanged:(r1, r2) => r1!= r2
        });
      this.dataSource = ds.cloneWithRows(employees);
    }
    renderRow(employee){
            if(Array.isArray(employee)){
                if (employee.length > 0) {
                    return employee.map(album =>
                    <ListItem key={album.uid} employee={album} /> )

        }else{
            return( 
            <View style={styles.emptyView}>
                <Image style={styles.sadSmiley} source={require('../../assets/sad.png')} />

                
                <Text style={styles.emptyText}>
                    You don't have any member to display 
                </Text>
                <Button style={styles.btnAddMember} onPress={()=>{Actions.EmployeeCreate()}}>
                    Add Member
                </Button>
            </View> );
        }
    }else{
        return( <View /> );
    }
}

    render(){
        
        return(
            <ListView style={styles.listStyle}
            enableEmptySections
            dataSource={this.dataSource}
            renderRow={this.renderRow}
            />


        );
        

        
    }
}
const mapStateToProps = state => {
    const employees = _.map(state.employees, (val,uid) => {
       return{ ...val, uid };
    });
    return { employees };
};

const styles={
    titleStyle:{
        fontSize: 18,
        paddingLeft: 15,
    },
    listStyle:{
      paddingTop :100,
      
     
    },
    emptyView:{
        
        
        
        // backgroundColor: 'red',
       
    },
    emptyText:{
        padding:10,
      fontSize: 20,
      color:'gray',
      alignSelf: 'center',
    },
    sadSmiley:{
        padding:10,
        width:32,
        height:32,
        alignSelf: 'center',
    },
    btnAddMember:{
       padding:10,
    //    widht: 200,
    //    height: 200,
       marginTop: 20,
    }
}

export default connect(mapStateToProps, {employeesFetch})(EmployeeList);