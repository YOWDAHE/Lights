import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { SafeAreaView } from "react-native-safe-area-context";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		// <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
		<ThemeProvider value={DefaultTheme}>
			<Stack initialRouteName="index" screenOptions={{
				headerShadowVisible: false,
				headerStyle: {
					backgroundColor: 'white',
				},
				contentStyle: {
					backgroundColor: 'white',
				}
			}}>
				<Stack.Screen name="login" options={{contentStyle: {backgroundColor: 'white'}, headerShadowVisible: false}} />
				<Stack.Screen name="index" options={{ headerShown: false }} />
				<Stack.Screen name="(users)/home" options={{ title: 'home',}} />
				<Stack.Screen name="(admins)/colorControl" options={{ title: 'Color Control',}} />
				<Stack.Screen
					name="(users)/choice"
					options={{ title: "choice", }}
				/>
			</Stack>
			<StatusBar style="auto" />
		</ThemeProvider>
	);
}
