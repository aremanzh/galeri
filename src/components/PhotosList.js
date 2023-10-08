import axios from 'axios';
import { useState, useEffect } from 'react';
import { FlatList, ScrollView, ActivityIndicator, StyleSheet, Pressable, View } from 'react-native';
import { Image, SearchBar } from '@rneui/themed';
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
        numColumns={2}
        keyExtractor={(e) => e}
        renderItem={({ item, index }) => (
          <>
            <Image
              source={{ uri: photos + item + '/367/267' }}
              containerStyle={styles.item}
              PlaceholderContent={<ActivityIndicator />}
              onPress={() => navigation.navigate("Photo.Show", { id: item, source: photos + item })}
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
    backgroundColor: '#000',
  },
  item: {
    aspectRatio: 1,
    width: '100%',
    flex: 1,
  },
});