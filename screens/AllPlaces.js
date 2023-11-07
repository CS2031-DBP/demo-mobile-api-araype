import { View, Text, StyleSheet } from "react-native";

function AllPlaces({route}) {
    // TODO: Retrieve the new place, see the logs for a hint
    console.log(route)

    return (
        // TODO: Show all the places, including the new one
        <View>
            <Text style={styles.txt}>TODO: Show your favorite places using AsyncStorage.</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    txt: {
        marginTop: 100,
        textAlign: "center",
    }
})

export default AllPlaces;
