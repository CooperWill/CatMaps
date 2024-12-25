import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Modal,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
  isVisible: boolean;
  onClose: () => void;
  onAddCat: (cat: {
    id: string;
    name: string;
    breed: string;
    sex: string;
    temperament: string;
    friendly: string;
    age: number;
    photo?: string;
  }) => void;
};

export default function AddCatModal({ isVisible, onClose, onAddCat }: Props) {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [sex, setSex] = useState("");
  const [temperament, setTemperament] = useState("");
  const [friendly, setFriendly] = useState("");
  const [age, setAge] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);

  const handleSelectPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "Please allow access to photos");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handleAdd = async () => {
    if (name && breed && sex && temperament && friendly && age) {
      const newCat = {
        id: Date.now().toString(),
        name,
        breed,
        sex,
        temperament,
        friendly,
        age: Number(age),
        photo: photo || "",
      };

      try {
        const storedCats = await AsyncStorage.getItem("cats");
        const cats = storedCats ? JSON.parse(storedCats) : [];
        const updatedCats = [...cats, newCat];

        await AsyncStorage.setItem("cats", JSON.stringify(updatedCats));
        onAddCat(newCat);
        onClose();
      } catch (error) {
        console.log("Failed to store new cat: ", error);
      }
    } else {
      Alert.alert("Invalid cat details", "Please provide valid cat details");
    }
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      onRequestClose={onClose}
      transparent={true}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.buttonContainer}>
            <Button title="Add Cat" onPress={handleAdd} />
            <Button title="Cancel" onPress={onClose} color="red" />
          </View>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter cat's name"
          />
          <Text style={styles.label}>Breed:</Text>
          <TextInput
            style={styles.input}
            value={breed}
            onChangeText={setBreed}
            placeholder="Enter cat's breed"
          />
          <Text style={styles.label}>Sex:</Text>
          <TextInput
            style={styles.input}
            value={sex}
            onChangeText={setSex}
            placeholder="Enter cat's sex"
          />
          <Text style={styles.label}>Temperament:</Text>
          <TextInput
            style={styles.input}
            value={temperament}
            onChangeText={setTemperament}
            placeholder="Enter cat's temperament"
          />
          <Text style={styles.label}>Friendly:</Text>
          <TextInput
            style={styles.input}
            value={friendly}
            onChangeText={setFriendly}
            placeholder="Friendly (yes/no)"
          />
          <Text style={styles.label}>Age:</Text>
          <TextInput
            style={styles.input}
            value={age}
            onChangeText={setAge}
            placeholder="Enter cat's age"
            keyboardType="numeric"
          />
          <Button title="Select Photo" onPress={handleSelectPhoto} />
          {photo && (
            <Image
              source={{ uri: photo }}
              style={styles.photo}
              resizeMode="cover"
            />
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    width: "80%",
    padding: 16,
    backgroundColor: "#25292e",
    borderRadius: 8,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    color: "#fff",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  photo: {
    width: 100,
    height: 100,
    marginTop: 16,
    borderRadius: 8,
    alignSelf: "center",
  },
});
