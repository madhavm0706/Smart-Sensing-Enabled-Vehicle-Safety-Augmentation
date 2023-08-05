import React from 'react';

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from './HomeScreen';
import Login from './Login';
import SplashScreen from './SplashScreen';
import Registered from './Registered';
import Maps from './Maps';
import Accident from './Accident';
import LiveStatus from './LiveStatus';
const {Navigator,Screen} = createNativeStackNavigator();


const AppNavigator = ()=>(
    <NavigationContainer>
        <Navigator screenOptions={{ headerShown: false }}   >

        <Screen name="SplashScreen" component={SplashScreen}></Screen>
        <Screen name="Login" component={Login}></Screen>
        <Screen name="Registered" component={Registered}></Screen>
        <Screen name="Maps" component={Maps}></Screen>
        <Screen name="Accident" component={Accident}></Screen>
        <Screen name="LiveStatus" component={LiveStatus}></Screen>





        <Screen name="HomeScreen" component={HomeScreen}></Screen>
        {/* <Screen name="Graphreport" component={Graphreport}></Screen> */}
        

        </Navigator>
    </NavigationContainer>
)

export default AppNavigator;