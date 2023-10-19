import { Button, Text } from "@rneui/themed";
import { useState } from "react";
import { View } from "react-native";
import ImageViewer from "../../components/ImageViewer";
import { MaterialIcons } from "@expo/vector-icons";

export default function PhotoEdit({ route }) {
    const photoID = route.params.id;
    const currentImage = route.params.currentImage;
    const [newPhoto, setNewPhoto] = useState(null);

    console.log(photoID);
    console.log(currentImage);

    const pickImageAsync = () => {

    }

  return (
    <View>
      <ImageViewer placeholderImageSource={currentImage} style={{width: "100%", height: 200, resizeMode: "contain"}}/>
      <Text>Hello Edit goes here</Text>
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
          disabled={!newPhoto}
          title="Muat naik gambar"
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
