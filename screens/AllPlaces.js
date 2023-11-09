import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Card, Title, Paragraph } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

function AllPlaces({ route }) {
  const [places, setPlaces] = useState([]);

  const loadPlaces = async () => {
    try {
      const storedPlaces = await AsyncStorage.getItem('places');
      if (storedPlaces) {
        const parsedPlaces = JSON.parse(storedPlaces);
        setPlaces(parsedPlaces);
      }
    } catch (error) {
      console.error('Error al recuperar lugares de AsyncStorage:', error);
    }
  };

  // useFocusEffect para cargar los lugares
  useFocusEffect(
    React.useCallback(() => {
      loadPlaces();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de lugares favoritos:</Text>
      {Array.isArray(places) &&
        places.map((place, index) => (
          <Card key={index} style={styles.card}>
            <Card.Content>
              <Title>{place.place}</Title>
              <Paragraph>Nombre del lugar: {place.place}</Paragraph>
            </Card.Content>
            <Card.Cover source={{ uri: place.image }} />
          </Card>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  card: {
    marginBottom: 16,
  },
});

export default AllPlaces;
