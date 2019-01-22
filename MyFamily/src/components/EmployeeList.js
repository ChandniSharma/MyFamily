import _ from 'lodash';
import React, {Component} from 'react';
import {View, Text, ListView, Image, TouchableOpacity,AsyncStorage} from 'react-native';
import { connect } from 'react-redux';
import { employeesFetch } from '../actions';
import ListItem from './ListItem';
import { Button } from './common';
import { Actions } from 'react-native-router-flux';
import {AdMobInterstitial,AdMobBanner, PublisherBanner} from 'expo';
import Communications from 'react-native-communications';
import * as constants from './Constants';
//import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
class EmployeeList extends Component{
constructor(props){
  var emergencyNumber = '';
}
    componentWillMount(){
        this.props.employeesFetch();

       this.createDataSource(this.props);
    }

    componentDidMount(){
                // ALWAYS USE TEST ID for Admob ads
                AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712');
                AdMobInterstitial.setTestDeviceID('EMULATOR');
        
                AdMobInterstitial.addEventListener('interstitialDidLoad',
                    () => this.showInterstitial()
                );
         
                AdMobInterstitial.addEventListener('interstitialDidFailToLoad',
                    () => console.log('interstitialDidFailToLoad')
                );
         
                AdMobInterstitial.addEventListener('interstitialDidOpen',
                    () => console.log('interstitialDidOpen')
                );
                AdMobInterstitial.addEventListener('interstitialDidClose',
                    () => console.log('interstitialDidClose')
                );
                AdMobInterstitial.addEventListener('interstitialWillLeaveApplication',
                    () => console.log('interstitialWillLeaveApplication')
                );
        
    }

    componentWillReceiveProps(nextProps){
        // Next props are the next set of props that the component will be rendered with 
        // this.props are the old set of props
        // this.props.employeesFetch();
        this.createDataSource(nextProps);
    }

    showInterstitial() {
        // AdMobInterstitial.requestAd(()=>AdMobInterstitial.showAd());
        console.log( ' finally time to show ');
        AdMobInterstitial.requestAdAsync(()=>AdMobInterstitial.showAdAsync());

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
            <View style = {styles.emptyMessageView}>
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
    async _getStorageValue(){
      this.emergencyNumber = await AsyncStorage.getItem(constants.kemergencyNumber);
    }
    emergencyCall(){
        this.showInterstitial();
        this._getStorageValue();
        console.log(' ****  emergencyBtnClick ', this.emergencyNumber);
        Communications.phonecall('+91'+this.emergencyNumber,true);
    }

    render(){
        
        return(
            <View style={styles.mainView}>
            <View style= {styles.emergencyBtn}>
            <TouchableOpacity onPress={()=>this.emergencyCall()}>
                    <Image style={styles.emergencyCallImg} source={require('../../assets/CallEmergency.png')}/>
                </TouchableOpacity>
            </View>
                
                 <ListView style={styles.listStyle}
                    enableEmptySections
                    dataSource={this.dataSource}
                    renderRow={this.renderRow}
                    marginBottom={50} 
            />
                <PublisherBanner
            style={styles.bottomBanner}
                bannerSize="fullBanner"
                adUnitID= {constants.kPUBLISH_BANNER_ID} // Test ID, Replace with your-admob-unit-id
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
    emptyMessageView:{
        // backgroundColor:'yellow', 
        marginTop:'1%',
        height:150,
        // width: '70%',
    },
    titleStyle:{
        fontSize: 18,
        paddingLeft: 15,
    },
    emergencyBtn:{
        marginTop:'2%',
        right: '3%',
        marginBottom: '5%',
       textAlign:'right',
       position: 'absolute'
    },
    emergencyCallImg:{
        width:32,
        height:32,
        alignSelf:'center'
    },
    listStyle:{
        marginTop:'10%',
      paddingTop :'5%',
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