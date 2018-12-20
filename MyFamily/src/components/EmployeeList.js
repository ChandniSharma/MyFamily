import _ from 'lodash';
import React, {Component} from 'react';
import {View, Text, ListView} from 'react-native';
import { connect } from 'react-redux';
import { employeesFetch } from '../actions';
import ListItem from './ListItem';



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
            return( <View /> );
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

    }
}

export default connect(mapStateToProps, {employeesFetch})(EmployeeList);