import { View, StyleSheet } from "react-native";
import { Button, Text } from "@rneui/themed";
import ImageViewer from "../../components/ImageViewer";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

export default function PhotoUpload() {
  const [selectedImage, setSelectedImage] = useState(null);

  const PlaceholderImage = "https://picsum.photos/id/0/5000/3333";

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result);
      setSelectedImage(result.assets[0].uri);
    } else {
      alert("Anda tidak memilih gambar.");
    }
  };

  const uploadImageAsync = async () => {
    alert("You pressed upload button");
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {selectedImage === null ? (
        <>
          <View style={styles.imageContainer}>
            <Text style={styles.text}>
              Tiada gambar yang dipilih. Silih pilih gambar dahulu.
            </Text>
          </View>
        </>
      ) : (
        <View style={styles.imageContainer}>
          <ImageViewer placeholderImageSource={selectedImage} />
        </View>
      )}

      <View style={styles.footerContainer}>
        <Button
          title="Pilih gambar"
          onPress={pickImageAsync}
          icon={
            <MaterialIcons
              name="insert-photo"
              size={25}
              style={{ marginRight: 10 }}
              color="white"
            />
          }
          style={{ marginBottom: 15 }}
        />
        <Button
          disabled={selectedImage === null}
          title="Muat naik gambar"
          onPress={uploadImageAsync}
          style={{ marginBottom: 15 }}
          icon={
            <MaterialIcons
              name="upload-file"
              size={25}
              style={{ marginRight: 10 }}
              color={selectedImage ? "white" : "gray"}
            />
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  text: {
    fontFamily: "PlusJakarta",
    color: "white",
    alignSelf: "center",
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
});
