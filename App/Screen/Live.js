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

  import { FontAwesome5 } from "@expo/vector-icons";


  import { styles } from "../Components/notifiactionstyles";

  export default function Live(){

    const[loader,setloader] = useState(true);
    const[data,setdata] = useState([]);

    

    useEffect(()=>{
      const url = "http://172.23.130.198:4000/api/members"
  
      fetch(url, {
        method: "get",
        
       
      }).then((response)=> response.json())
      .then((result)=>{
        console.log(result.members[0].memberdetails)
        setdata(result.members[0].memberdetails);
        
          setloader(false);
            
  
    
      })
      .catch((err)=>{
        console.log(err);
      })
  
      },[]);

      let showdata
      showdata = (
        <>
        
        </>

      )
    const renderHeader = () => (
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Registered Members</Text>
        </View>
      );

      const renderItem = ({ item, index }) => (
        <TouchableOpacity
          style={styles.listItem}
        >
          <FontAwesome5 name="user" size={40} color="green" />

    
          <View style={{ flex: 1 }}>
            <Text style={styles.songName}>{item.name}</Text>
    
            <View style={styles.songInfo}>
            <Text style={styles.singerName}>Age-{item.age} Gender-{item.sex}</Text>

              <Text style={styles.songDuration}>{item.bloodgrp}</Text>

            </View>
       
          </View>
         
        
        </TouchableOpacity>
      );
      const keyExtractor = (item) => item.sourceUri;

    return(
    <SafeAreaView style={styles.container}>
      {loader?
      <>
      <Text>Loading...</Text>
      </>
      :
      <>
      <FlatList
      data={data}
      renderItem={renderItem}
      ListHeaderComponent={renderHeader}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
    />
      </>
      
      }
    
    </SafeAreaView>

)

  }