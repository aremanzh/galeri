import AppEntry from "./AppEntry";
import * as SplashScreen from 'expo-splash-screen';
import { FileProvider } from "./src/context/file";
import { AuthProvider } from "./src/context/auth";
import { useFonts } from 'expo-font';
import { useEffect } from "react";

export default function App() {
  const [loaded, error] = useFonts({
    PlusJakarta: require('./assets/fonts/PlusJakartaSans-Regular.ttf'),
    PlusJakartaBold: require('./assets/fonts/PlusJakartaSans-Bold.ttf'),
    PlusJakartaExtraBold: require('./assets/fonts/PlusJakartaSans-ExtraBold.ttf'),
    PlusJakartaItalic: require('./assets/fonts/PlusJakartaSans-Italic.ttf'),
    PlusJakartaLight: require('./assets/fonts/PlusJakartaSans-Light.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    async function appReady() {
      if (loaded) {
        await SplashScreen.hideAsync();
      }
    }
    appReady();
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <FileProvider>
        <AppEntry />
      </FileProvider>
    </AuthProvider>
  )
}