import React from 'react'
import { useState, useContext, useEffect } from 'react'
import { View, ScrollView, ActivityIndicator, Text, StyleSheet } from 'react-native'
import { AuthContext } from '../../context/auth';
import { Button, Card, Input } from '@rneui/themed';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileIndex() {
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useContext(AuthContext);

  if (loading) {
    return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator></ActivityIndicator>
    </View>
  }

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

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Card>
        <Card.Title style={styles.text}>Profil Pengguna</Card.Title>
        <Card.Divider />
        <Input
          label="Nama: "
          value={auth?.user?.staff_nama}
          disabled={true}
        />
        <Input
          label="Emel: "
          value={auth?.user?.staff_emel}
          disabled={true}
        />
        <Card.Divider />
        <Button color='error' title="Log Keluar" onPress={() => logout()} />
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