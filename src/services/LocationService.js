import * as Location from 'expo-location';

async function getCurrentLocationAsync() {
  await Location.startLocationUpdatesAsync('Missão RS', {
    accuracy: Location.Accuracy.Highest,
    timeInterval: 1000,
    distanceInterval: 0,
    showsBackgroundLocationIndicator: true,
    foregroundService: {
        notificationTitle: "Location Tracking",
        notificationBody: "Tracking your location for routing purposes",
        notificationColor: "#FF0000",
    },
    pausesUpdatesAutomatically: false,
    deferredUpdatesInterval: 1000,
    deferredUpdatesDistance: 0,
    deferredUpdatesTimeout: 1000,
});

  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('Permissão de localização não concedida');
  }

  const location = await Location.getCurrentPositionAsync({});
  return location.coords;
}

export { getCurrentLocationAsync };

