import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { ThemedText } from '@/components/ThemedText'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import { Link } from 'expo-router'

const HomeOptions = () => {
  const navigation = useNavigation()

  return (
			<View style={styles.container}>
				<Link href="/colors" asChild>
					<TouchableOpacity style={styles.option}>
						<EntypoIcon name="colours" size={30} color="white" />
						<ThemedText>Color Show</ThemedText>
					</TouchableOpacity>
				</Link>
				<Link href="/games" asChild>
					<TouchableOpacity style={styles.option}>
						<EntypoIcon name="game-controller" size={30} color="white" />
						<ThemedText>Games</ThemedText>
					</TouchableOpacity>
				</Link>
			</View>
		);
}

export default HomeOptions

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 40,
  },
  option: {
    alignItems: 'center',
  },
})