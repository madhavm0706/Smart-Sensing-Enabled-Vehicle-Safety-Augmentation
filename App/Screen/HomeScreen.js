import { StyleSheet, Text, View } from 'react-native';
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from "@expo/vector-icons";


import Home from './Home';
import Notification from './Notifications';
import Live from './Live';
import Profile from './Profile';

const Tab = createBottomTabNavigator();

const HomeScreen = ({navigation}) => {
  return (
    <>
       
      {/* <NavigationContainer independent='true'> */}

        <Tab.Navigator 
        // initialRouteName="Recent" 
        // screenOptions={{ headerShown: false }}
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'Home') {
                iconName = focused
                  ? 'home'
                  : 'home';
              } else if (route.name === 'Members') {
                iconName = focused ? 'users' : 'users';
              } else if (route.name === 'Notifications') {
                iconName = focused ? 'bell' : 'bell';
              } else if (route.name === 'Profile') {
                iconName = focused ? 'user' : 'user';
              }
  
              // You can return any component that you like here!
              return         <FontAwesome5 name={iconName} size={size} color={color} />

            },
            tabBarActiveTintColor: 'green',
            tabBarInactiveTintColor: 'black',
            headerShown: false
          })}
        >

          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Members" component={Live} />

          <Tab.Screen name="Notifications" component={Notification} />
          <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
      {/* </NavigationContainer> */}
      </>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  logout:{
    backgroundColor:"#1d2236",
    marginTop:40
  },
  logouttext:{
    color:"cyan" 
  }
})