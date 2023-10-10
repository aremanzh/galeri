import { useState, useEffect, useRef, useContext } from 'react';
import { ScrollView, ActivityIndicator, StyleSheet, Platform, View } from 'react-native';
import { Button, Card, Image, SearchBar, Text } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { captureRef } from 'react-native-view-shot';
// import domtoimage from 'dom-to-image-more';
import domtoimage from 'dom-to-image';
import * as MediaLibrary from 'expo-media-library';

import { FileContext } from '../../context/file';

export default function PhotoShow({ route }) {
  const [program, setProgram] = useContext(FileContext);
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
  
  const getProgramInfo = () => {
    if (!program.albums) {
      return null; // or return a default value
    }
  
    const album = program.albums.find(album => album.id === photoData.program_id);
    setAlbum(album);
    return album || null; // return null if album is not found
  };

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

  if (loading) {
    return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator></ActivityIndicator>
    </View>
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Card >
        <View ref={imageRef} collapsable={false}>
          <Card.Image id='photo'
            source={{ uri: photoURL }}
            PlaceholderContent={<ActivityIndicator />}
            resizeMode='cover'
            style={{ width: '100%', height: 512 }}
          />
        </View>
        <Card.Title style={styles.text}>{photoData.info}</Card.Title>
        <Card.Divider />
        {/* <Text style={styles.text}>
          Album: {album.name || photoData.program.name}
        </Text> */}
        <Text style={styles.text}>
          Saiz: {photoData.size} kilobytes
        </Text>
        <Text style={styles.text}>
          Tarikh: {photoData.created_at}
        </Text>
        <Card.Divider />
        <Button title="Muat turun" onPress={onSaveImageAsync} />
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
  text: {
    fontFamily: 'PlusJakartaBold',
    marginBottom: 10
  }
});