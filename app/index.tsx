import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { Link, Stack, useNavigation } from "expo-router";
import { ThemedText } from "@/components/ThemedText";

const Index = () => {
	return (
		<View style={styles.container}>
			<View style={styles.buttonContainer}>
				<Link href="/choice" asChild>
					<Button title="Log In" />
				</Link>
			</View>
			<View style={styles.buttonContainer}>
				<Link href="/(admins)/colorControl" asChild>
					<Button title="Event" />
				</Link>
			</View>
		</View>
	);
};

export default Index;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		gap: 10,
	},
	buttonContainer: {
		margin: 10,
		width: "80%",
	},
});
