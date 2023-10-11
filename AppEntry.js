import React, { useContext } from 'react'
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from './src/context/auth';

import Signin from './src/screens/auth/signin';
import Signup from './src/screens/auth/signup';
import HomeIndex from './src/screens/home';
import PhotoShow from './src/screens/photo/show';
import AlbumShow from './src/screens/album/show';
import AlbumCreate from './src/screens/album/create';
import PhotoCreate from './src/screens/photo/create';

const Stack = createNativeStackNavigator();

const AppEntry = () => {
  const [auth, setAuth] = useContext(AuthContext);

  const authenticated = auth?.token !== "" && auth?.user !== null;

  console.log(auth);

  return (
    <NavigationContainer>
      <Stack.Navigator>
      {authenticated ? (<>
        <Stack.Screen name='Utama' component={HomeIndex} options={{ headerShown: false }} />
        <Stack.Screen name='Photo.Show' component={PhotoShow} getId={({ params }) => { params.id, params.source, params.data }}
          options={({ route }) => ({
            title: route.params.id,
            headerShown: true,
            headerBackVisible: true,
          })} />
        {/* <Stack.Screen name='Album.Show' component={AlbumShow} /> */}
        <Stack.Screen name='Album.Show' component={AlbumShow} getId={({ params }) => { params.id, params.photos }}
          options={({ route }) => ({
            title: route.params.id,
            headerShown: true,
            headerBackVisible: true
          })} />
        <Stack.Screen name='Album.Create' component={AlbumCreate} options={({ route }) => ({
            title: "Tambah Program",
            headerShown: true,
            headerBackVisible: true
          })} />
        <Stack.Screen name='Photo.Create' component={PhotoCreate} getId={({ params }) => { params.id }} options={({ route }) => ({
            title: "Tambah Gambar",
            headerShown: true,
            headerBackVisible: true
          })} />
      </>) : (<>
        <Stack.Screen name='Signin' component={Signin} options={{ headerShown: false }} />
        <Stack.Screen name='Signup' component={Signup} options={{ headerShown: false }} />
      </>)}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppEntry;