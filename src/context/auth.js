import { useState, useEffect, createContext } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { Platform } from "react-native";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  useEffect(() => {
    loadFromAsyncStorage();
  }, []);

  const API = Platform.OS !== "web" ? "http://10.0.2.2:8000/api/v1" : "http://127.0.0.1:8000/api/v1";

  // axios
  axios.defaults.baseURL = API;
  axios.defaults.headers.common["Authorization"] = `${auth?.token}`;

  axios.interceptors.response.use(function (response) {
    return response;
  },
    async function (error) {
      if (error.response.status === 401 || error.response.status === 403) {
        await AsyncStorage.removeItem("@auth");
        setAuth({ user: null, token: "" });
        alert("Session expired. Please login");
      }
      return Promise.reject(error);
    }
  );

  const loadFromAsyncStorage = async () => {
    try {
      let data = await AsyncStorage.getItem("@auth");
      data = JSON.parse(data);

      if (data) {
        setAuth({ ...auth, user: data.user, token: data.token });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };