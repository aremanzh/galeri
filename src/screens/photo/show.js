import { useState, useEffect, useRef, useContext } from "react";
import {
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Platform,
  View,
} from "react-native";
import { Button, Card, Image, SearchBar, Text } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { captureRef } from "react-native-view-shot";
// import domtoimage from 'dom-to-image-more';
import domtoimage from "dom-to-image";
import * as MediaLibrary from "expo-media-library";
import FileSaver, { saveAs } from "file-saver";
import { api } from "../../config/api";
import { FileContext } from "../../context/file";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

// Helpers Functions
import sentenceCase from "../../helpers/sentenceCase";
import dateFormat from "../../helpers/dateFormat";
import calculateFileSize from "../../helpers/calculateFileSize";
import extractFileName from "../../helpers/extractFileName";

export default function PhotoShow({ route }) {
  const navigation = useNavigation();
  const [status, requestPermission] = MediaLibrary.usePermissions();

  const imageRef = useRef();
  const [photoURL, setPhotoURL] = useState(null);
  const [photoData, setPhotoData] = useState(null);
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);

  if (status === null) {
    requestPermission();
  }

  useEffect(() => {
    // Perform your asynchronous operation here, such as fetching data
    // For example, using a mock fetch with setTimeout:
    setTimeout(() => {
      const photoURL = route.params.source;
      const photoData = route.params.data;
      setPhotoURL(photoURL);
      setPhotoData(photoData);
      setLoading(false);
    }, 1000); // Simulate a 1-second delay

    // If you have any cleanup to perform, return a function from useEffect
    // For example, if you're setting up a timer, you can clear it here
    return () => {
      // Cleanup code here (e.g., clearTimeout)
      clearTimeout();
    };
  }, []);

  const onSaveImageAsync = async () => {
    if (Platform.OS !== "web") {
      try {
        const localUri = await captureRef(imageRef, {
          quality: 1,
        });
        console.log("localUri:", localUri); // Log the local URI for debugging
        await MediaLibrary.saveToLibraryAsync(localUri);
        if (localUri) {
          alert("Saved!");
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const response = await axios.get(`${api}/api/v1/photos/${photoData?.id}/download`, {
          responseType: 'blob', // Set the response type to 'blob' to handle binary data
        });

        const name = photoData.uri;
        console.log(name);
        const resultName = name.split("images/");
        const result = resultName[1];

      
        // Check the HTTP response status
        if (response.status === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.download = result; // You can set the filename here
          link.click();
          window.URL.revokeObjectURL(url);
        } else {
          console.error('Failed to download the file. Server returned a non-200 status code.');
        }
      } catch (error) {
        // Handle network or other errors here
        console.error('Network error:', error);
      }
    }
  };

  const onDelete = async () => {
    setLoading(true)
    try {
      const { data } = await axios.post(`photos/${photoData?.id}/archive`, {id: photoData?.id});
      if(data.errors){
        console.log(data.errors);
        setLoading(false);
        return;
      } else {
        console.log(data.message);
        navigation.navigate("Utama", { screen: "Home"})
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator></ActivityIndicator>
      </View>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Card>
        <View ref={imageRef} collapsable={false}>
          {/* <Card.Image id="photo"
            source={{ uri: photoURL }}
            PlaceholderContent={<ActivityIndicator />}
            resizeMode='cover'
            style={{ width: '100%', height: 512 }}
          /> */}
          <Image
            id="photo"
            source={{ uri: photoURL }}
            style={{ width: "100%", height: 512 }}
          />
        </View>
        <Card.Title style={styles.title}>{extractFileName(photoURL)}</Card.Title>
        <Card.Divider />
        {/* <Text style={styles.text}>
          Album: {album.name || photoData.program.name}
        </Text> */}
        <Text style={styles.text}>Deskripsi: {sentenceCase(photoData.info)}</Text>
        <Text style={styles.text}>Saiz: {calculateFileSize(photoData.size)}</Text>
        <Text style={styles.text}>Tarikh: {dateFormat(photoData.created_at)}</Text>
        <Text style={styles.text}>Tarikh Kemaskini: {dateFormat(photoData.updated_at)}</Text>
        <Card.Divider />
        <Button style={{marginBottom: 10}} color='warning' title="Kemaskini" onPress={() => navigation.navigate("Photo.Edit", { id: photoData?.id, currentImage: photoURL})} />
        <Button style={{marginBottom: 10}} color='error' title="Hapus" onPress={() => onDelete()} />
        <Button style={{marginBottom: 10}} color='primary' title="Muat turun" onPress={onSaveImageAsync} />
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  list: {
    width: "100%",
  },
  item: {
    width: "100%",
    height: 300,
    flex: 1,
  },
  title: {
    fontFamily: "PlusJakartaBold",
    marginTop: 10,
    marginBottom: 10,
  },
  text: {
    fontFamily: "PlusJakarta",
    marginBottom: 10,
  },
});
