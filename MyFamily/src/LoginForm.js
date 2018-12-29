import React,{Component} from 'react';
import {View, Text, Image} from 'react-native';
import { Card, CardSection, Input, Button, Spinner} from './components/common';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from './actions';
import {LinearGradient, AdMobInterstitial,AdMobBanner, PublisherBanner,} from 'expo'; 
import EmployeeList from './components/EmployeeList';
import { AsyncStorage } from "react-native";
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import {kBANNER_ID, kINTERSTIAL_ID, KVIDEO_ID, kPUBLISH_BANNER_ID} from './components/Constants';



class LoginForm extends Component{

    componentDidMount(){
        let isUser = false;
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              console.log('user is logged');
              isUser = true;
              Actions.main();
            }else{
              isUser =  false;
            }
        });
        
    }

  bannerError() {
    console.log("An error");
    return;
  }

    onEmailChange(text){
      this.props.emailChanged(text);
    }
    onPasswordChange(text){
      this.props.passwordChanged(text);
    }
    onButtonPressed(){
        const {email, password} = this.props;
        this.props.loginUser({email, password});
        if (this.props.user) {
            this.props.navigation.navigate('EmployeeList');
        } 
    }
    renderError() {
        if(this.props.error){
            return(
            <View style={styles.errorView}>
                <Text style={styles.errorTextStyle}>
                    {this.props.error}
                </Text>
            </View>
            );
        }
    }
    renderButton(){
        if(this.props.loading){
            return(
                <Spinner />
            );
        }
        return(
            <Button onPress={this.onButtonPressed.bind(this)}>
                                    Login / Signup
            </Button>
        );
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
            <LinearGradient
                //    colors={['#ffdde1','#ffdde1', '#ffdde1']}
                   colors={['#ffffff','#ffffff', '#ffffff']}
                   style= {styles.gradientStyle}
                >
                <Image style={styles.logoIcon} source={require('../assets/family.png')} />
            <View>
                
                <CardSection>
                <Input 
                label="Email"
                placeholder="email@gmail.com"
                onChangeText={this.onEmailChange.bind(this)}    
                value={this.props.email}           
               />
                </CardSection>

                <CardSection>
                    <Input 
                    secureTextEntry
                    label="Password"
                    placeholder="password"
                    onChangeText={this.onPasswordChange.bind(this)}
                    value={this.props.password}
                    />
                </CardSection>

               
                    {this.renderError()}
               
           

            {this.renderButton()}
                
            </View>
            <PublisherBanner
            style={styles.bottomBanner}
                bannerSize="fullBanner"
                adUnitID={kPUBLISH_BANNER_ID} // Test ID, Replace with your-admob-unit-id
                testDeviceID="EMULATOR"
                onDidFailToReceiveAdWithError={this.bannerError}
                onAdMobDispatchAppEvent={this.adMobEvent} />
                
             </LinearGradient>
        )
    }
    
}

const mapStateToProps = state => {
    return {
        email: state.auth.email,
        password: state.auth.password,
        error: state.auth.error,
        loading: state.auth.loading,
        user: state.auth.user,
        };
};

const styles = {
    errorView:{
    //  backgroundColor:'red',
     alignSelf:'center',
     alignItems: 'center',
     marginTop:10,
     marginBottom:10
    },
    logoIcon:{
        marginTop: '5%',
        width: 212,
        height: 179,
        alignSelf: 'center',
        marginBottom: '5%',
    },
    errorTextStyle:{
        fontSize: 22,
        color:'red',
        // backgroundColor:'blue',
    },
    gradientStyle:{
        flex: 1,
       
    },
    interstitialBanner: {
        width: "100%",
        marginLeft: 0
      },
      bottomBanner: {
        position: "absolute",
         bottom: 0,
        // height:200,
      },
}

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(LoginForm);