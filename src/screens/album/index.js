import { useState, useContext } from 'react'
import { View, ScrollView, ActivityIndicator, Pressable, Image, Text } from 'react-native'

import AlbumList from '../../components/AlbumList';
import { FileContext } from '../../context/file';

const BASE_URI = 'https://source.unsplash.com/random?sig=';

export default function AlbumIndex() {
  const [photo, setPhoto] = useContext(FileContext);
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator></ActivityIndicator>
    </View>
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <AlbumList loading={true} albums={BASE_URI} />
    </ScrollView>
  )
}