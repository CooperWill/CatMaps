import React, {useEffect, useState} from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import data from '../../components/catdata.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

type CatData = {
    id: string;
    name: string;
    breed: string;
    sex: string;
    temperament: string;
    friendly: string;
    age: number
    image?: string;
};

export default function Index() {
    const [selectedItem, setSelectedItem] = useState<CatData | null>(null);
    const [cats, setCats] = useState<CatData[]>(data);

    //For a new cat
    const [newCat, setNewCat] = useState<CatData>({
        id: '',
        name: '',
        breed: '',
        sex: '',
        temperament: '',
        friendly: '',
        age: 0,
        image: ''
    });

    useEffect(() => {
        const loadCats = async () => {
            try {
                const storedCats = await AsyncStorage.getItem('cats');
                if (storedCats) {
                    setCats(JSON.parse(storedCats));
                }
            } catch (error) {
                console.error('Error loading cats:', error);
            }
        };
        loadCats();
    }, []);



    const handlePress = (item: CatData) => {
        if (selectedItem?.id === item.id) {
            setSelectedItem(null);
        } else {
            setSelectedItem(item);
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.item} onPress={() => handlePress(item)}>

                        <Text style={styles.title}>{item.name}</Text>
                        {selectedItem?.id === item.id && (
                            <View style={styles.details}>
                                <Text style={styles.text}>Breed: {item.breed}</Text>
                                <Text style={styles.text}>Sex: {item.sex}</Text>
                                <Text style={styles.text}>Temperament: {item.temperament}</Text>
                                <Text style={styles.text}>Friendly: {item.friendly}</Text>
                                <Text style={styles.text}>Age: {item.age}</Text>

                            </View>
                        )}
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,
        backgroundColor: '#25292e',
    },
    item: {
        backgroundColor: '#111111',
        padding: 22,
        marginVertical: 0,
        borderRadius: 0,
        shadowColor: '#fff',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    details: {
        marginTop: 10,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#FFF',
    },
    text: {
        fontSize: 16,
        color: '#FFFFFF',
    },
});