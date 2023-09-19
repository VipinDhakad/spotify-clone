import { Pressable, StyleSheet, Text, Image} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const RecentlyPlayedCard = ({item}) => {

  const Navigation = useNavigation();
  return (
    <Pressable style={{margin:10, }} onPress={()=>Navigation.navigate("Info",{
      item:item
    })}>
        <Image source={{uri:item.track.album.images[0].url}} style={{width:130, height:130, borderRadius:5}}/>
        <Text 
            numberOfLines={1} 
            style={{color:'white', fontSize:13, fontWeight:'500', marginTop:10}}>
            {item?.track?.name}
        </Text>
    </Pressable>
  )
}

export default RecentlyPlayedCard

const styles = StyleSheet.create({})