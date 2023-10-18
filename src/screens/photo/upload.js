import { View, StyleSheet, Pressable } from "react-native";
import { Button, Input, Text } from "@rneui/themed";
import ImageViewer from "../../components/ImageViewer";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import * as DocumentPicker from "expo-document-picker";
import MasonryList from "@react-native-seoul/masonry-list";

export default function PhotoUpload({ route }) {
  const [selectedImage, setSelectedImage] = useState([]);
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const id = route.params.id; // program_id
  const PlaceholderImage = "https://picsum.photos/id/0/5000/3333";

  // const pickImageAsync = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     allowsMultipleSelection: true,
  //     quality: 1,
  //   });

  //   if (!result.canceled) {
  //     const updatedImages = result.assets.map((image) => ({
  //       ...image,
  //       id: Math.random(Math.floor()) + 1,
  //     }));
  //     console.log(updatedImages);

  //     setSelectedImage(updatedImages);
  //   } else {
  //     alert("Anda tidak memilih gambar.");
  //   }
  // };
  const pickImageAsync = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      multiple: true,
      type: "image/*",
    });

    if (!result.canceled) {
      const updatedImages = result.assets.map((image) => ({
        ...image,
        id: Math.random(Math.floor()) + 1,
      }));
      console.log(updatedImages);
      setSelectedImage(updatedImages);
    } else {
      alert("Anda tidak memilih gambar.");
    }
  };

  const uploadImageAsync = async () => {
    try {
      const formData = new FormData();

      selectedImage.forEach((image, index) => {
        formData.append("images[]", image.file, image.file.name)
      });

      formData.append("info", info);
      formData.append("program_id", id);

      console.log(formData);
      const { data } = await axios.post("/photos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeImage = (id) => {
    const updatedImages = selectedImage.filter((item) => item.id !== id);
    setSelectedImage(updatedImages);
    console.log(updatedImages);
  };

  const ImageViews = () => {
    if (selectedImage.length === 0) {
      return (
        <View style={styles.imageContainer}>
          <Text style={styles.text}>
            Tiada gambar yang dipilih. Silih pilih gambar dahulu.
          </Text>
        </View>
      );
    } else {
      
      return (
        <MasonryList showsVerticalScrollIndicator={false}
          data={selectedImage}
          style={styles.list}
          keyExtractor={(item, index) => index.toString()} // You may want to use a unique key
          numColumns={selectedImage.length > 1 ? 2 : 1}
          loading={loading}
          renderItem={({ item, index }) => (
            <View style={{alignItems: "center",}}>
              <Pressable onPress={() => removeImage(item.id)}>
                <ImageViewer
                  placeholderImageSource={item.uri}
                  style={styles.images}
                />
              </Pressable>
            </View>
          )}
        />
      )
    }
  };

  const ActionButton = () => {
    return (
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
          disabled={selectedImage.length === 0}
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
    );
  };

  return (
    <>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <ImageViews/>
        <ActionButton />
        <Input
          label="Maklumat gambar"
          placeholder="majlis penutup ..."
          errorStyle={{ color: "red" }}
          onChangeText={(info) => setInfo(info)}
          autoComplete="off"
          keyboardType="default"
          value={info}
          multiline={true}
          numberOfLines={3}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
  },
  containers: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  imagesContainer: {
    padding: 10,
    minHeight: 200,
    minWidth: 200,
  },
  images: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    alignItems: "center"
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  text: {
    fontFamily: "PlusJakarta",
    alignSelf: "center",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 5,
    marginVertical: 10,
  },
  list: {
    width: "100%",
    backgroundColor: "transparent",
  },
});
