import React, { useState } from "react";
import {
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Platform,
  View,
  Pressable,
} from "react-native";
import { Button, Card, Image, SearchBar, Text } from "@rneui/themed";
import MasonryList from "@react-native-seoul/masonry-list";
import PhotosList from "../../components/PhotosList";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useSearch from "../../hooks/useSearch";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

export default function AlbumShow({ route }) {
  const navigation = useNavigation();
  const [keyword, setKeyword] = useState("");

  const albumData = route.params.photos;
  const album = route.params.album;
  const id = route.params.id;

  const updateSearch = (search) => {
    setKeyword(search);
  };

  const clearSearch = () => {
    setKeyword(""); // Clear the search value
  };

  // const { keyword, setKeyword, filteredData } = useSearch(albumData);
  const API = "http://10.85.146.142:8000";

  const filterResult = albumData?.photos?.filter(
    (photo) => photo.info && photo.info.toLowerCase().includes(keyword)
  );

  const filterUri = filterResult.map((photo) =>
    Array.isArray(photo?.uri)
      ? photo.uri.filter((uri) => uri.toLowerCase().includes(keyword))
      : []
  );

  console.log(album);

  return (
    <>
      <View style={{ marginHorizontal: 10, marginTop: 10 }}>
        <SearchBar
          placeholder="Carian gambar..."
          onChangeText={updateSearch}
          value={keyword}
          searchIcon={() => (
            <MaterialCommunityIcons name="file-search" size={25} color="gray"/>
          )}
          clearIcon={() => (
            <MaterialCommunityIcons
              name="close"
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
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              marginLeft: 10,
              fontFamily: "PlusJakartaBold",
              fontSize: 20,
            }}
          >
            {albumData.name}
          </Text>
          <MaterialCommunityIcons
            name="file-plus"
            size={25}
            color="gray"
            style={{ marginRight: 10 }}
            onPress={() => navigation.navigate("Photo.Create", {id: id})}
          />
        </View>
      </View>
      {filterResult.length > 0 ? (
        <>
          <MasonryList
            showsVerticalScrollIndicator={false}
            data={filterResult}
            containerStyle={{ marginTop: 10 }}
            style={styles.list}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()} // You may want to use a unique key
            renderItem={({ item, index }) => (
              <>
                <Pressable
                  onPress={() =>
                    navigation.navigate("Photo.Show", {
                      id: item.id,
                      source: `${API}/storage/${item.uri}`,
                      data: item,
                    })
                  }
                >
                  <Card>
                    <Card.Image
                      id="photo"
                      source={{
                        uri: `${API}/storage/${item.uri}`,
                      }}
                      PlaceholderContent={<ActivityIndicator />}
                      resizeMode="contain"
                      style={{ width: "100%", height: 200 }}
                    />
                  </Card>
                </Pressable>
              </>
            )}
          />
          <Button title="Muat turun" />
        </>
      ) : (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text
            style={{
              textAlign: "center",
              fontFamily: "PlusJakartaBold",
              color: "red",
            }}
          >
            Tiada gambar berkaitan program ini.<br/>Sila tambahkan gambar terlebih
            dahulu
          </Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  list: {
    width: "100%",
    backgroundColor: "transparent",
  },
  item: {
    aspectRatio: 1,
    width: "100%",
    flex: 1,
  },
});
