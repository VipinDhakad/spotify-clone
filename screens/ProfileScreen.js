import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const ProfileScreen = () => {
  const [userProfile, setUserProfile] = useState();
  const [playlists, setPlaylists] = useState([]);

  const getProfile = async () => {
    const accessToken = await AsyncStorage.getItem("token");
    // const accessToken = "BQCCCnInDaQg8BGzgBA1qq-RhV6pmbT2qQmDsWE1xFa8B16CjW8PMkjcypMn1VHmT-IkcwOv1opizxrlAPwTI8VcuHKG-zBnqtsn-cmpfS80sBOSSNpybJel7F4SIHn2DfCWEBKGtLL1r_F1iBZpQV_lMqU8I02tUlH1f3AFy5v6JXjo0N6F9g5hkPTQ_Rv-inPuB0MbcB0JbSuXdwWfDJLE2-j50UrZcCiKlZ0JVDb_cT-cxuJZSNJAMJ6IvbK34wPbi6KaMLHCKJkG"
    try {
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      setUserProfile(data);
      return data;
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    const getPlaylists = async () => {
      const accessToken = await AsyncStorage.getItem("token");
      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/me/playlists",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setPlaylists(response.data.items);
      } catch (err) {
        console.log(err.message);
      }
    };

    getPlaylists();
  }, []);
  
  // console.log("profile", userProfile);
  // console.log("playlists",playlists);
  return (
    <LinearGradient colors={["#040306", "#131642"]} style={{ flex: 1 }}>
      <ScrollView style={{ marginTop: 50 }}>
        <View style={{padding:12}}>
          <View style={{flexDirection:'row', alignItems:'center', gap:10}}>
            <Image
              source={{ uri: userProfile?.images[0].url }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                resizeMode: "cover",
              }}
            />
            <View>
              <Text style={{color:'white', fontSize:16, fontWeight:'bold'}}>{userProfile?.display_name}</Text>
              <Text style={{color:'gray', fontSize:16, fontWeight:'bold'}}>{userProfile?.email}</Text>
            </View>
          </View>
          
        </View>
        <Text style={{color:"white", fontWeight:'500', fontSize:20, marginHorizontal:12}}> Your Playlists </Text>
        

        <View style={{padding:15, }}>
          {playlists.map((item, index)=>(
            <View style={{flexDirection:'row', alignItems:'center', gap:8, marginVertical:10}}>
              <Image 
                style={{width:50, height:50, borderRadius:4}}
                source={{uri:item?.images[0]?.url || "https://i.pravatar.cc/100"}}
              />
              <View>
                <Text style={{color:"white"}}>{item?.name} </Text>
                <Text style={{color:"white", marginTop:7}}>0 followers </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
