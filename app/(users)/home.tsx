import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import HomeOptions from "./_components/HomeOptions";
import { useLocalSearchParams, useSearchParams } from "expo-router/build/hooks";
import useFetchShow from "@/hooks/useFetchShow";

const home = () => {
	const { showname } = useLocalSearchParams();
	return (
		<SafeAreaView style={styles.safeArea}>
			<View
				style={{
					display: "flex",
				}}
			>
				<ThemedText
					style={{
						fontSize: 24,
						fontWeight: "bold",
						marginBottom: 10,
						textAlign: "center",
					}}
				>
					Hi Yodahe,
				</ThemedText>
				<ThemedText style={{ textAlign: "center" }}>
					Chose the action you would like to do
				</ThemedText>
			</View>
			<HomeOptions show={showname}/>
		</SafeAreaView>
	);
};

export default home;

const styles = StyleSheet.create({
	whiteText: {
		color: "white",
	},
	safeArea: {
		paddingTop: 50,
		paddingHorizontal: 10,
	},
});
