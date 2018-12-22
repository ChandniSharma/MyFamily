import React,{Component} from 'react';
import {View, Text} from 'react-native';
import { Card, CardSection, Input, Button, Spinner} from './components/common';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from './actions';
import {LinearGradient, AdMobInterstitial,AdMobBanner, PublisherBanner,} from 'expo'; 
import EmployeeList from './components/EmployeeList';
import { AsyncStorage } from "react-native";
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';

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
            <View style={{backgroundColor:'white'}}>
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
                                    Login
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
                   colors={['#ffdde1','#ffdde1', '#ffdde1']}
                   style= {styles.gradientStyle}
                >
            <Card>
                
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

                <CardSection>
                    {this.renderError()}
                </CardSection>
           

            {this.renderButton()}
                
            </Card>
            <PublisherBanner
            style={styles.bottomBanner}
                bannerSize="fullBanner"
                adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
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
    errorTextStyle:{
        fontSize: 20,
        color:'red',
        alignSelf: 'center',
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
        bottom: 0
      },
}

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(LoginForm);