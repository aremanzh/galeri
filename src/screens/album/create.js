import { useState, useContext, useEffect } from 'react'
import { View, StyleSheet, ActivityIndicator, Platform } from 'react-native'
import axios from 'axios';
import { Text, Input, Image, Icon, Button } from '@rneui/themed';
import { FileContext } from '../../context/file';
import { useNavigation } from '@react-navigation/native';

export default function AlbumCreate() {
  const navigation = useNavigation();
  const [program, setProgram] = useContext(FileContext);
  const [name, setName] = useState(""); // Nama program
  const [desc, setDesc] = useState(""); // Maklumat program
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/albums", {
        name,
        desc
      });

      console.log(data);

      if (data.error) {
        alert(data.error);
        setLoading(false);
      } else {
        setProgram({ ...program, albums: [data, ...program.albums] }); // Use program.albums here
        setLoading(false);
        navigation.navigate("Utama", { screen: "Home"});
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  if (loading) {
    return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator></ActivityIndicator>
    </View>
  }

  return (
    <>
      <View style={{ width: '100%', marginTop: 20 }}>
        <Input
          label="Nama Program"
          placeholder='Kursus...'
          errorStyle={{ color: 'red' }}
          onChangeText={(name) => setName(name)}
          autoComplete="name"
          keyboardType="default"
          value={name}
        />
        <Input
          label="Maklumat Program"
          placeholder='Telah diadakan pada ...'
          errorStyle={{ color: 'red' }}
          onChangeText={(desc) => setDesc(desc)}
          autoComplete="off"
          keyboardType="default"
          value={desc}
          multiline={true}
          numberOfLines={3}
        />
      </View>
      <Button onPress={() => handleSubmit()}>Hantar</Button>
    </>
  )
}