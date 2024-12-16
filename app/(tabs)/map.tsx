import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

// Define the state type for location as either LocationObject or null
const MapScreen = () => {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            // Get the current location
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    if (errorMsg) {
        return <Text>{errorMsg}</Text>;
    }

    return (
        <View style={{ flex: 1 }}>
            {location ? (
                <MapView
                    style={{ flex: 1 }}
                    initialRegion={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        }}
                        title="You are here"
                    />
                </MapView>
            ) : (
                <Text>Loading...</Text>
            )}
        </View>
    );
};

export default MapScreen;
