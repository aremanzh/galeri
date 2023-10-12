import { useState, useContext, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator, Platform, ScrollView } from "react-native";
import axios from "axios";
import { Text, Input, Image, Icon, Button } from "@rneui/themed";
import { FileContext } from "../../context/file";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from 'expo-file-system';
import { MaterialCommunityIcons } from "@expo/vector-icons";

const imgDir = FileSystem.documentDirectory + 'images/';

const ensureDirExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(imgDir);
  if(!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(imgDir, {intermediates: true});
  }
}

export default function PhotoCreate({ route }) {
  const program_id = route.params.id;
  // const [id, setID] = useState(null);
  const [desc, setDesc] = useState("");
  const [images, setImages] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    await ensureDirExists();
    const files = await FileSystem.readDirectoryAsync(imgDir);
    if(files.length > 0) {
      setImages(files.map(f=> imgDir + f));
    }
  }

  const pickImage = async (useLibrary) => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }

    let result;

    if(useLibrary) {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
      });
    } else {
      await ImagePicker.requestCameraPermissionsAsync();

      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
      })
    }

    if (!result.canceled) {
      const selectedImages = result.assets.map((asset) => ({ uri: asset.uri }));
      // uploadImages(selectedImages);
      // setUploadedImages(selectedImages);
      saveImage(selectedImages);
    }
  };

  const saveImage = async(uri) => {
    await ensureDirExists();
    const filename = new Date().getTime() + '.jpg';
    const dest = imgDir + filename;
    await FileSystem.copyAsync({ from: uri, to: desc});
    setImages([...images, dest]);
  }

  const handleSubmit = () => {
    uploadImage(uploadedImages);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator></ActivityIndicator>
      </View>
    );
  }

  return (
    <>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{alignItems: "center", justifyContent: "center"}}>
        {images && images.length > 0 ? (
        <>
        {images.map((img) => (
          <View>
            <Image key={img} source={{ uri: img }} style={{width: 300, height: 300, alignSelf: "center"}} />
            <Text>{uploadedImages.length} gambar telah dipilih.</Text>
          </View>
        ))}
        </>
        ) : (
          <View
            style={{ padding: 30, backgroundColor: "gray", marginBottom: 20 }}
          >
            <MaterialCommunityIcons
              name="file-upload"
              size={150}
              color="white"
              onPress={() => pickImage()}
            />
          </View>
        )}
        <View style={{ width: "80%", marginTop: 20 }}>
          <Input
            label="Maklumat Gambar"
            placeholder="Majlis penutup..."
            errorStyle={{ color: "red" }}
            onChangeText={(desc) => setDesc(desc)}
            autoComplete="off"
            keyboardType="default"
            value={desc}
          />
        </View>
        <View style={{ width: "80%", marginTop: 20 }}>
          <Button onPress={() => handleSubmit()}>Muat naik gambar</Button>
        </View>
      </ScrollView>
    </>
  );
}
