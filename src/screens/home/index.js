import { useContext, useEffect, useState } from 'react'
import { Text, View, ScrollView, ActivityIndicator, Pressable, Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { FileContext } from '../../context/file';
import { AuthContext } from '../../context/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logo from "../../../assets/logo.png";
import axios from 'axios';

// screens
import AlbumIndex from '../album/index';
import PhotoIndex from '../photo/index';
import PhotosList from '../../components/PhotosList';

const Tab = createBottomTabNavigator();


const Index = () => {
  const [photo, setPhoto] = useContext(FileContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPhotos();
  }, [])

  const loadPhotos = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/photos`);
      console.log(data);
      setPhoto(prevPhotos => ({
        ...prevPhotos,
        photos: data, // Update the state with the fetched data
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
    // <Text>{JSON.stringify(photo, null, 2)}</Text>
    <ScrollView showsVerticalScrollIndicator={false}>
      <PhotosList loading={true} photos={photo.photos} />
    </ScrollView>
  )
}




export default function HomeIndex({ navigation }) {
  const [auth, setAuth] = useContext(AuthContext);

  const logout = async () => {
    try {
      const { data } = await axios.post(`/logout/${auth?.user?.id}`);
      console.log(data)
      setAuth({ user: null, token: "" });
      await AsyncStorage.removeItem("@auth");
    } catch (error) {
      console.log(error);
    }

  }

  function Nav() {
    return (
      <View style={{ marginHorizontal: 20 }}>
        <Pressable onPress={() => navigation.navigate("Home")}>
          <Image source={logo} style={{ width: 350, height: 100 }} resizeMode={'contain'} />
        </Pressable>
      </View>
    )
  }

  return (
    <Tab.Navigator screenOptions={{
      headerRight: () => (
        <MaterialCommunityIcons name={"account"} size={25} color={"black"} style={{ marginHorizontal: 10 }} onPress={() => logout()}/>
      ),
      headerLeft: () => (
        <Nav />
      )
    }}>
      <Tab.Screen name="Home" component={Index} options={{
        title: "Utama",
        headerTitleStyle: { opacity: 0 },
        tabBarIcon: ({ focused, color, size }) => (
          <MaterialCommunityIcons name={focused ? "home" : "home-outline"} size={size} color={color} />
        )
      }} />
      <Tab.Screen name="Carian" component={PhotoIndex} options={{
        title: "Carian",
        headerTitleStyle: { opacity: 0 },
        tabBarIcon: ({ focused, color, size }) => (
          <MaterialCommunityIcons name={focused ? "image-search" : "image-search-outline"} size={size} color={color} />
        )
      }} />
      <Tab.Screen name="Album" component={AlbumIndex} options={{
        title: "Album",
        headerTitleStyle: { opacity: 0 },
        tabBarIcon: ({ focused, color, size }) => (
          <MaterialCommunityIcons name={focused ? "folder" : "folder-outline"} size={size} color={color} />
        )
      }} />
    </Tab.Navigator>
  )
}
