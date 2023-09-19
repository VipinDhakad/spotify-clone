import { StyleSheet, Text, View, SafeAreaView, Pressable } from "react-native";
import React, { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import * as AppAuth from "expo-app-auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, ResponseType, useAuthRequest } from 'expo-auth-session';


const discovery = {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
  };

const LoginScreen = () => {
  const Navigation = useNavigation();

//   useEffect(() => {
//     const checkTokenValididy = async () => {
//       const accessToken = await AsyncStorage.getItem("token");
//       const expirationDate = await AsyncStorage.getItem("expirationDate");
//       console.log("token", accessToken);
//       console.log("expiry", expirationDate);

//       if (accessToken && expirationDate) {
//         const currentTime = Date.now();

//         if (currentTime < parseInt(expirationDate)) {
//           //valid token
//           Navigation.navigate("Main");
//         } else {
//           await AsyncStorage.removeItem("token");
//           await AsyncStorage.removeItem("expirationDate");
//         }
//       }
//     };
//     // checkTokenValididy();
//     if (response?.type === 'success') {
//         const { access_token } = response.params;
//         console.log("token", access_token);
//       }
//   }, [response]);
  

    // const config={
    //     issuer:"https://accounts.spotify.com",
    //     clientId:"179666d77c884af28885c5f681f66b3b",
    //     scopes:[
    //         "user-read-email",
    //         "user-library-read",
    //         "user-read-recently-played",
    //         "user-top-read",
    //         "playlist-read-private",
    //         "playlist-read-collaborative",
    //         "playlist-modify-public" // or "playlist-modify-private"

    //     ],
    //     redirectUrl:"exp://localhost:19002/--/spotify-auth-callback"
    // }

    // const result = await AppAuth.authAsync(config)

    // const discovery = {
    //     authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    //     tokenEndpoint: 'https://accounts.spotify.com/api/token',
    //   };
    //   console.log("1");

    // const [request, response, promptAsync] = useAuthRequest(
    //   {
    //     responseType: ResponseType.Token,
    //     clientId: "179666d77c884af28885c5f681f66b3b",
    //     scopes: [
    //       "user-read-email",
    //       "user-library-read",
    //       "user-read-recently-played",
    //       "user-top-read",
    //       "playlist-read-private",
    //       "playlist-read-collaborative",
    //       "playlist-modify-public", // or "playlist-modify-private"
    //     ],
    //     // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
    //     // this must be set to false
    //     usePKCE: false,
    //     // redirectUrl: "com.clonespotify:/oauthredirect",
    //   },
    //   discovery
    // );
    // console.log("2");



    // if (response?.type === "success" && response.params["access_token"]) {
    //   access_token = response.params["access_token"];
    // }
    // console.log("4");
    // console.log("access token is ",access_token); // Now you can print the access_token here

    // if (result.accessToken) {
    // //   const expirationDate = new Date(
    // //     result.accessTokenExpirationDate
    // //   ).getTime();
    //   await AsyncStorage.setItem("token", result.accessToken);
    // //   await AsyncStorage.setItem("expirationDate", expirationDate.toString());
    //   Navigation.navigate("Main");
    // }

    
    const redirectUri = makeRedirectUri({});
    console.log(redirectUri);
      const [request, response, promptAsync] = useAuthRequest(
        {
          responseType: ResponseType.Token,
          clientId: '179666d77c884af28885c5f681f66b3b',
          scopes: ['user-library-read', 
                "user-read-email",
                'user-library-modify',
                "user-read-recently-played",
                "user-top-read",
                "playlist-read-private",
                "playlist-read-collaborative",
                "playlist-modify-public" ],
          // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
          // this must be set to false
          usePKCE: false,
          redirectUri:`${redirectUri}/--/spotify-auth-callback`
        
        },
        discovery
      );

      useEffect(()=>{
      if (response?.type === 'success') {
        const { access_token } = response.params;
        console.log("token is ",access_token);
        
        const setData =async()=>{
            await AsyncStorage.setItem("token", access_token);
            console.log("token set in storage");
        }
        setData();
        Navigation.navigate("Main");

      }
    }, [response]);

  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
      <SafeAreaView>
        <View style={{ height: 80 }} />
        <Entypo
          name="spotify"
          size={80}
          color="white"
          style={{ textAlign: "center" }}
        />
        <Text
          style={{
            color: "white",
            fontSize: 40,
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 40,
          }}
        >
          Millions of Songs Free on Spotify
        </Text>

        <View style={{ height: 80 }} />
        <Pressable
         disabled={!request}
         onPress={() => {
            promptAsync();
          }}
          style={{
            backgroundColor: "#1db954",
            padding: 10,
            marginLeft: "auto",
            marginRight: "auto",
            width: 300,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            marginVertical: 10,
          }}
        >
          <Text>Sign in with Spotify</Text>
        </Pressable>

        <Pressable
          style={{
            backgroundColor: "#131624",
            padding: 10,
            marginLeft: "auto",
            marginRight: "auto",
            width: 300,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            marginVertical: 10,
            borderColor: "#c0c0c0",
            borderWidth: 0.8,
          }}
        >
          <MaterialIcons name="phone-android" size={24} color="white" />
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontWeight: 500,
              flex: 1,
            }}
          >
            Continue with Phone Number
          </Text>
        </Pressable>

        <Pressable
          style={{
            backgroundColor: "#131624",
            padding: 10,
            marginLeft: "auto",
            marginRight: "auto",
            width: 300,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            marginVertical: 10,
            borderColor: "#c0c0c0",
            borderWidth: 0.8,
          }}
        >
          <AntDesign name="google" size={24} color="red" />
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontWeight: 500,
              flex: 1,
            }}
          >
            Sign in with Google
          </Text>
        </Pressable>

        <Pressable
          style={{
            backgroundColor: "#131624",
            padding: 10,
            marginLeft: "auto",
            marginRight: "auto",
            width: 300,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            marginVertical: 10,
            borderColor: "#c0c0c0",
            borderWidth: 0.8,
          }}
        >
          <Entypo name="facebook" size={24} color="blue" />
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontWeight: 500,
              flex: 1,
            }}
          >
            Sign in with Facebook
          </Text>
        </Pressable>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
