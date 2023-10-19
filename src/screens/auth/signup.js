import { useContext, useState } from 'react'
import { View, StyleSheet, ActivityIndicator, Platform } from 'react-native'
import { AuthContext } from '../../context/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Text, Input, Image, Icon, Button } from '@rneui/themed';
import { Picker } from '@react-native-picker/picker';
import logo from "../../../assets/logo.png";

export default function Signup({ navigation }) {

  const [auth, setAuth] = useContext(AuthContext);

  const [id, setID] = useState(""); // No Kad Pengenalan
  const [nama, setNama] = useState("");
  const [emel, setEmel] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [jawatan, setJawatan] = useState(0);
  const [bahagian, setBahagian] = useState(0);
  const [role, setRole] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/signup", {
        staff_nama: nama,
        staff_ic: id,
        staff_emel: emel,
        staff_jawatan: jawatan,
        staff_bahagian: bahagian,
        password: password,
        password_confirmation: confirmPassword,
        role: "staff",
        staff_telefon: "",
        staff_hp: "",
        staff_passport: "/images/blank.png",
        staff_jantina: "",
        staff_tarikh_lahir: "",
        staff_bio: "",
      });

      if (data.error) {
        alert(data.error);
        setLoading(false);
      } else {
        setAuth(data);
        await AsyncStorage.setItem('@auth', JSON.stringify(data));
        // alert("Login successful");
        setLoading(false);
        navigation.navigate("Utama", { screen: 'Home', user: { id: data.user.id, name: data.user.staff_nama } });
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
        <Input
          label="Nama"
          placeholder='AMIRUL MUQMININ'
          errorStyle={{ color: 'red' }}
          onChangeText={(nama) => setNama(nama)}
          autoComplete="name"
          keyboardType="default"
          value={nama}
        />
      </View>
      <View style={{ width: '80%', marginTop: 20 }}>
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
        <Input
          label="Emel Rasmi"
          placeholder='emel@jpm.gov.my'
          errorStyle={{ color: 'red' }}
          onChangeText={(emel) => setEmel(emel)}
          autoComplete="email"
          keyboardType="email-address"
          value={emel}
        />
      </View>
      <View style={{ width: '80%', marginTop: 20 }}>
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
        <Input
          label="Pengesahan Kata Laluan"
          placeholder='xxxxxxxxxx'
          errorStyle={{ color: 'red' }}
          value={confirmPassword}
          onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
          secureTextEntry={true}
          autoComplete="password"
        />
      </View>
      <View style={{ width: '80%', marginTop: 20, paddingHorizontal: 10 }}>
        <Text>Bahagian</Text>
        <Picker
          selectedValue={bahagian}
          onValueChange={(itemValue, itemIndex) => setBahagian(itemValue)
          }>
          <Picker.Item enabled={false} label="PILIH BAHAGIAN" value="0" />
          <Picker.Item label="PEJABAT KETUA PENGARAH" value="1" />
          <Picker.Item label="PEJABAT TKP (KK)" value="2" />
          <Picker.Item label="PEJABAT TKP (P)" value="3" />
          <Picker.Item label="BAHAGIAN PERANCANGAN PROGRAM DAN PENYELIDIKAN" value="4" />
          <Picker.Item label="BPP (CAWANGAN PERANCANGAN PROGRAM)" value="5" />
          <Picker.Item label="BPP (CAWANGAN PENYELIDIKAN)" value="6" />
          <Picker.Item label="BMS" value="7" />
          <Picker.Item label="BMS (CAWANGAN KREATIF)" value="8" />
          <Picker.Item label="BMS (CAWANGAN MEDIA)" value="9" />
          <Picker.Item label="BAHAGIAN PENDIDIKAN DAN LATIHAN" value="10" />
          <Picker.Item label="BAHAGIAN SUMBER MANUSIA DAN PENTADBIRAN" value="11" />
          <Picker.Item label="BSP (UNIT SUMBER MANUSIA)" value="12" />
          <Picker.Item label="BSP (UNIT PENTADBIRAN)" value="13" />
          <Picker.Item label="BAHAGIAN KEWANGAN DAN PEROLEHAN" value="14" />
          <Picker.Item label="BKEP (UNIT KEWANGAN)" value="15" />
          <Picker.Item label="BKEP (UNIT PEROLEHAN)" value="16" />
          <Picker.Item label="BAHAGIAN TEKNOLOGI MAKLUMAT" value="17" />
          <Picker.Item label="UNIT INTEGRITI" value="18" />
          <Picker.Item label="UNIT PERHUBUNGAN AWAM" value="19" />
          <Picker.Item label="ZON IBU PEJABAT" value="20" />
          <Picker.Item label="ZON UTARA" value="21" />
          <Picker.Item label="ZON TENGAH" value="22" />
          <Picker.Item label="ZON SELATAN" value="23" />
          <Picker.Item label="ZON TIMUR" value="24" />
          <Picker.Item label="ZON SABAH" value="25" />
          <Picker.Item label="ZON SARAWAK" value="26" />
        </Picker>
      </View>
      <View style={{ width: '80%', marginTop: 20, paddingHorizontal: 10 }}>
        <Text>Jawatan</Text>
        <Picker
          selectedValue={jawatan}
          onValueChange={(itemValue, itemIndex) => setJawatan(itemValue)
          }>
          <Picker.Item enabled={false} label="PILIH JAWATAN" value="0" />
          <Picker.Item label="KETUA PENGARAH (JUSA A)" value="1" />
          <Picker.Item label="KETUA PENGARAH (JUSA B)" value="2" />
          <Picker.Item label="KETUA PENGARAH (JUSA C)" value="3" />
          <Picker.Item label="TIMBALAN KETUA PENGARAH (KK)" value="4" />
          <Picker.Item label="TIMBALAN KETUA PENGARAH (P)" value="5" />
          <Picker.Item label="PENGARAH (54)" value="6" />
          <Picker.Item label="PENGARAH (52)" value="7" />
          <Picker.Item label="PENGARAH (48)" value="8" />
          <Picker.Item label="KETUA PENOLONG PENGARAH KANAN (52)" value="9" />
          <Picker.Item label="KETUA PENOLONG PENGARAH (48)" value="10" />
          <Picker.Item label="PEREKA (48)" value="11" />
          <Picker.Item label="PENOLONG PENGARAH KANAN (44)" value="12" />
          <Picker.Item label="PENOLONG PENGARAH (44)" value="13" />
          <Picker.Item label="KETUA UNIT (44)" value="14" />
          <Picker.Item label="AKAUNTAN (44)" value="15" />
          <Picker.Item label="AKAUNTAN (41)" value="16" />
          <Picker.Item label="KETUA UNIT (41)" value="17" />
          <Picker.Item label="PENOLONG PENGARAH (41)" value="18" />
          <Picker.Item label="PEGAWAI PENERANGAN (41)" value="19" />
          <Picker.Item label="PEGAWAI TADBIR (41)" value="20" />
          <Picker.Item label="PEGAWAI TEKNOLOGI MAKLUMAT (41)" value="21" />
          <Picker.Item label="PENOLONG PEGAWAI PENERANGAN (38)" value="22" />
          <Picker.Item label="PENOLONG PEGAWAI PENERANGAN (32)" value="23" />
          <Picker.Item label="PENOLONG PEGAWAI TADBIR (32)" value="24" />
          <Picker.Item label="PENOLONG PEGAWAI TEKNOLOGI MAKLUMAT (32)" value="25" />
          <Picker.Item label="SETIAUSAHA PEJABAT (32)" value="26" />
          <Picker.Item label="PENOLONG AKAUNTAN (29)" value="27" />
          <Picker.Item label="PENOLONG PEGAWAI PENERANGAN (29)" value="28" />
          <Picker.Item label="PENOLONG PEGAWAI TADBIR (29)" value="29" />
          <Picker.Item label="PENOLONG PEGAWAI TEKNOLOGI MAKLUMAT (29)" value="30" />
          <Picker.Item label="SETIAUSAHA PEJABAT (32)" value="31" />
          <Picker.Item label="PEMBANTU TADBIR KEWANGAN (22)" value="32" />
          <Picker.Item label="PEMBANTU TADBIR (22)" value="33" />
          <Picker.Item label="SETIAUSAHA PEJABAT (22)" value="34" />
          <Picker.Item label="PEMBANTU TADBIR KEWANGAN (19)" value="35" />
          <Picker.Item label="PEMBANTU TADBIR (19)" value="36" />
          <Picker.Item label="SETIAUSAHA PEJABAT (19)" value="37" />
          <Picker.Item label="PEMANDU KENDERAAN (11)" value="38" />
          <Picker.Item label="PENGARAH (54)" value="39" />
          <Picker.Item label="PENGARAH (52)" value="40" />
          <Picker.Item label="PENGARAH (48)" value="41" />
          <Picker.Item label="PENOLONG PENGARAH (52)" value="42" />
          <Picker.Item label="PENOLONG PENGARAH (48)" value="43" />
          <Picker.Item label="PENOLONG PENGARAH (44)" value="44" />
          <Picker.Item label="PENOLONG PENGARAH (41)" value="45" />
          <Picker.Item label="PEGAWAI PENERANGAN (COS)" value="46" />
          <Picker.Item label="PENOLONG PEGAWAI PENERANGAN (COS)" value="47" />
          <Picker.Item label="PEGAWAI MYSTEP" value="48" />
          <Picker.Item label="PENOLONG PEGAWAI MYSTEP" value="49" />
          <Picker.Item label="PEMBANTU MYSTEP" value="50" />
        </Picker>
      </View>
      <View style={{ width: '80%', marginTop: 20, paddingHorizontal: 10 }}>
        {id && password ? <Button title="Log Masuk" onPress={() => handleSubmit()} /> : <Button disabled title="Log Masuk" onPress={() => navigation.navigate("Utama")} />}
      </View>
      <Text style={styles.text} onPress={() => navigation.navigate("Signin")}>Sudah berdaftar? Log masuk disini</Text>
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