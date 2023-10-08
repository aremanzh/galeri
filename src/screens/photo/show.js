import { useState, useEffect, useRef } from 'react';
import { ScrollView, ActivityIndicator, StyleSheet, Platform, View } from 'react-native';
import { Card, Image, SearchBar, Text } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { captureRef } from 'react-native-view-shot';
// import domtoimage from 'dom-to-image-more';
import domtoimage from 'dom-to-image';
import * as MediaLibrary from 'expo-media-library';

export default function PhotoShow({ route }) {
  const [status, requestPermission] = MediaLibrary.usePermissions();

  const photoID = route.params.id;
  const photoURL = route.params.source;

  const imageRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  if (status === null) {
    requestPermission();
  }

  const onSaveImageAsync = async () => {
    if (Platform.OS !== 'web') {
      try {
        const localUri = await captureRef(imageRef, {
          quality: 1,
        });
        console.log('localUri:', localUri); // Log the local URI for debugging
        await MediaLibrary.saveToLibraryAsync(localUri);
        if (localUri) {
          alert('Saved!');
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const dataUrl = await domtoimage.toJpeg(imageRef.current, {
          quality: 1,
        });

        let link = document.createElement('a');
        link.download = `${photoURL}-${Date.now()}.jpeg`;
        link.href = dataUrl;
        link.click();
      } catch (e) {
        console.log('Error (web):', e); // Log web-specific errors for debugging
      }
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Card >
        <View ref={imageRef} collapsable={false}>
          <Card.Image id='photo'
            source={{ uri: photoURL + '/367/267' }}
            PlaceholderContent={<ActivityIndicator />}
            resizeMode='cover'
            style={{ width: '100%', height: 512 }}
          />
        </View>
        <Card.Title>Tajuk gambar disini{photoID}</Card.Title>
        <Card.Divider />
        <Text style={{ marginBottom: 10 }}>
          Deskripsi gambar di sini
        </Text>
        <Text style={{ marginBottom: 10 }}>
          Album
        </Text>
        <Text style={{ marginBottom: 10 }}>
          Saiz
        </Text>
        <Text style={{ marginBottom: 10 }}>
          Tarikh muatnaik
        </Text>
        <Card.Divider />
        <Text onPress={onSaveImageAsync} h4 style={{ marginBottom: 10 }}>
          Muat Turun
        </Text>
      </Card>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  list: {
    width: '100%',
  },
  item: {
    width: '100%',
    height: 300,
    flex: 1,
  },
});