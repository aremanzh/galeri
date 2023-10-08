import axios from 'axios';
import { useState, useEffect } from 'react';
import { FlatList, ScrollView, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { Card, Image, SearchBar } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import MasonryList from '@react-native-seoul/masonry-list';

export default function AlbumList({ loading, albums }) {
  const navigation = useNavigation();

  const [search, setSearch] = useState("");
  const updateSearch = (search) => {
    setSearch(search);
  };

  const clearSearch = () => {
    setSearch(''); // Clear the search value
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
      <MasonryList showsVerticalScrollIndicator={false}
        data={[...new Array(50)].map((_, i) => i.toString())}
        style={styles.list}
        numColumns={1}
        keyExtractor={(e) => e}
        renderItem={({ item, index }) => (
          <Card>
            <Card.Title>{item}</Card.Title>
            <Card.Divider />
            <Card.Image
              source={{ uri: albums + item + '/367/267' }}
              containerStyle={styles.item}
              PlaceholderContent={<ActivityIndicator />}
              resizeMode='contain'
              onPress={() => navigation.navigate("Album.Show", { id: item, photos: "" })}
            />
            <Text style={{ marginBottom: 10 }}>
              The idea with React Native Elements is more about component
              structure than actual design.
            </Text>
          </Card>
        )}
      />
    </>
  )
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