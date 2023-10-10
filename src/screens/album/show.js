import React from 'react'
import { ScrollView, ActivityIndicator, StyleSheet, Platform, View, Pressable } from 'react-native';
import { Button, Card, Image, SearchBar, Text } from '@rneui/themed';
import MasonryList from '@react-native-seoul/masonry-list';
import PhotosList from '../../components/PhotosList'
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function AlbumShow({ route }) {
  const navigation = useNavigation();

  const albumData = route.params.photos;
  const album = route.params.album;

  return (<>
  <Button title="Muat turun" />
    <MasonryList
      showsVerticalScrollIndicator={false}
      data={albumData.photos}
      style={styles.list}
      numColumns={2}
      keyExtractor={(item, index) => index.toString()} // You may want to use a unique key
      renderItem={({ item, index }) => (
        <>
          <Pressable onPress={() => navigation.navigate("Photo.Show", {id: item.id, source: `http://localhost:8000/storage/${item.uri}`, data: item})}>
            <Card>
              <Card.Image id='photo'
                source={{ uri: `http://localhost:8000/storage/${item.uri}` }}
                PlaceholderContent={<ActivityIndicator />}
                resizeMode='contain'
                style={{ width: '100%', height: 200 }}
              />
            </Card>
          </Pressable>
        </>
      )}
    />
  </>
  )
}

const styles = StyleSheet.create({
  list: {
    width: '100%',
    backgroundColor: 'white',
  },
  item: {
    aspectRatio: 1,
    width: '100%',
    flex: 1,
  },
});