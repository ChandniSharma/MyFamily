import React,{Component} from 'react';
import {View, Text} from 'react-native';
import { Card, CardSection, Input, Button, Spinner} from './components/common';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from './actions';


class LoginForm extends Component{
    onEmailChange(text){
      this.props.emailChanged(text);
    }
    onPasswordChange(text){
      this.props.passwordChanged(text);
    }
    onButtonPressed(){
        const {email, password} = this.props;
        this.props.loginUser({email, password});
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

    render(){
        return(
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

            {this.renderError()}

                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        )
    }
}

const mapStateToProps = state => {
    return {
        email: state.auth.email,
        password: state.auth.password,
        error: state.auth.error,
        loading: state.auth.loading
        };
};

const styles = {
    errorTextStyle:{
        fontSize: 20,
        color:'red',
        alignSelf: 'center',
    }
}

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(LoginForm);