import React, {useEffect, useState} from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type CatData = {
  id: string;
  name: string;
  breed: string;
  sex: string;
  temperament: string;
  friendly: string;
  age: number;
  photo?: string;
};

interface CatListProps {
  data: CatData[];
}

export default function CatList({ data }: CatListProps) {
  const [cats, setCats] = useState<CatData[]>(data);
  const [selectedItem, setSelectedItem] = useState<CatData | null>(null);

  useEffect(() => {
    const loadCats = async () => {
      try{
        const storedCats = await AsyncStorage.getItem("cats");
        if(storedCats){
          setCats(JSON.parse(storedCats));
        }
      } catch (error) {
        console.log("Failed to load stored cats: ", error);
      }
    };
    loadCats();
  }, []);

  const handleAddCat = async (newCat: CatData) => {
    const updatedCats = [...cats, newCat];
    setCats(updatedCats);
    try {
      await AsyncStorage.setItem("cats", JSON.stringify(updatedCats));
    } catch (error) {
      console.log("Failed to store cats: ", error);
    }
  };

  const handlePress = (item: CatData) => {
    setSelectedItem((prev) => (prev?.id === item.id ? null : item));
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          accessible={true}
          accessibilityLabel={`Select ${item.name}`}
          style={[
            styles.item,
            {
              backgroundColor: index % 2 === 0 ? "#111111" : "#333333",
              borderColor: index % 2 === 0 ? "#333333" : "#111111",
            },
          ]}
          onPress={() => handlePress(item)}
        >
          <View style={styles.itemContent}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.name}</Text>
              {selectedItem?.id === item.id && (
                <View style={styles.details}>
                  <Text style={styles.text}>Breed: {item.breed}</Text>
                  <Text style={styles.text}>Sex: {item.sex}</Text>
                  <Text style={styles.text}>
                    Temperament: {item.temperament}
                  </Text>
                  <Text style={styles.text}>Friendly: {item.friendly}</Text>
                  <Text style={styles.text}>Age: {item.age}</Text>
                </View>
              )}
            </View>
            {item.photo && (
              <Image
                source={{ uri: item.photo }}
                style={styles.photo}
                resizeMode="cover"
              />
            )}
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#111111",
    padding: 28,
    marginVertical: 3,
    borderRadius: 8,
    borderColor: "#111",
    borderWidth: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  itemContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  details: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#fff",
  },
  text: {
    fontSize: 16,
    color: "#fff",
  },
  photo: {
    width: 75,
    height: 75,
    borderRadius: 25,
    marginLeft: 10,
  },
});
