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

  export default function ReportPage(props){

    const[loader,setloader] = useState(true);
    const[data,setdata] = useState([]);
    const[reload,setreload] = useState(false);

    

    useEffect(()=>{
      const url = "http://172.23.130.198:4000/api/notification"
  
      fetch(url, {
        method: "get",
        
       
      }).then((response)=> response.json())
      .then((result)=>{
        
        setdata(result.notification);
          setloader(false);
            
  
        
      })
      .catch((err)=>{
        console.log(err);
      })
  
      },[reload]);

      let showdata
      showdata = (
        <>
        
        </>

      )
    const renderHeader = () => (
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Notifications</Text>
          <Text onPress={()=>setreload(!reload)} style={styles.headerTitle}>Reload</Text>

        </View>
      );

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
    <SafeAreaView style={styles.container}>
      {loader?
      <>
      <Text>Loading...</Text>
      </>
      :
      <>
      <FlatList
      data={data.reverse()}
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