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

  export default function Registered(){

    const[loader,setloader] = useState(true);
    const[data,setdata] = useState([]);

    

    useEffect(()=>{
      const url = "http://172.17.75.64:4000/api/cars"
  
      fetch(url, {
        method: "get",
        
       
      }).then((response)=> response.json())
      .then((result)=>{
        setdata(result.cars);
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
          <Text style={styles.headerTitle}>Registered Cars</Text>
        </View>
      );

      const renderItem = ({ item, index }) => (
        <TouchableOpacity
          style={styles.listItem}
        >
          <FontAwesome5 name="car" size={40} color="green" />

    
          <View style={{ flex: 1 }}>
            <Text style={styles.songName}>{item.carname}</Text>
    
            <View style={styles.songInfo}>
            <Text style={styles.singerName}>{item.carno}</Text>

              <Text style={styles.songDuration}>{item.carowner}</Text>

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