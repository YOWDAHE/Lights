import { ThemedText } from "@/components/ThemedText";
import React, { useEffect, useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	Button,
	Alert,
	PermissionsAndroid,
	Platform,
} from "react-native";
import Geolocation from "react-native-geolocation-service";
import { GeoCoordinates } from "react-native-geolocation-service";

const LogIn = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [seat, setSeat] = useState("");
	const [password, setPassword] = useState("");
	const [location, setLocation] = useState<{
		latitude: number | null;
		longitude: number | null;
	}>({
		latitude: null,
		longitude: null,
	});

	const requestLocationPermission = async () => {
		try {
			if (Platform.OS === 'ios') {
				return true;
			}
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
				{
					title: "Location Permission",
					message: "This app needs access to your location.",
					buttonNeutral: "Ask Me Later",
					buttonNegative: "Cancel",
					buttonPositive: "OK",
				}
			);
			return granted === PermissionsAndroid.RESULTS.GRANTED;
		} catch (err) {
			console.warn(err);
			return false;
		}
	};

	const getCurrentLocation = async () => {
		const hasPermission = await requestLocationPermission();
		if (hasPermission) {
			console.log("Permission granted");
			Geolocation.getCurrentPosition(
				(position) => {
					console.log("Position obtained");
					const { latitude, longitude } = position.coords;
					setLocation({ latitude, longitude });
				},
				(error) => {
					console.error("Error getting location", error);
				},
				{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
			);
		} else {
			console.log("Location permission denied");
		}
	};

	useEffect(() => {
		getCurrentLocation();
	}, []);

	const handleLogIn = () => {
		// Add your sign-up logic here
		Alert.alert("Sign Up", `Username: ${username}, Email: ${email}`);
	};

	return (
		<View style={styles.container}>
			<ThemedText style={{ textAlign: "center", marginBottom: 10 }}>
				Log In {location.latitude}
			</ThemedText>
			<TextInput
				style={styles.input}
				placeholder="Username"
				value={username}
				onChangeText={setUsername}
			/>
			<TextInput
				style={styles.input}
				placeholder="Email"
				value={email}
				onChangeText={setEmail}
				keyboardType="email-address"
			/>
			<TextInput
				style={styles.input}
				placeholder="Password"
				value={password}
				onChangeText={setPassword}
				secureTextEntry
			/>
			<View style={{ height: 50 }}>
				<Button title="Sign Up" onPress={handleLogIn} />
			</View>
			{location.latitude && location.longitude ? (
				<Text>Location: {location.latitude}, {location.longitude}</Text>
			) : (
				<Text>Fetching location...</Text>
			)}
			<Button title="Get Location" onPress={getCurrentLocation} />
		</View>
	);
};

export default LogIn;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		padding: 16,
		gap: 10,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 24,
		textAlign: "center",
	},
	input: {
		height: 50,
		borderColor: "gray",
		borderWidth: 1,
		marginBottom: 12,
		paddingHorizontal: 8,
		borderRadius: 5,
	},
});
