import { Button, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import useFetchShow from "@/hooks/useFetchShow";
import { ThemedText } from "@/components/ThemedText";
import RNPickerSelect from "react-native-picker-select";
import { Link } from "expo-router";

const Choice = () => {
	const { error, loading, show } = useFetchShow();
	const [selectedShow, setSelectedShow] = useState(null);

	const showOptions = show
		? show.data["showname"].map((s: string) => ({
				label: s,
				value: s,
		  }))
		: [];

	return (
		<View style={styles.container}>
			<ThemedText style={styles.text}>Choose Show</ThemedText>
			<RNPickerSelect
				onValueChange={(value) => setSelectedShow(value)}
				items={showOptions}
				style={pickerSelectStyles}
				placeholder={{ label: "Select a show...", value: null }}
			/>
			<View
				style={{
					marginTop: 20,
                    width: "100%",
                    paddingHorizontal: 10,
				}}
			>
				<Link
					asChild
					href={{
						pathname: "/home",
						params: { showname: selectedShow },
					}}
				>
					<Button title="Continue" />
				</Link>
			</View>
		</View>
	);
};

export default Choice;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 16,
	},
	text: {
		fontSize: 18,
		marginBottom: 10,
	},
});

const pickerSelectStyles = StyleSheet.create({
	inputIOS: {
		fontSize: 16,
		paddingVertical: 12,
		paddingHorizontal: 10,
		borderWidth: 1,
		borderColor: "gray",
		borderRadius: 4,
		color: "white",
		paddingRight: 30,
	},
	inputAndroid: {
		backgroundColor: "purple",
		margin: 10,
		fontSize: 16,
		paddingHorizontal: 10,
		paddingVertical: 8,
		borderWidth: 2,
		borderColor: "purple",
		borderRadius: 8,
		color: "white",
		paddingRight: 30,
	},
});
