import axios from 'axios';
import { useState, useEffect } from 'react';
import { FlatList, ScrollView, ActivityIndicator, StyleSheet, View} from 'react-native';
import { Card, Image, SearchBar, Text } from '@rneui/themed';
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
          <Text style={{marginLeft: 10, fontFamily: "PlusJakartaBold"}} h4>Senarai Program</Text>
          <MaterialCommunityIcons name='folder-plus' size={25} color={"gray"} style={{marginRight: 10}}/>
        </View>
    </View>

      <FlatList
        data={programs}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Card key={index}>
            <Card.Title style={{fontFamily: "PlusJakarta"}}>{item.name}</Card.Title>
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
              <Text>No photos available</Text>
            )}
            <Text style={{ marginBottom: 10 }}>
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
});
