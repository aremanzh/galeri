import axios from 'axios';
import { useState, useEffect } from 'react';
import { FlatList, ScrollView, ActivityIndicator, StyleSheet, Pressable, View, Platform } from 'react-native';
import { Image, SearchBar, Text } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import MasonryList from '@react-native-seoul/masonry-list';
import useSearch from '../hooks/useSearch';

export default function PhotosList({ loading, photos, onRefresh }) {

  const navigation = useNavigation();

  // const [search, setSearch] = useState("");
  const updateSearch = (search) => {
    setKeyword(search);
  };

  const clearSearch = () => {
    setKeyword(''); // Clear the search value
  };

  const { keyword, setKeyword, filteredData } = useSearch(photos);

  const API = `http://10.20.185.84:8000/storage/`;


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
            Semua Gambar
          </Text>
          <MaterialCommunityIcons
            name='file-plus'
            size={25}
            color="gray"
            style={{ marginRight: 10 }}
          />
        </View>
      </View>
      <MasonryList showsVerticalScrollIndicator={false}
        data={filteredData}
        style={styles.list}
        keyExtractor={(item, index) => index.toString()} // You may want to use a unique key
        numColumns={2}
        loading={loading}
        onRefresh={onRefresh}
        renderItem={({ item, index }) => (
          <>
            <Image
              source={{ uri: API + item.uri }}
              containerStyle={styles.item}
              PlaceholderContent={<ActivityIndicator />}
              onPress={() => navigation.navigate("Photo.Show", { id: item.id, source: API + item.uri, data: item })}
            />
          </>
        )}
      />
    </>
  )
}

const styles = StyleSheet.create({
  list: {
    width: '100%',
    marginTop: 10,
    paddingHorizontal: 20,
    gap: 4
  },
  item: {
    aspectRatio: 1,
    width: '100%',
    flex: 1,
  },
});