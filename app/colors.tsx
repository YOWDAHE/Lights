import { StyleSheet, View, TouchableOpacity, Animated } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { ThemedText } from "@/components/ThemedText";
import { Accelerometer } from "expo-sensors";
import { useNavigation } from "@react-navigation/native";

const Colors = () => {
	const navigation = useNavigation();
	const colors = ["red", "green", "blue"];
	const [currentColorIndex, setCurrentColorIndex] = useState(0);
	const [{ x }, setData] = useState({ x: 0 });
	const colorAnim = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Accelerometer.setUpdateInterval(10);

		const subscription = Accelerometer.addListener((accelerometerData) => {
			const { x } = accelerometerData;
			const roundedX = Math.round(x * 10) / 10;
			setData({ x: roundedX });

			let newIndex = 0;
			if (roundedX > -0.3 && roundedX < 0.3) {
				newIndex = 1;
			} else if (roundedX <= -0.3) {
				newIndex = 0;
			} else {
				newIndex = 2;
			}

			if (newIndex !== currentColorIndex) {
				// Start the animation
				Animated.timing(colorAnim, {
					toValue: newIndex,
					duration: 500,
					useNativeDriver: false,
				}).start();
				setCurrentColorIndex(newIndex);
			}
		});

		return () => subscription.remove();
	}, [currentColorIndex, colorAnim]);

	const interpolateColor = colorAnim.interpolate({
		inputRange: [0, 1, 2],
		outputRange: colors,
	});

	return (
		<View style={styles.container}>
			<TouchableOpacity
				onPress={() => {
					navigation.setOptions({
						headerShown: true,
					});
					setTimeout(() => {
						navigation.setOptions({
							headerShown: false,
						});
					}, 2000);
				}}
				style={[styles.colorContainer]}
			>
				<Animated.View
					style={[
						StyleSheet.absoluteFillObject,
						{ backgroundColor: interpolateColor },
					]}
				/>
				<ThemedText style={styles.text}>{x}</ThemedText>
			</TouchableOpacity>
		</View>
	);
};

export default Colors;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	colorContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
	},
	text: {
		color: "white",
		fontSize: 24,
	},
});
