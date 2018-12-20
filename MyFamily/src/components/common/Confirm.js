import React, { Component } from 'react';
import {View, Text, Modal } from 'react-native';
import { CardSection } from './CardSection';
import { Button } from './Button';


const Confirm = ({ children, visible, onAccept, onDecline }) => {
 const {textStyle, containerStyle, cardSectionStyle} = styles;

    return(
     <Modal 
     visible={visible}
     transparent
     animationType="slide"
     onRequestClose={() => {}}

     >
          <View style= {containerStyle}>
              <CardSection style= {cardSectionStyle}>
                  <Text style= {textStyle}>
                     {children}
                  </Text>
              </CardSection>
            
            <CardSection style= {cardSectionStyle}>
                <Button onPress={onAccept}>
                    Yes
                </Button>
                <Button onPress={onDecline}>
                    No
                </Button>
            </CardSection>
            </View>
     </Modal>
       
 );
}

const styles = {
    cardSectionStyle:{
        justifyContent: 'center'
    },
    textStyle:{
        flex: 1,
        fontSize: 18,
        textAlign: 'center', 
        lineHeight: 40,
        backgroundColor: 'white'
    },
    containerStyle:{
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        position: 'relative',
        justifyContent: 'center',
        flex: 1
    }
}
export {Confirm};