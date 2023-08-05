import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList
  } from "react-native";

  import Constants from "expo-constants";

  import { FontAwesome5 } from "@expo/vector-icons";



  export default function LiveStatus({navigation,route}){

    const {otherParam } = route.params;
    console.log(otherParam)
    const lati = otherParam[5];
    const longi = otherParam[6];

    const location = [lati,longi]
    



    
    

    
   


    return(
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Live Status of your Car</Text>
        </View>

        <View style={styles.datacontainer}>

                            <View style={styles.datatext}>
                                <Text style={styles.textstyle2}> !!!! Status of Your Car !!!!  </Text>

                            </View>
                            <View style={styles.datatext}>
                                <Text style={styles.textstyle2}> Car No : <Text style={styles.textstyle1}>{otherParam[0]}</Text>   </Text>

                            </View>
                            <View style={styles.datatext}>
                                <Text style={styles.textstyle1}> User details  <Text style={styles.textstyle2}></Text>  </Text>

                            </View>
                            <View style={styles.datatext}>
                                <Text style={styles.textstyle1}> Name  <Text style={styles.textstyle2}></Text>{otherParam[1]}  </Text>
                                <Text style={styles.textstyle1}> Blood Group  <Text style={styles.textstyle2}></Text>{otherParam[2]}  </Text>

                            </View>
                            <View style={styles.datatext}>
                                <Text style={styles.textstyle1}> Age <Text style={styles.textstyle2}>{otherParam[3]}</Text>  </Text>
                                <Text style={styles.textstyle1}> Address <Text style={styles.textstyle2}>{otherParam[4]}</Text>  </Text>

                            </View>
                       


                            <View style={styles.buttongrp}>
                                <TouchableOpacity
                                    style={[styles.button, { backgroundColor: "#54a111" }]}
                                    underlayColor="#3c730c"
                                    onPress={()=>{navigation.navigate("Maps",{
                                        lati:otherParam[5],
                                        longi:otherParam[6]
                                    })}}
                                >
                                    <Text style={styles.buttonText}>Track Location</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.button, { backgroundColor: "red" }]}
                                    underlayColor="#3c730c"

                                >
                                    <Text style={styles.buttonText}>Contact Person</Text>
                                </TouchableOpacity>

                            </View>




                        </View>



      
    
    </SafeAreaView>

)

  }


  const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: "black"
    },
   
    header: {
        padding: 15,
        marginBottom: 10,
    },
    headerTitle: {
        fontWeight: "bold",
        fontSize: 24,
        color: "white",
    },
    datacontainer: {
        marginBottom: 20,
        marginTop: 10,
        backgroundColor: "#323344",
        height: 300,
        paddingTop: 10,
        paddingLeft: 10

    },
    datatext: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: 20

    },
    textstyle1: {
        color: "green",
        fontSize: 18
    },
    textstyle2: {
        color: "white",
        fontSize: 18

    },
    buttongrp: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: 150

    },
    button: {
        width: 150,
        paddingVertical: 8,
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
    },


  }) 