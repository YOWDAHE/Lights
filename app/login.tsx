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
import * as Location from "expo-location";
import axios from "axios";
import { useNavigation, useRouter } from "expo-router";
import Constants from "expo-constants";

const LogIn = () => {
	const nav = useRouter();
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [seat, setSeat] = useState("");
	const [password, setPassword] = useState("");
	const [location, setLocation] = useState<Location.LocationObject>();

	const requestLocationPermission = async () => {
		try {
			if (Platform.OS === "ios") {
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

	// const getCurrentLocation = async () => {
	// 	const hasPermission = await requestLocationPermission();
	// 	if (hasPermission) {
	// 		console.log("Permission granted");
	// 		Geolocation.getCurrentPosition(
	// 			(position) => {
	// 				console.log("Position obtained");
	// 				const { latitude, longitude } = position.coords;
	// 				setLocation({ latitude, longitude });
	// 			},
	// 			(error) => {
	// 				console.error("Error getting location", error);
	// 			},
	// 			{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
	// 		);
	// 	} else {
	// 		console.log("Location permission denied");
	// 	}
	// };

	useEffect(() => {
		const getPermission = async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				Alert.alert("Permission to access location was denied");
				return;
			}

			let location = await Location.getCurrentPositionAsync({});
			setLocation(location);
			console.log(location);
		};
		getPermission();
	}, []);

	const handleLogIn = async () => {
		try {
			const response = await axios
				.post(
					"https://skyhighcloud.tech/light/routes/actions/shows.php",
					new URLSearchParams({
						func: "saveAudience",
						deviceid: "testYodahe",
						name: username,
						phone: phone,
						email: email,
						seat: seat,
						lat: location?.coords.latitude?.toString() || "",
						lng: location?.coords.longitude?.toString() || "",
					} as Record<string, string>),
					{
						headers: {
							"Content-Type": "application/x-www-form-urlencoded",
						},
					}
				)
				.then(() => {
					nav.navigate("/choice");
				});

			// console.log("Save Audience Response:", response.data);
		} catch (error) {
			console.error("Save Audience error:", error);
		}
	};

	return (
		<View style={styles.container}>
			<ThemedText style={{ textAlign: "center", marginBottom: 10 }}>
				Log In
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
			<TextInput
				style={styles.input}
				placeholder="Seat Number"
				value={seat}
				onChangeText={setSeat}
			/>
			<View style={{ height: 50 }}>
				<Button title="Sign Up" onPress={handleLogIn} />
			</View>
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
