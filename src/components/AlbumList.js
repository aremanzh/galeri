import axios from 'axios';
import { useState, useEffect } from 'react';
import { FlatList, ScrollView, ActivityIndicator, StyleSheet, View} from 'react-native';
import { Card, Image, SearchBar, Text } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import MasonryList from '@react-native-seoul/masonry-list';
import useSearch from '../hooks/useSearch';
import { api } from '../config/api';

export default function AlbumList({ loading, programs }) {
  const navigation = useNavigation();
  const [albums, setAlbums] = useState(programs);

  const updateSearch = (search) => {
    setKeyword(search);
  };

  const clearSearch = () => {
    setKeyword(''); // Clear the search value
  };

  const { keyword, setKeyword, filteredProgram } = useSearch(albums);

  // const API = "http://10.20.185.84:8000";
  function sentenceCase(str) {
    if (!str) {
        return ""
    }
    return str.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
  }

  function calculateFileSize(speedStr) {
    // Check if the input string can be treated as a number
    var speed = parseFloat(speedStr);
    if (isNaN(speed)) {
      return "Invalid input. Please provide a valid number.";
    }
  
    // Determine the appropriate unit based on the magnitude of the number
    let unit;
    if (speed > 1000) {
      speed /= 1000; // Convert to KB/s
      unit = "Megabytes";
    } else {
      unit = "Kilobytes";
    }
  
    // Format the result with 2 decimal places
    return `${speed.toFixed(2)} ${unit}`;
  }

  function dateFormat(date) {
    // Parse the input date string and convert it to the Asia/Singapore timezone
    const inputDate = new Date(date);
    const singaporeTimezone = 'Asia/Singapore';
  
    const singaporeDate = new Intl.DateTimeFormat('en-SG', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone: singaporeTimezone,
    }).format(inputDate);
  
    return singaporeDate;
  }

  return (
    <>
    <View style={{ marginHorizontal: 10 }}>
        <SearchBar
          placeholder="Carian gambar atau program"
          onChangeText={updateSearch}
          value={keyword}
          searchIcon={() => <MaterialCommunityIcons name='file-search' size={25} color="gray" />}
          clearIcon={() => (
            <MaterialCommunityIcons
              name='close'
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
        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text style={{ marginLeft: 10, fontFamily: "PlusJakartaBold", fontSize: 20 }}>
            Semua Program
          </Text>
          <MaterialCommunityIcons
            name='file-plus'
            size={25}
            color="gray"
            style={{ marginRight: 10 }}
            onPress={() => navigation.navigate("Album.Create")}
          />
        </View>
      </View>
      <FlatList
      showsVerticalScrollIndicator={false}
        data={filteredProgram}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Card key={index}>
            <Card.Title style={{fontFamily: "PlusJakartaBold"}}>{item.name.toUpperCase()}</Card.Title>
            <Card.Divider />
            {item.photos && item.photos.length > 0 ? (
              <Card.Image
                source={{ uri: `${api}/storage/${item.photos[0].uri}` }}
                containerStyle={styles.item}
                PlaceholderContent={<ActivityIndicator />}
                resizeMode="contain"
                onPress={() => navigation.navigate('Album.Show', { id: item.id, photos: item, album: albums })}
              />
            ) : (
              <Card.Image
                source={{ uri: `${api}/images/blank.png` }}
                containerStyle={styles.item}
                PlaceholderContent={<ActivityIndicator />}
                resizeMode="contain"
                onPress={() => navigation.navigate('Album.Show', { id: item.id, photos: item, album: albums })}
              />
              // <Text style={styles.text && {textAlign: "center"}}>No photos available</Text>
            )}
            <Card.Divider />
            <View style={styles.desc}>
              <Text style={styles.text}>Info Program: </Text><Text style={{fontFamily: "PlusJakarta"}}>{sentenceCase(item.desc)}</Text>
            </View>
            <View style={styles.desc}>
              <Text style={styles.text}>Jumlah Gambar: </Text><Text style={{fontFamily: "PlusJakarta"}}>{item.image_count} Gambar</Text>
            </View>
            <View style={styles.desc}>
              <Text style={styles.text}>Saiz Program: </Text><Text style={{fontFamily: "PlusJakarta"}}>{calculateFileSize(item.total_size)}</Text>
            </View>
            <View style={styles.desc}>
              <Text style={styles.text}>Tarikh Album: </Text><Text style={{fontFamily: "PlusJakarta"}}>{dateFormat(item.created_at)}</Text>
            </View>
            <View style={styles.desc}>
              <Text style={styles.text}>Tarikh Kemaskini: </Text><Text style={{fontFamily: "PlusJakarta"}}>{dateFormat(item.updated_at)}</Text>
            </View>
          </Card>
        )}
      />

      
    </>
  );
}

const styles = StyleSheet.create({
  list: {
    width: '100%',
  },
  item: {
    width: '100%',
    flex: 1,
    marginBottom: 10
  },
  desc: {
    flexDirection:'row',
  },
  text: {
    marginBottom: 10,
    fontFamily: "PlusJakartaBold"
  }
});
