import { StyleSheet } from 'react-native';
import AddPlace from './screens/AddPlace';
import { Colors } from './components/util/Colors'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MapSelector from './components/Map/MapSelector';
import { IconButton } from 'react-native-paper';
import AllPlaces from './screens/AllPlaces';

const Stack = createNativeStackNavigator();

function AuthenticatedStack() {
  return (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: Colors.primary500 },
      headerTintColor: Colors.white,
      contentStyle: { backgroundColor: Colors.white },
    }}
    >
    <Stack.Screen
      name="AllPlaces"
      component={AllPlaces}
      options={({ navigation }) => ({
        title: 'Favs Places',
        headerRight: () => (
          <IconButton
            icon="map-marker-plus"
            size={24}
            iconColor={Colors.white}
            onPress={() => navigation.navigate('AddPlace')}
          />
        ),
      })}
    />
    <Stack.Screen
      name="AddPlace"
      component={AddPlace}
      options={{
        title: 'Add a new place',
      }}
    />
    <Stack.Screen name="Map" component={MapSelector} />
  </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <AuthenticatedStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
