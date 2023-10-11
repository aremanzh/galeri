import axios from 'axios';
import { useState, useEffect } from 'react';
import { FlatList, ScrollView, ActivityIndicator, StyleSheet, View} from 'react-native';
import { Card, Image, SearchBar, Text } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import MasonryList from '@react-native-seoul/masonry-list';
import useSearch from '../hooks/useSearch';

export default function AlbumList({ loading, programs }) {
  const navigation = useNavigation();

  const updateSearch = (search) => {
    setKeyword(search);
  };

  const clearSearch = () => {
    setKeyword(''); // Clear the search value
  };

  const { keyword, setKeyword, filteredProgram } = useSearch(programs);

  return (
    <>
    <View style={{ marginHorizontal: 10 }}>
        <SearchBar
          placeholder="Carian gambar atau program"
          onChangeText={updateSearch}
          value={keyword}
          searchIcon={() => <MaterialCommunityIcons name='file-search' size={25} color="gray" />}
          clearIcon={() => (
            <MaterialCommunityIcons
              name='close'
              size={25}
              color="gray"
              onPress={clearSearch}
            />
          )}
          onClear={clearSearch}
          containerStyle={{
            marginTop: 10,
            backgroundColor: "transparent",
            borderTopWidth: 0,
            borderBottomWidth: 0,
          }}
          inputContainerStyle={{
            backgroundColor: "white",
            borderColor: "transparent",
          }}
        />
        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text style={{ marginLeft: 10, fontFamily: "PlusJakartaBold", fontSize: 20 }}>
            Semua Program
          </Text>
          <MaterialCommunityIcons
            name='file-plus'
            size={25}
            color="gray"
            style={{ marginRight: 10 }}
            onPress={() => navigation.navigate("Album.Create")}
          />
        </View>
      </View>

      <FlatList
        data={filteredProgram}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Card key={index}>
            <Card.Title style={{fontFamily: "PlusJakartaBold"}}>{item.name}</Card.Title>
            <Card.Divider />
            {item.photos && item.photos.length > 0 ? (
              <Card.Image
                source={{ uri: `http://localhost:8000/storage/${item.photos[0].uri}` }}
                containerStyle={styles.item}
                PlaceholderContent={<ActivityIndicator />}
                resizeMode="contain"
                onPress={() => navigation.navigate('Album.Show', { id: item.id, photos: item, album: programs })}
              />
            ) : (
              <Card.Image
                source={{ uri: `http://localhost:8000/images/blank.png` }}
                containerStyle={styles.item}
                PlaceholderContent={<ActivityIndicator />}
                resizeMode="contain"
                onPress={() => navigation.navigate('Album.Show', { id: item.id, photos: item, album: programs })}
              />
              // <Text style={styles.text && {textAlign: "center"}}>No photos available</Text>
            )}
            <Text style={styles.text}>
              {item.desc}
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
  text: {
    marginBottom: 10,
    fontFamily: "PlusJakarta"
  }
});
