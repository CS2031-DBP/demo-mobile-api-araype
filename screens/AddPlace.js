import { useState } from "react";
import { TextInput, Button } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import ImagePicker from "../components/Camera/ImagePicker";
import MapPicker from "../components/Map/MapPicker";
import { Colors } from "../components/util/Colors";

const AddPlace = ({navigation}) => {
    const [place, setPlace] = useState("");
    const [selectedImage, setSelectedImage] = useState();
    const [pickedLocation, setPickedLocation] = useState();

    function imageHandler(imageUri) {
        setSelectedImage(imageUri);
    }

    function pickHandler(location) {
        setPickedLocation(location)
    }

    function savePlaceHandler() {
        // TODO: Insert the place in the AsyncStorage
        const newPlace = {
            place: place,
            image: selectedImage,
            location: pickedLocation
        }

        navigation.navigate("AllPlaces", {
            place: newPlace
        })
    }

    return (
        <View style={styles.view}>
            <TextInput
                label="Place"
                value={place}
                mode="outlined"
                onChangeText={place => setPlace(place)}
            />
            <ImagePicker onImageChange={imageHandler} />
            <MapPicker onPickChange={pickHandler} />
            <Button
                style={styles.btn}
                buttonColor={Colors.primary700}
                textColor={Colors.white}
                mode="elevated"
                onPress={savePlaceHandler}>
                Add Place
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        marginTop: 16,
        marginHorizontal: 16,
        alignContent: "center",
    },
    btn: {
        marginTop: 32
    }
})

export default AddPlace;
