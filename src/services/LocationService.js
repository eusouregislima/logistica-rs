import * as Location from 'expo-location';

async function getCurrentLocationAsync() {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('Permissão de localização não concedida');
  }

  await Location.requestBackgroundPermissionsAsync();
  const location = await Location.getCurrentPositionAsync({});
  return location.coords;
}

export { getCurrentLocationAsync };

