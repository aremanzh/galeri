import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Pressable,
} from "react-native";
import { Button, Card, Image, SearchBar, Text } from "@rneui/themed";
import MasonryList from "@react-native-seoul/masonry-list";
import { useNavigation } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { api } from "../../config/api";
import axios from "axios";
import sentenceCase from '../../helpers/sentenceCase.js'

// const Stack = createNativeStackNavigator();

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
  // const API = "http://10.85.146.142:8000";

  const filterResult = albumData?.photos?.filter(
    (photo) => photo.info && photo.info.toLowerCase().includes(keyword)
  );

  const filterUri = filterResult.map((photo) =>
    Array.isArray(photo?.uri)
      ? photo.uri.filter((uri) => uri.toLowerCase().includes(keyword))
      : []
  );

  console.log(album);

  const handleDownload = async () => {
    await axios.get(`${api}/api/v1/programs/${id}/download`)
      .then(response => {
        if (response.data.download_url) {
          // If the response contains a download URL, you can use it to download the file.
          const downloadUrl = response.data.download_url;
          // Create a link element to trigger the download
          let link = document.createElement('a');
          link.download = downloadUrl;
          link.href = downloadUrl;

          // Trigger the download by clicking the link
          link.click();
        } else {
          // Handle the error case when the ZIP archive creation failed.
          const error = response.data.error;
          console.error(`Failed to create the ZIP archive: ${error}`);
        }
      })
      .catch(error => {
        // Handle any network or server errors here.
        console.error('Network error:', error);
      });
  }

  return (
    <>
      <View style={{ marginHorizontal: 10, marginTop: 10 }}>
        <SearchBar
          placeholder="Carian gambar..."
          onChangeText={updateSearch}
          value={keyword}
          searchIcon={() => (
            <MaterialCommunityIcons name="file-search" size={25} color="gray" />
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
            {sentenceCase(albumData.name)}
          </Text>
          <View style={styles.row}>
            <Pressable style={styles.row} onPress={() => navigation.navigate("Album.Edit", { id: id, currentName: albumData.name, currentDesc: albumData.desc })}>
              <Text style={styles.text}>Kemaskini</Text>
              <MaterialCommunityIcons
                name="file-edit"
                size={25}
                color="gray"
                style={{ marginRight: 10 }}
              />
            </Pressable>
            <Pressable style={styles.row} onPress={() => navigation.navigate("Photo.Upload", { id: id, currentName: albumData.name })}>
              <Text style={styles.text}>Muat Naik</Text>
              <MaterialCommunityIcons
                name="file-plus"
                size={25}
                color="gray"
                style={{ marginRight: 10 }}
              />
            </Pressable>
          </View>
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
                      source: `${api}/storage/${item.uri}`,
                      data: item,
                    })
                  }
                >
                  <Card>
                    <Card.Image
                      id="photo"
                      source={{
                        uri: `${api}/storage/${item.uri}`,
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
          <Button title="Muat turun" onPress={() => handleDownload()} />
          <Button title="Hapuskan" color={"error"} onPress={() => alert("Hapuskan")} />
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
            Tiada gambar berkaitan program ini.{'\n'}Sila tambahkan gambar terlebih
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
