import React from 'react'
import { ScrollView, ActivityIndicator, StyleSheet, Platform, View, Pressable } from 'react-native';
import { Card, Image, SearchBar, Text } from '@rneui/themed';
import MasonryList from '@react-native-seoul/masonry-list';
import PhotosList from '../../components/PhotosList'
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function AlbumShow({ route }) {
  const navigation = useNavigation();

  const photoID = route.params.id;
  const albumData = route.params.photos;

  return (<>
    <MasonryList
      showsVerticalScrollIndicator={false}
      data={[...new Array(10)].map((_, i) => i.toString())}
      style={styles.list}
      numColumns={2}
      keyExtractor={(e) => e}
      renderItem={({ item, index }) => (
        <>
          <Card.Divider />
          <Pressable onPress={() => alert(item)}>
            <Card>
              <Card.Image id='photo'
                source={{ uri: "" }}
                PlaceholderContent={<ActivityIndicator />}
                resizeMode='contain'
                style={{ width: '100%', height: 200 }}
              />
              <Card.Divider />
              <Text style={{ marginBottom: 10 }}>
                Deskripsi gambar di sini
              </Text>
              <Text style={{ marginBottom: 10 }}>
                Album
              </Text>
              <Text style={{ marginBottom: 10 }}>
                Saiz
              </Text>
              <Text style={{ marginBottom: 10 }}>
                Tarikh muatnaik
              </Text>
            </Card>
          </Pressable>
        </>
      )}
    />
  </>

    // <ScrollView showsVerticalScrollIndicator={false}>
    //   <Card.Divider />
    //   <Card.Title>Album Title</Card.Title>
    //   {[...new Array(50)].map((_, i) => (
    //     <Card key={i}>
    //       <Card.Image id='photo'
    //         source={{ uri: "" }}
    //         PlaceholderContent={<ActivityIndicator />}
    //         resizeMode='contain'
    //         style={{ width: '100%', height: 512 }}
    //       />
    //       <Card.Divider />
    //       <Text style={{ marginBottom: 10 }}>
    //         Deskripsi gambar di sini
    //       </Text>
    //       <Text style={{ marginBottom: 10 }}>
    //         Album
    //       </Text>
    //       <Text style={{ marginBottom: 10 }}>
    //         Saiz
    //       </Text>
    //       <Text style={{ marginBottom: 10 }}>
    //         Tarikh muatnaik
    //       </Text>
    //     </Card>
    //   ))}
    // </ScrollView>
  )
}

const styles = StyleSheet.create({
  list: {
    width: '100%',
    backgroundColor: '#000',
  },
  item: {
    aspectRatio: 1,
    width: '100%',
    flex: 1,
  },
});