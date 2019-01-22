import React, {Component} from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import {View, Text} from 'react-native';
import reducers from './reducers';
import firebase from 'firebase';
import LoginForm from './LoginForm';
import ReduxThunk from 'redux-thunk';
import Router from './components/Router';



export default class App extends Component{
    componentWillMount(){
        // Initialize Firebase
            const config = {
                apiKey: "AIzaSyCDgN9aTO8CUuAy_PRnAi1lbyf6FuO1sdM",
                authDomain: "myfamily-740cf.firebaseapp.com",
                databaseURL: "https://myfamily-740cf.firebaseio.com",
                projectId: "myfamily-740cf",
                storageBucket: "myfamily-740cf.appspot.com",
                messagingSenderId: "100752052821"
// Example app database 
                // apiKey: "AIzaSyAbkO-qTXWvGWnfzqoFpqppFLUUdAieWlE",
                // authDomain: "managerredux-ea9d1.firebaseapp.com",
                // databaseURL: "https://managerredux-ea9d1.firebaseio.com",
                // projectId: "managerredux-ea9d1",
                // storageBucket: "managerredux-ea9d1.appspot.com",
                // messagingSenderId: "23471623840"
  };
  firebase.initializeApp(config);
  }
    
    render(){
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
        return(
            <Provider store={store}>
                <Router />
            </Provider>
        );
    }
}













// import React from 'react';
// import {StyleSheet, Text, View, Button} from 'react-native';
// import {
//     AdMobBanner,
//     AdMobInterstitial,
//     AdMobRewarded,
//     PublisherBanner
// } from 'expo';
 
// export default class App extends React.Component {
 
//     componentDidMount() {
        
        // // ALWAYS USE TEST ID for Admob ads
        // AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712');
        // AdMobInterstitial.setTestDeviceID('EMULATOR');

        // AdMobInterstitial.addEventListener('interstitialDidLoad',
        //     () => this.showInterstitial()
        // );
 
        // AdMobInterstitial.addEventListener('interstitialDidFailToLoad',
        //     () => console.log('interstitialDidFailToLoad')
        // );
 
        // AdMobInterstitial.addEventListener('interstitialDidOpen',
        //     () => console.log('interstitialDidOpen')
        // );
        // AdMobInterstitial.addEventListener('interstitialDidClose',
        //     () => console.log('interstitialDidClose')
        // );
        // AdMobInterstitial.addEventListener('interstitialWillLeaveApplication',
        //     () => console.log('interstitialWillLeaveApplication')
        // );

//         // AdMobRewarded.setTestDeviceID("EMULATOR");

//         // // ALWAYS USE TEST ID for Admob ads
//         // AdMobRewarded.setAdUnitID("ca-app-pub3940256099942544/1712485313");
//         // AdMobRewarded.addEventListener("rewardedVideoDidRewardUser", () =>
//         // console.log("interstitialDidLoad")
//         // );
//         // AdMobRewarded.addEventListener("rewardedVideoDidLoad", () =>
//         // console.log("interstitialDidLoad")
//         // );
//         // AdMobRewarded.addEventListener("rewardedVideoDidFailToLoad", () =>
//         // console.log("interstitialDidLoad")
//         // );
//         // AdMobRewarded.addEventListener("rewardedVideoDidOpen", () =>
//         // console.log("interstitialDidLoad")
//         // );
//         // AdMobRewarded.addEventListener("rewardedVideoDidClose", () =>
//         // console.log("interstitialDidLoad")
//         // );
//         // AdMobRewarded.addEventListener("rewardedVideoWillLeaveApplication", () =>
//         // console.log("interstitialDidLoad")
//         // );
//     }
 
//     componentWillUnmount() {
//         AdMobInterstitial.removeAllListeners();
//         AdMobRewarded.removeAllListeners();
//     }
 
    // bannerError() {
    //     console.log('An error');
    //     return;
    // }
//     showRewarded() {
//         // first - load ads and only then - show
//         AdMobRewarded.requestAdAsync (() => AdMobRewarded.showAdAsync());
//       }
    // showInterstitial() {
    //     // AdMobInterstitial.requestAd(()=>AdMobInterstitial.showAd());
    //     console.log( ' finally time to show ');
    //     AdMobInterstitial.requestAdAsync(()=>AdMobInterstitial.showAdAsync());

    // }
 
//     render() {
//         return (
//             <View style={styles.container}>
//                 <Text>Open up App.js to start working on your app!</Text>
//                 <Button title="Interstitial 1"
//                         onPress={this.showInterstitial}
//                         />

//                 <Button
//                  style={{marginTop: 20}}
//                         title="Rewarded"
//                         onPress={this.showRewarded}
//                         containerViewStyle={styles.rewardedBanner}
//                         /> */}
//                                      <PublisherBanner
//                     bannerSize="largeBanner"
//                     adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
//                     testDeviceID="EMULATOR"
//                     onDidFailToReceiveAdWithError={this.bannerError}
//                     onAdMobDispatchAppEvent={this.adMobEvent} />
//             </View>
//         );
//     }
// }
 
// const styles = StyleSheet.create({
//     interstitialBanner: {
//         flex:1
        
//     },
//     bottomBanner: {
//         position: 'absolute',
//         bottom: 0,
//     },
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
// });

