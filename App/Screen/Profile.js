import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
} from "react-native";

import Constants from "expo-constants";

import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile(props) {
    const [loader, setloader] = useState(true);
    const [data, setdata] = useState([])

    useEffect(() => {
        const url = "http://172.23.130.198:4000/api/me"

        fetch(url, {
            method: "get",


        }).then((response) => response.json())
            .then((result) => {
                console.log(result);
                setdata(result.user)
                setloader(false);


            })
            .catch((err) => {
                console.log(err);
            })

    }, [])
    console.log(data);
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>User Profile</Text>
            </View>
            <View>


                {loader ?
                    <>
                        <Text>Loading...</Text>
                    </>
                    :
                    <>
                        <TouchableOpacity
                            style={styles.listItem}
                        >
                            <View style={styles.coverImage}>
                                <FontAwesome5 name="user" size={40} color="green" />


                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={styles.songName}>{data.name}</Text>

                                <View style={styles.songInfo}>
                                    <Text style={styles.singerName}>{data.designation}</Text>
                                    <Text style={styles.songDuration}>Verified</Text>
                                </View>

                            </View>


                        </TouchableOpacity>
                        <View style={styles.datacontainer}>

                            <View style={styles.datatext}>
                                <Text style={styles.textstyle1}> Phone no -  <Text style={styles.textstyle2}>{data.personalinfo.age}</Text>  </Text>
                                <Text style={styles.textstyle1}> Sex -  <Text style={styles.textstyle2}>{data.personalinfo.sex}</Text>  </Text>

                            </View>
                            <View style={styles.datatext}>
                                <Text style={styles.textstyle1}> Blood Group -  <Text style={styles.textstyle2}>{data.personalinfo.bloodgrp}</Text>  </Text>
                                <Text style={styles.textstyle1}> Age -  <Text style={styles.textstyle2}>{data.personalinfo.age}</Text>  </Text>

                            </View>
                            <View style={styles.datatext}>
                                <Text style={styles.textstyle1}> Address -  <Text style={styles.textstyle2}>{data.personalinfo.address}</Text>  </Text>

                            </View>
                            <View style={styles.datatext}>
                                <Text style={styles.textstyle1}> City -  <Text style={styles.textstyle2}>{data.personalinfo.city}</Text>  </Text>
                                <Text style={styles.textstyle1}> Pincode -  <Text style={styles.textstyle2}>{data.personalinfo.pincode}</Text>  </Text>

                            </View>


                            <View style={styles.buttongrp}>
                                <TouchableOpacity
                                    style={[styles.button, { backgroundColor: "#54a111" }]}
                                    underlayColor="#3c730c"
                                >
                                    <Text style={styles.buttonText}>Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.button, { backgroundColor: "red" }]}
                                    underlayColor="#3c730c"
                                >
                                    <Text style={styles.buttonText}>Delete</Text>
                                </TouchableOpacity>

                            </View>




                        </View>

                    </>

                }

                <View style={styles.doctoritem}>

                    <TouchableOpacity
                        style={styles.listItem}
                        onPress={() => props.navigation.navigate("Registered")}

                    >
                        <View style={styles.coverImage}>
                            <FontAwesome5 name="car" size={30} color="green" />


                        </View>

                        <View style={{ flex: 1 }}>
                            <Text style={styles.songName}>Registered Cars</Text>

                            <View style={styles.songInfo}>
                                <Text style={styles.singerName}>Click to check your car details</Text>
                            </View>

                        </View>


                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.listItem}
                        onPress={() => props.navigation.navigate("Members")}


                    >
                        <View style={styles.coverImage}>
                            <FontAwesome5 name="users" size={30} color="green" />


                        </View>

                        <View style={{ flex: 1 }}>
                            <Text style={styles.songName}>Added Members</Text>

                            <View style={styles.songInfo}>
                                <Text style={styles.singerName}>check all your added members</Text>
                            </View>

                        </View>


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
    doctoritem: {
        marginTop: 60
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
    coverImage: {
        width: 60,
        height: 60,
        borderRadius: 6,
        marginRight: 15,
        paddingTop: 7
    },
    songName: {
        fontWeight: "bold",
        fontSize: 16,
        lineHeight: 24,
        color: "white",
    },
    songInfo: {
        flexDirection: "row",
        justifyContent: "space-between",
        flex: 1,
        marginTop: 10,
    },
    singerName: {
        fontSize: 14,
        color: "green",
    },
    songDuration: {
        fontSize: 18,
        color: "white",
        marginRight: 20

    },
    listItem: {
        flexDirection: "row",
        marginBottom: 2,
        backgroundColor: "#323344",
        height: 75,
        paddingTop: 10,
        paddingLeft: 10,


    },
    datacontainer: {
        marginBottom: 20,
        marginTop: 10,
        backgroundColor: "#323344",
        height: 200,
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
        marginTop: 40

    },
    button: {
        width: 90,
        paddingVertical: 8,
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
    },
})