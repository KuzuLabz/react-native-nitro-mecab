import { Stack, SplashScreen } from "expo-router";
import { useEffect } from "react";
import { processDictionary } from "../utils/dictionary";
import { Mecab } from "@kuzulabz/react-native-nitro-mecab";

SplashScreen.preventAutoHideAsync();

const initializeMecab = async () => {
    if (Mecab.getIsInitialized()) {
        return;
    }
    try {
        const uri = await processDictionary();
        await Mecab.initialize(uri, 'ipadic');
        await SplashScreen.hideAsync();
    } catch (e) {
        console.error(e);
    }
};

export default function RootLayout() {

    useEffect(() => {
        initializeMecab();
    },[])
    
  return <Stack screenOptions={{headerShown: false}}/>;
}
