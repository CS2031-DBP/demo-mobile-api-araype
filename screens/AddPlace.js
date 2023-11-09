import React, { useState } from "react";
import { TextInput, Button, Card, Title, Paragraph } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import ImagePicker from "../components/Camera/ImagePicker";
import MapPicker from "../components/Map/MapPicker";
import { Colors } from "../components/util/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddPlace = ({ navigation }) => {
  const [place, setPlace] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [pickedLocation, setPickedLocation] = useState();

  function imageHandler(imageUri) {
    setSelectedImage(imageUri);
  }

  function pickHandler(location) {
    setPickedLocation(location);
  }

  function savePlaceHandler() {
    // Recuperar lugares existentes de AsyncStorage
    AsyncStorage.getItem("places")
      .then((storedPlaces) => {
        const existingPlaces = storedPlaces ? JSON.parse(storedPlaces) : [];

        // Crear un nuevo lugar
        const newPlace = {
          place: place,
          image: selectedImage,
          location: pickedLocation,
        };

        // Verificar si existingPlaces es un array
        const updatedPlaces = Array.isArray(existingPlaces)
          ? [...existingPlaces, newPlace] // Si es un array, realizar la propagación
          : [newPlace]; // Si no es un array, crear un nuevo array con el nuevo lugar

        // Almacenar la lista actualizada en AsyncStorage
        AsyncStorage.setItem("places", JSON.stringify(updatedPlaces))
          .then(() => {
            console.log("Lugar guardado en AsyncStorage");
            navigation.navigate("AllPlaces", {
              places: updatedPlaces, // Pasar la lista completa de lugares a la pantalla AllPlaces
            });
          })
          .catch((error) => {
            console.error("Error al guardar en AsyncStorage:", error);
          });
      })
      .catch((error) => {
        console.error("Error al recuperar lugares de AsyncStorage:", error);
      });
  }

  return (
    <View style={styles.view}>
      <Card>
        <Card.Content>
          <TextInput
            label="Place"
            value={place}
            mode="outlined"
            onChangeText={(place) => setPlace(place)}
          />
          <ImagePicker onImageChange={imageHandler} />
          <MapPicker onPickChange={pickHandler} />
        </Card.Content>
        <Card.Actions>
          <Button
            style={styles.btn}
            buttonColor={Colors.primary700}
            textColor={Colors.white}
            mode="elevated"
            onPress={savePlaceHandler}
          >
            Add Place
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    marginTop: 16,
    marginHorizontal: 16,
    alignContent: "center",
  },
  btn: {
    marginTop: 32,
  },
});

export default AddPlace;
