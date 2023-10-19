import { useContext, useState } from 'react'
import { View, StyleSheet, ActivityIndicator, Platform } from 'react-native'
import { AuthContext } from '../../context/auth';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, Input, Image, Icon, Button } from '@rneui/themed';

import logo from "../../../assets/logo.png";

export default function Signin({ navigation }) {

  const [auth, setAuth] = useContext(AuthContext);

  const [id, setID] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/signin", {
        staff_ic: id,
        password: password,
      });
      
      console.log(data);

      if (data.error) {
        alert("masalah");
        setLoading(false);
      } else {

        setAuth(data);
        await AsyncStorage.setItem('@auth', JSON.stringify(data));
        // alert("Login successful");
        setLoading(false);
        navigation.navigate("Utama", { screen: 'Home',user: { id: data.user.id, name: data.user.staff_nama } });
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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image source={logo} style={Platform.OS !== "web" ? { width: 300, height: 100 } : { width: 420, height: 100 }} resizeMode="contain" />
      <View style={{ width: '80%', marginTop: 20 }}>
        {/* <Text h4 h4Style={styles.h4Style} style={styles.text}>Nombor Kad Pengenalan</Text> */}
        <Input
          label="Nombor Kad Pengenalan"
          placeholder='81xxxxxxxxxx'
          errorStyle={{ color: 'red' }}
          onChangeText={(id) => setID(id)}
          autoComplete="off"
          keyboardType="numeric"
          value={id}
        />
      </View>
      <View style={{ width: '80%', marginTop: 20 }}>
        {/* <Text h4 h4Style={styles.h4Style} style={styles.text}>Kata Laluan</Text> */}
        <Input
          label="Kata Laluan"
          placeholder='xxxxxxxxxx'
          errorStyle={{ color: 'red' }}
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={true}
          autoComplete="password"
          value={password}
        />
      </View>
      <View style={{ width: '80%', marginTop: 20 }}>
        {id && password ? <Button title="Log Masuk" onPress={() => handleSubmit()} /> : <Button disabled title="Log Masuk" onPress={() => navigation.navigate("Utama")} />}
      </View>
      <Text style={styles.text} onPress={() => navigation.navigate("Signup")}>Belum berdaftar? Daftar disini</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "PlusJakarta",
    marginLeft: 10,
    marginTop: 20,
    color: "blue"
  },
  h4Style: {
    fontSize: 18
  }
})