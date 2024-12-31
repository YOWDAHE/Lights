import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import useFetchShow from "@/hooks/useFetchShow";

const colorControl = () => {
	const { error, loading, show } = useFetchShow("Test");
	const [currentColor, setCurrentColor] = useState("black");

	useEffect(() => {
		if (!loading && show.color) {
			setCurrentColor(show.color);
		}
    }, [loading]);
    
	return (
		<View>
			<Text>colorControl</Text>
		</View>
	);
};

export default colorControl;

const styles = StyleSheet.create({});
