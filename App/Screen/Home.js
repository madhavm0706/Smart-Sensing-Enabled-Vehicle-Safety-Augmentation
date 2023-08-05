import React,{ useEffect, useState } from "react";
import { StyleSheet,SafeAreaView,
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    Modal,
    Alert,
    Pressable } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import ConnectDisconnect from "../Components/ConnectDisconnect";
import { styles } from "../Components/notifiactionstyleshome";
import Paho from 'paho-mqtt';
import Constants from "expo-constants";



import { FontAwesome5 } from "@expo/vector-icons";

client = new Paho.Client(
    "broker.hivemq.com",
    Number(8000),
    `mqtt-async-test-7417410605`
)

export default function Home(props){
    const [loader, setloader] = useState(true);
    const [driver,setdriver] = useState([]);
    const [data, setdata] = useState([]);
    const [accident, setaccident] = useState([]);

    const [reload,setreload] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible1, setModalVisible1] = useState(false);


    const topic1 = '/Sensing/request_track';
    const topic2 = '/Sensing/start';
    const topic3 = '/Sensing/sensor1-data';
    const topic4 = '/Sensing/disconnect';

    const topic5 = '/Sensing/accelerometer';
    const topic6 = '/Sensing/gps-gsm';
    const topic7 = '/Sensing/passengerdetails';
    const topic8 = '/Sensing/hospitaldetails';
    const topic9="/Sensing/livestatus";
    const topic10="/Sensing/carstatus";
    const topic11 = "/Sensing/driverrecognized"
    const topic12 = "/Sensing/notification"


    async function savevalue1(message) {

        
        const url = "http://172.23.130.198:4000/api/add-members"
        fetch(url, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",

            },
            body: JSON.stringify({

                "message":message,
                "type":"alert",

            })
        }).then((response) => response.json())
            .then((result) => {
                if (result) {
                    console.log(result.message);
                }

            }).catch((err) => {
                console.log(err);
            })




    }

    async function savevalue2(message) {

        console.log("data value")
        const url = "http://172.23.130.198:4000/api/post-notification"
        fetch(url, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",

            },
            body: JSON.stringify({

                
                "message":message,
                "type":"alert",
               

            })
        }).then((response) => response.json())
            .then((result) => {
                if (result) {
                    console.log(result.message);
                }

            }).catch((err) => {
                console.log(err);
            })




    }
  

    useEffect(() => {
        const url = "http://172.23.130.198:4000/api/notification"
    
        fetch(url, {
          method: "get",
    
    
        }).then((response) => response.json())
          .then((result) => {
            setdata(result.notification);
            setloader(false);
    
    
    
    
          })
          .catch((err) => {
            console.log(err);
          })    

         
    
      }, [reload])

      useEffect(() => {
        client.connect({
            onSuccess: () => {
                console.log("Connected To Mqtt");
                client.subscribe(topic1);
                client.subscribe(topic2);
                client.subscribe(topic3);
                client.subscribe(topic4);
                client.subscribe(topic5);
                client.subscribe(topic6);
                client.subscribe(topic7);
                client.subscribe(topic8);
                client.subscribe(topic9);
                client.subscribe(topic10);
                client.subscribe(topic11);
                client.subscribe(topic12)

                
                client.onMessageArrived = onMessage
            },
            onFailure: () => {
                console.log("Failed to connect");
            }
        })

    }, [])

      async function onMessage(message) {

        if(message.destinationName === topic6){

            const rdata = message.payloadString.split(" ");
            console.log(rdata);

           

            props.navigation.navigate("Maps",{
               
                lati:rdata[0],
                longi:rdata[1]
              })

        }
        if(message.destinationName === topic9){

            const rdata = message.payloadString.split(" ");
            console.log(rdata);

           

            props.navigation.navigate("LiveStatus",{
               
                otherParam: rdata,
              })

        }
        if(message.destinationName === topic11){

            const rdata = message.payloadString.split(" ");
            console.log(rdata);
            setdriver(rdata);
            setModalVisible(true);
            // setaccident(rdata)
            // setModalVisible1(true);
            savevalue1("Driver Seat Status");
           


        }
        if(message.destinationName === topic11){

            const rdata = message.payloadString.split(" ");
            console.log(rdata);
            // setdriver(rdata);
            // setModalVisible(true);
            setaccident(rdata)
            setModalVisible1(true);
            savevalue1("Driver Seat Status");
           


        }

        if(message.destinationName === topic12){
            const adata = message.payloadString.split(" ");
            console.log(adata);
            setaccident(adata);
            setModalVisible1(true);
            savevalue2("Accident Detected");
            

        }


      }


    const location = ()=>{
        const message = new Paho.Message("track location");
        message.destinationName = topic1
        client.send(message);

        console.log("Track location");

        
    }
    const live = ()=>{

        const message = new Paho.Message("get Car Status");
        message.destinationName = topic10
        client.send(message);

        console.log("Live Car Status");



        
    }
    const member = ()=>{props.navigation.navigate("Members")}
    const car = ()=>{props.navigation.navigate("Registered")}

  
    const renderItem = ({ item, index }) => (
        
    <TouchableOpacity
          style={styles.listItem}
          onPress={item.type == "alert"? ()=>{props.navigation.navigate("Accident")}:item.type =="salert" ? ()=>{}:()=>{props.navigation.navigate("Maps")}}

        >
            {item.type == "user"? <FontAwesome5 name="user" size={40} color="green" />:<FontAwesome5 name="exclamation-triangle" size={40} color="red" /> }
          

    
          <View style={{ flex: 1 }}>
            <Text style={styles.songName}>{item.datetime.slice(0,10)}</Text>
    
            <View style={styles.songInfo}>
            <Text style={styles.singerName}>{item.message}</Text>

              <Text style={styles.songDuration}>{item.data}</Text>

            </View>
       
          </View>
    
        </TouchableOpacity>
      );
      const keyExtractor = (item) => item.sourceUri;

    return(
        <View style={stylel.fullcontainer}>
            <Modal
                animationType="slide"

                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Alert has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                    
                <View style={styles.header}>
          <Text style={styles.headerTitle}>Live Status of your Car</Text>
        </View>

        <View style={styles.datacontainer}>

                            <View style={styles.datatext}>
                                <Text style={styles.textstyle2}> !!!! Status of Your Car !!!!  </Text>

                            </View>
                            <View style={styles.datatext}>
                                <Text style={styles.textstyle2}> Car No : <Text style={styles.textstyle1}>{driver[0]}</Text>   </Text>

                            </View>
                            <View style={styles.datatext}>
                                <Text style={styles.textstyle1}> User details  <Text style={styles.textstyle2}></Text>  </Text>

                            </View>
                            <View style={styles.datatext}>
                                <Text style={styles.textstyle1}> Name  <Text style={styles.textstyle2}></Text>{driver[1]}  </Text>
                                <Text style={styles.textstyle1}> Blood Group  <Text style={styles.textstyle2}></Text>{driver[2]}  </Text>

                            </View>
                            <View style={styles.datatext}>
                                <Text style={styles.textstyle1}> Age <Text style={styles.textstyle2}>{driver[3]}</Text>  </Text>
                                <Text style={styles.textstyle1}> Address <Text style={styles.textstyle2}>{driver[4]}</Text>  </Text>

                            </View>
                       


                            <View style={styles.buttongrp}>
                                <TouchableOpacity
                                    style={[styles.button, { backgroundColor: "#54a111" }]}
                                    underlayColor="#3c730c"

                                    onPress={()=>{
                                        props.navigation.navigate("Maps",{
                                            lati:driver[5],
                                            longi:driver[6]
                                        })
                                    }}
                                   
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




                   




                
            </Modal>


            <Modal animationType="slide"

visible={modalVisible1}
onRequestClose={() => {
    Alert.alert('Alert has been closed.');
    setModalVisible1(!modalVisible1);
}}>

            <View style={styles.header}>
          <Text style={styles.headerTitle}>Accident Details</Text>
        </View>

        <View style={styles.datacontainer}>

                            <View style={styles.datatext}>
                                <Text style={styles.textstyle2}> !!!! Accident Detected !!!!  </Text>

                            </View>
                            <View style={styles.datatext}>
                                <Text style={styles.textstyle2}> Your Car No <Text style={styles.textstyle1}>{accident[0]}</Text> has been detected with an accident.  </Text>

                            </View>
                            <View style={styles.datatext}>
                                <Text style={styles.textstyle1}> User details  <Text style={styles.textstyle2}></Text>  </Text>

                            </View>
                            <View style={styles.datatext}>
                                <Text style={styles.textstyle1}> Name  <Text style={styles.textstyle2}> {accident[1]}</Text>  </Text>
                                <Text style={styles.textstyle1}> Blood Group  <Text style={styles.textstyle2}> {accident[3]}</Text>  </Text>

                            </View>
                            <View style={styles.datatext}>
                                <Text style={styles.textstyle1}> Age <Text style={styles.textstyle2}>{accident[5]}</Text>  </Text>
                                <Text style={styles.textstyle1}> Address <Text style={styles.textstyle2}>{accident[6]}</Text>  </Text>

                            </View>
                       


                            <View style={styles.buttongrp}>
                                <TouchableOpacity
                                    style={[styles.button, { backgroundColor: "#54a111" }]}
                                    underlayColor="#3c730c"
                                    onPress={()=>{navigation.navigate("Maps")}}x
                                >
                                    <Text style={styles.buttonText}>Track Location</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.button, { backgroundColor: "red" }]}
                                    underlayColor="#3c730c"
                                    onPress={()=>{navigation.navigate("Maps")}}

                                >
                                    <Text style={styles.buttonText}>Contact Hospital</Text>
                                </TouchableOpacity>

                            </View>




                        </View>



      

            </Modal>
        <View style={stylel.container}>
            <Text style={stylel.headertext}>Track Your Vehicle</Text>
        </View>
        <View style={stylel.image}>
        <Image source = {{uri:'https://render.fineartamerica.com/images/rendered/search/poster/8/5/break/images/artworkimages/medium/3/circa-59-douglas-pittman.jpg'}}
   style = {{height: 200 }}
   />
        </View>
        <View style={stylel.registercontainer}>
        <Text style={stylel.registertext}>Register Your Car</Text>
        <Text style={stylel.registertext1}>Get Started 
        <Icon
              name="arrow-right"
              size={16}
              style={stylel.icon}
              >
            </Icon></Text>
       
        </View>
        <View style={stylel.genderSelection}>

                    <ConnectDisconnect
                        label="Track"
                        iconName="location-arrow"
                        iconColor="red"
                        functionname={location}

                    />
                    <ConnectDisconnect
                        label="Live Status"
                        iconName="headset"
                        iconColor="blue"
                        functionname={live}
                    />
                    <ConnectDisconnect
                        label="Members"
                        iconName="user"
                        iconColor="green"
                        functionname={member}
                    />
                     <ConnectDisconnect
                        label="Cars"
                        iconName="car"
                        iconColor="white"
                        functionname={car}
                    />
                </View>

                <View style={stylel.header}>
          <Text style={stylel.headerTitle}>Notifications</Text>
        </View>
        <FlatList
            data={data.reverse()}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            showsVerticalScrollIndicator={false}
          />
        </View>
    )
}


