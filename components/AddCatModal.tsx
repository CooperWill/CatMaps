import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Modal } from "react-native";

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
  }) => void;
};

export default function AddCatModal({ isVisible, onClose, onAddCat }: Props) {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [sex, setSex] = useState("");
  const [temperament, setTemperament] = useState("");
  const [friendly, setFriendly] = useState("");
  const [age, setAge] = useState("");

  const handleAdd = () => {
    if (name && breed && sex && temperament && friendly && age) {
      onAddCat({
        id: Date.now().toString(),
        name,
        breed,
        sex,
        temperament,
        friendly,
        age: Number(age),
      });
      setName("");
      setBreed("");
      setSex("");
      setTemperament("");
      setFriendly("");
      setAge("");
    }
  };

  return (
    <Modal visible={isVisible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
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
        <View style={styles.buttonContainer}>
          <Button title="Add Cat" onPress={handleAdd} />
          <Button title="Cancel" onPress={onClose} color="red" />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#25292e",
    flex: 1,
    justifyContent: "center",
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
});
