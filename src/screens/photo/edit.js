import { Button, Input, Text } from "@rneui/themed";
import { useState } from "react";
import { ActivityIndicator, View } from "react-native";
import ImageViewer from "../../components/ImageViewer";
import { MaterialIcons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

export default function PhotoEdit({ route }) {
    const navigation = useNavigation();
    const photoID = route.params.id;
    const currentImage = route.params.currentImage;
    const [newPhoto, setNewPhoto] = useState(null);
    const [info, setInfo] = useState("");
    const [loading, setLoading] = useState(false);

    const pickImageAsync = async () => {
      let result = await DocumentPicker.getDocumentAsync({
        type: "image/*",
      });
  
      if (!result.canceled) {
        const updatedImages = result.assets[0];
        console.log(updatedImages);
        setNewPhoto(updatedImages);
      } else {
        alert("Anda tidak memilih gambar.");
      }
    };

    const uploadImageAsync = async () => {
      setLoading(true);
      try {
        const formData = new FormData();

        formData.append("image", newPhoto?.file, newPhoto?.file?.name)
  
        formData.append("info", info);
        formData.append("id", photoID);

        const { data } = await axios.post(`/photos/${photoID}/update`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if(data.errors){
          console.log(data.errors);
          setLoading(false);
        } else {
          console.log(data.message);
          setLoading(false);
          navigation.navigate("Utama", { screen: "Home"});
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    if (loading) {
      return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator></ActivityIndicator>
        </View>
      );
    }

  return (
    <View>
      <ImageViewer placeholderImageSource={newPhoto ? newPhoto?.uri : currentImage} style={{width: "100%", height: 200, resizeMode: "contain"}}/>
      <Input
          label="Maklumat gambar"
          placeholder="ucapan Dato'..."
          errorStyle={{ color: "red" }}
          onChangeText={(info) => setInfo(info)}
          autoComplete="off"
          keyboardType="default"
          value={info}
          multiline={true}
          numberOfLines={3}
        />
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
          title="Simpan"
          onPress={uploadImageAsync}
          disabled={!newPhoto}
          style={{ marginBottom: 15 }}
          icon={
            <MaterialIcons
              name="upload-file"
              size={25}
              style={{ marginRight: 10 }}
              color={newPhoto ? "white" : "gray"}
            />
          }
        />
    </View>
  );
}
