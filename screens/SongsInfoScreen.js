import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const SongsInfoScreen = () => {
  const route = useRoute();
  const [tracks, setTracks] = useState([]);
  const albumUrl = route?.params?.item?.track?.album.uri;
  const albumId = albumUrl.split(":")[2];

  const Navigation = useNavigation();
  useEffect(() => {
    async function fetchSongs() {
      const accessToken = await AsyncStorage.getItem("token");
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/albums/${albumId}/tracks`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch album songs");
        }

        const data = await response.json();
        const tracks = data.items;
        setTracks(tracks);
      } catch (err) {
        console.log(err.message);
      }
    }

    fetchSongs();
  }, []);
  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
      <ScrollView style={{ marginTop: 50 }}>
        <View style={{ flexDirection: "row", padding: 12 }}>
          <Ionicons
            onPress={() => Navigation.goBack()}
            name="arrow-back"
            size={24}
            color="white"
          />
          <View style={{ flex: 1, alignItems: "center" }}>
            <Image
              source={{ uri: route?.params?.item?.track?.album?.images[0].url }}
              style={{ width: 200, height: 200 }}
            />
          </View>
        </View>
        <Text
          style={{
            color: "white",
            marginHorizontal: 12,
            marginTop: 10,
            fontSize: 23,
            fontWeight: "bold",
          }}
        >
          {route?.params?.item?.track?.name}
        </Text>
        <View
          style={{
            marginHorizontal: 12,
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "wrap",
            marginTop: 10,
            gap: 7,
          }}
        >
          {route?.params?.item?.track?.artists?.map((item, index) => (
            <Text
              style={{ fontSize: 13, fontWeight: "500", color: "#909090" }}
              key={index}
            >
              {item.name}
            </Text>
          ))}
        </View>

        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 10,
          }}
        >
          <Pressable
            style={{
              width: 30,
              height: 30,
              borderRadius: 15,
              backgroundColor: "#1db954",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AntDesign name="arrowdown" size={20} color="white" />
          </Pressable>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <MaterialCommunityIcons
              name="cross-bolnisi"
              size={24}
              color="#1db954"
            />
            <Pressable
              // onPress={playTrack}
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: "#1db954",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Entypo name="controller-play" size={24} color="white" />
            </Pressable>
          </View>
        </Pressable>

        <View>
          <View style={{ marginTop: 10, marginHorizontal: 12 }}>
            {tracks.map((track, index) => (
              <Pressable
                style={{
                  marginVertical: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text
                  numberOfLines={2}
                    key={index}
                    style={{ fontSize: 16, fontWeight: "500", color: "white" }}
                  >
                    {track?.name}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 8,
                      marginTop: 5,
                    }}
                  >
                    {track.artists.map((item, index) => (
                      <Text
                        key={index}
                        style={{
                          fontSize: 16,
                          fontWeight: "500",
                          color: "gray",
                        }}
                      >
                        {item?.name}
                      </Text>
                    ))}
                  </View>
                </View>
                <Entypo name="dots-three-vertical" size={24} color="white" />
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default SongsInfoScreen;

const styles = StyleSheet.create({});
