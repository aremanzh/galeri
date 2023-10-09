import axios from 'axios';
import { useState, useEffect } from 'react';
import { FlatList, ScrollView, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { Card, Image, SearchBar } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import MasonryList from '@react-native-seoul/masonry-list';

export default function AlbumList({ loading, programs }) {
  const navigation = useNavigation();

  const [search, setSearch] = useState('');
  const updateSearch = (search) => {
    setSearch(search);
  };

  const clearSearch = () => {
    setSearch('');
  };

  return (
    <>
       <SearchBar
        placeholder="Type Here..."
        onChangeText={updateSearch}
        value={search}
        searchIcon={() => (<MaterialCommunityIcons name='file-search' size={25} color={"gray"} />)}
        clearIcon={(search) => <MaterialCommunityIcons name='close' size={25} color={"gray"} onPress={() => clearSearch()} />}
        onClear={() => clearSearch()}
        />

      {/* FlatList for rendering the list of programs */}
      <FlatList
        data={programs}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Card key={index}>
            <Card.Title>{item.name}</Card.Title>
            <Card.Divider />
            {item.photos && item.photos.length > 0 ? (
              <Card.Image
                source={{ uri: `http://localhost:8000/storage/${item.photos[0].uri}` }}
                containerStyle={styles.item}
                PlaceholderContent={<ActivityIndicator />}
                resizeMode="contain"
                onPress={() => navigation.navigate('Album.Show', { id: item.id, photos: item.photos })}
              />
            ) : (
              <Text>No photos available</Text>
            )}
            <Text style={{ marginBottom: 10 }}>
              The idea with React Native Elements is more about component structure than actual design.
            </Text>
          </Card>
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  list: {
    width: '100%',
  },
  item: {
    width: '100%',
    flex: 1,
  },
});
