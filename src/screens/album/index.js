import { useState, useContext, useEffect } from 'react'
import { View, ScrollView, ActivityIndicator, Text} from 'react-native'
import axios from 'axios';

import AlbumList from '../../components/AlbumList';
import { FileContext } from '../../context/file';


export default function AlbumIndex() {
  const [program, setProgram] = useContext(FileContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPrograms();
  }, [])

  const loadPrograms = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/albums`);
      console.log(data);
      setProgram(prevProgram => ({
        ...prevProgram,
        albums: data
      }));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  if (loading) {
    return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator></ActivityIndicator>
    </View>
  }

  return (
    // <Text>{JSON.stringify(program.albums, null, 2)}</Text>
    // <Text>{JSON.stringify(program.albums, null, 2)}</Text>
    <ScrollView showsVerticalScrollIndicator={false}>
      <AlbumList loading={true} programs={program.albums}/>
    </ScrollView>
  )
}