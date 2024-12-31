import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import useFetchShow from "@/hooks/useFetchShow";

const ColorChange = () => {
    const { showname } = useLocalSearchParams();
    const { error, loading, show } = useFetchShow(showname as string);
    const [currentColor, setCurrentColor] = useState("black");
    console.log(loading);

    useEffect(() => {
        if (!loading && show.color) {
            setCurrentColor(show.color);
        }
    }, [loading]);

    return (
        <View style={[StyleSheet.absoluteFillObject, { backgroundColor: currentColor }]}>
            {/* <Text style={styles.text}>colorChange</Text> */}
        </View>
    );
};

export default ColorChange;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    text: {
        color: 'white',
        fontSize: 20,
    },
});
