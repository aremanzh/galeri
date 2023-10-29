import axios from 'axios';
import { useState, useEffect } from 'react';
import { FlatList, ScrollView, ActivityIndicator, StyleSheet, Pressable, View, Platform } from 'react-native';
import { Image, SearchBar, Text } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import MasonryList from '@react-native-seoul/masonry-list';
import useSearch from '../hooks/useSearch';
import { api } from '../config/api';
import extractFileName from '../helpers/extractFileName';

export default function PhotosList({ loading, photos, onRefresh, error }) {

  const navigation = useNavigation();

  // const [search, setSearch] = useState("");
  const updateSearch = (search) => {
    setKeyword(search);
  };

  const clearSearch = () => {
    setKeyword(''); // Clear the search value
  };

  const { keyword, setKeyword, filteredData } = useSearch(photos);

  const API = `${api}/storage/`;


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
            Semua Gambar ({filteredData.length})
          </Text>
          <Pressable style={styles.row} onPress={() => navigation.navigate('Album.Create')}>
            <Text style={styles.text}>Tambah</Text>
            <MaterialCommunityIcons
              name='file-plus'
              size={25}
              color="gray"
              style={{ marginRight: 10 }}
            />
          </Pressable>
        </View>
      </View>
      {filteredData.length > 0 ? (
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
                onPress={() => navigation.navigate("Photo.Show", { id: item.id, source: API + item.uri, data: item, name: item.uri })}
              />
            </>
          )}
        />) : (
        <>
          {error === true ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text
                style={{
                  fontFamily: "PlusJakartaBold",
                  color: "red",
                  textAlign: "center"
                }}
              >
                Pangkalan data tidak dapat diakses.<br /> Pastikan anda mempunyai jaringan internet. <br />Sekiranya masalah ini berlanjutan, sila hubungi pentadbir sistem.
              </Text>
            </View>
          ) : (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text
                style={{
                  fontFamily: "PlusJakartaBold",
                  color: "red",
                }}
              >
                Tiada gambar gambar yang dijumpai.
              </Text>
            </View>
          )}
        </>
      )}
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
  row: {
    flexDirection: "row",
    alignItems: "center"
  },
  text: {
    textAlign: "center",
    fontFamily: "PlusJakartaBold",
    marginRight: 6
  }
});