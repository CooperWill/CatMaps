import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import CatList from "../../components/CatList";
import AddCat from "../../components/AddCat";
import data from "../../components/catdata.json";

export default function Index() {
  const [cats, setCats] = useState(data);

  const handleAddCat = (newCat: (typeof cats)[0]) => {
    setCats((prevCats) => [...prevCats, newCat]);
  };

  return (
    <View style={styles.container}>
      <AddCat onAddCat={handleAddCat} />
      <CatList data={cats} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
  },
});
