import axios from 'axios';
import { useState, useEffect } from 'react';
import { FlatList, ScrollView, ActivityIndicator, StyleSheet, Pressable, View } from 'react-native';
import { Image, SearchBar, Text } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import MasonryList from '@react-native-seoul/masonry-list';

export default function PhotosList({ loading, photos }) {

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
      <View style={{marginHorizontal: 10,}}>
       <SearchBar
        placeholder="Carian gambar atau program"
        onChangeText={updateSearch}
        value={search}
        searchIcon={() => (<MaterialCommunityIcons name='file-search' size={25} color={"gray"} />)}
        clearIcon={(search) => <MaterialCommunityIcons name='close' size={25} color={"gray"} onPress={() => clearSearch()} />}
        onClear={() => clearSearch()}
        containerStyle={{ marginTop: 10, backgroundColor: "", borderTopWidth: "0px",borderBottomWidth: "0px"}}
        style={{borderColor: "", backgroundColor: ""}}
        inputContainerStyle={{backgroundColor: "white"}}
        />
        <View style={{flex:1, flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
          <Text style={{marginLeft: 10, fontFamily: "PlusJakartaBold"}} h4>Semua Program</Text>
          <MaterialCommunityIcons name='file-plus' size={25} color={"gray"} style={{marginRight: 10}}/>
        </View>
    </View>
      <MasonryList showsVerticalScrollIndicator={false}
        data={photos}
        style={styles.list}
        keyExtractor={(item, index) => index.toString()} // You may want to use a unique key
        numColumns={2}
        loading={loading}
        renderItem={({ item, index }) => (
          <>
            <Image
              source={{ uri: `http://localhost:8000/storage/${item.uri}` }}
              containerStyle={styles.item}
              PlaceholderContent={<ActivityIndicator />}
              onPress={() => navigation.navigate("Photo.Show", { id: item.id, source: `http://localhost:8000/storage/${item.uri}`, data: item })}
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