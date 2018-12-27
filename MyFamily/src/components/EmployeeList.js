import _ from 'lodash';
import React, {Component} from 'react';
import {View, Text, ListView, Image} from 'react-native';
import { connect } from 'react-redux';
import { employeesFetch } from '../actions';
import ListItem from './ListItem';
import { Button } from './common';
import { Actions } from 'react-native-router-flux';
import {AdMobInterstitial,AdMobBanner, PublisherBanner} from 'expo';
import {kBANNER_ID, kINTERSTIAL_ID, KVIDEO_ID, kPUBLISH_BANNER_ID} from './Constants'

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
            <View>
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
    bannerError() {
        console.log('An error');
        return;
    }
    adMobEvent(){
        console.log( 'in admob event method ');
    }

    render(){
        
        return(
            <View style={styles.mainView}>
                 <ListView style={styles.listStyle}
                    enableEmptySections
                    dataSource={this.dataSource}
                    renderRow={this.renderRow}
                    marginBottom={50} 
            />
                <PublisherBanner
            style={styles.bottomBanner}
                bannerSize="fullBanner"
                adUnitID= {kPUBLISH_BANNER_ID} // Test ID, Replace with your-admob-unit-id
                testDeviceID="EMULATOR"
                onDidFailToReceiveAdWithError={this.bannerError}
                onAdMobDispatchAppEvent={this.adMobEvent} />
            </View>
           
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
    mainView:{
       flex: 1,
    },
    titleStyle:{
        fontSize: 18,
        paddingLeft: 15,
    },
    listStyle:{
      paddingTop :'20%',
      height: '82%',
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
    },
    bottomBanner: {
        position: "absolute",
        bottom: 0
      },

}

export default connect(mapStateToProps, {employeesFetch})(EmployeeList);