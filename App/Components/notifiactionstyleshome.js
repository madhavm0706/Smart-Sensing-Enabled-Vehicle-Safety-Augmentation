import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import {
  PRIMARY_COLOR,
  PRIMARY_TEXT_COLOR,
  ROW,
  SECONDARY_TEXT_COLOR,
} from "./style";

export const styles = StyleSheet.create({
 

 
  listItem: {
    flexDirection: "row",
    margin:2,
    backgroundColor:"#323344",
    height:70,
    paddingTop:10,
    paddingLeft:10

  },
  coverImage: {
    width: 60,
    height: 60,
    borderRadius: 6,
    marginRight: 15,
  },
  songName: {
    paddingLeft:10,
    fontSize: 16,
    lineHeight: 24,
    color: "white",
  },
  songInfo: {
    ...ROW,
    
    paddingLeft:10,
    flex: 1,
    marginTop: 10,
  },
  singerName: {
    fontSize: 14,
    color: "green",
  },
  songDuration: {
    fontSize: 14,
    paddingRight:10,
    color: SECONDARY_TEXT_COLOR,
  },
  button:{
    marginRight:30,
    marginTop:15
  }

});
