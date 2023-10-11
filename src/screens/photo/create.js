import { useState, useContext, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator, Platform } from "react-native";
import axios from "axios";
import { Text, Input, Image, Icon, Button } from "@rneui/themed";
import { FileContext } from "../../context/file";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function PhotoCreate({ route }) {
  const program_id = route.params.id;
  // const [id, setID] = useState(null);
  const [desc, setDesc] = useState("");
  // const [images, setImages] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      const selectedImages = result.assets.map((asset) => ({ uri: asset.uri }));
      // uploadImages(selectedImages);
      setUploadedImages(selectedImages);
    }
  };

  // const uploadImage = async (images) => {
  //   try {
  //     setLoading(true);

  //     if (images.length > 0) {
  //       const imgUrls = await Promise.all(
  //         images.map((image) => uploadImageAsync(image.uri))
  //       );
  //       setUploadedImages(imgUrls);
  //     } else {
  //       console.log("No images to upload.");
  //     }
  //   } catch (e) {
  //     console.error(e);
  //     alert("Upload failed, sorry :(");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const uploadImages = async (images) => {
    try {
      setLoading(true);

      if (images.length > 0) {
        const formData = new FormData();
        formData.append('desc', desc);
        formData.append('program_id', program_id);

        images.forEach((image, index) => {
          formData.append(`images[${index}]`, {
            uri: image.uri,
            type: 'image/jpeg', // You may need to adjust the content type based on your API
            name: `photo_${index}.jpg`,
          });
        });

        const API = Platform.OS !== "web" ? "http://10.0.2.2:8000/v1/photos" : "http://localhost:8000/v1/photos"

        // Replace the API endpoint with the correct URL
        const response = await fetch(API, {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        if (data.error) {
          alert(data.error);
        } else {
          // Handle success, navigate to a new screen or perform other actions
          console.log('Images uploaded successfully:', data);
        }
      } else {
        console.log('No images to upload.');
      }
    } catch (e) {
      console.error(e);
      alert('Upload failed, sorry :(');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    uploadImages(uploadedImages);
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
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {uploadedImages && uploadedImages > 0 ? (
          <Text>{uploadedImages.length} gambar telah dipilih.</Text>
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
      </View>
    </>
  );
}
