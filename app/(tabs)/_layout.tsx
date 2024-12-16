import { Tabs } from 'expo-router';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#ffd33d',
                headerStyle: {
                    backgroundColor: '#25292e',
                },
                headerShadowVisible: false,
                headerTintColor: '#fff',
                tabBarStyle: {
                    backgroundColor: '#25292e',
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Cats',
                    tabBarIcon: ({ color, focused }) => (
                        <FontAwesome5 name="cat" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="map"
                options={{
                    title: 'Map',
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialCommunityIcons name={focused ? 'map-marker-star' : 'map-marker-star-outline'} size={24} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
