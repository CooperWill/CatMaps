import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AddCatButton from "@/components/AddCatButton";

type CatData = {
    id: string;
    name: string;
    breed: string;
    sex: string;
    temperament: string;
    friendly: string;
    age: number;
};

interface CatListProps {
    data: CatData[];
}

export default function CatList({ data }: CatListProps) {
    const [selectedItem, setSelectedItem] = useState<CatData | null>(null);

    const handlePress = (item: CatData) => {
        setSelectedItem((prev) => (prev?.id === item.id ? null : item));
    };

    return (

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

    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#111111',
        padding: 28,
        marginVertical: 0,
        borderRadius: 0,
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
        borderTopColor: '#fff',
    },
    text: {
        fontSize: 16,
        color: '#fff',
    },
});