const stylel = StyleSheet.create({
    fullcontainer:{
        backgroundColor: 'black',
        flex:1
    },
    container: {
        
       
        
        height:88
        
      },
      headertext:{
        color:'white',
        
        fontSize:18,
        padding:15,
        textAlign:"center",
        fontWeight:'bold',
        marginTop:30
        
        
    },
    imagecontainer:{
        height:180,
        


    },
    image:{

        height:180,
        
    },
    registercontainer:{
        marginTop:-10,
        height:60,
        backgroundColor:'black',
        opacity:0.6,
        borderRadius: 10,
        
    },
    registertext:{
        color:'white',
        
        
        fontSize:18,
        paddingLeft:15,
        paddingTop:3,
        textAlign:"left",
        fontWeight:'bold',

    },
    registertext1:{
        color:'white',
        
        
        fontSize:18,
        paddingLeft:15,
        textAlign:"left",
        fontWeight:'bold',
        paddingRight:10

    },
    icon:{
        marginLeft:10
    },
    genderSelection: {
        marginTop:10,
        height:70,
        flexDirection: "row",
        justifyContent: "space-between",

    },
    header: {
        padding: 15,
        marginBottom: 10,
      },
      headerTitle: {
        fontWeight: "bold",
        fontSize: 18,
        color: "white",
      },
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