import React from 'react'
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Signin from './src/screens/auth/signin';
import Signup from './src/screens/auth/signup';
import HomeIndex from './src/screens/home';
import PhotoShow from './src/screens/photo/show';
import AlbumShow from './src/screens/album/show';

const Stack = createNativeStackNavigator();

const AppEntry = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Utama' component={HomeIndex} options={{ headerShown: false }} />
        <Stack.Screen name='Photo.Show' component={PhotoShow} getId={({ params }) => { params.id, params.source }}
          options={({ route }) => ({
            title: route.params.id,
            headerShown: true,
            headerBackVisible: true,
            headerRight: () => (<>
              <MaterialCommunityIcons name='download' size={25} color={"black"} style={{ marginHorizontal: 10 }} />
            </>)
          })} />
        {/* <Stack.Screen name='Album.Show' component={AlbumShow} /> */}
        <Stack.Screen name='Album.Show' component={AlbumShow} getId={({ params }) => { params.id, params.photos }}
          options={({ route }) => ({
            title: route.params.id,
            headerShown: true,
            headerBackVisible: true
          })} />
        <Stack.Screen name='Signin' component={Signin} options={{ headerShown: false }} />
        <Stack.Screen name='Signup' component={Signup} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppEntry;