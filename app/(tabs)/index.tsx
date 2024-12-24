import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import CatList from "../../components/CatList";
import data from "../../components/catdata.json";
import AddCatButton from "@/components/AddCatButton";
import AddCatModal from "@/components/AddCatModal";

export default function Index() {
  const [cats, setCats] = useState(data);
  //const [showAddCat, setShowAddCat] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAddCat = (newCat: (typeof cats)[0]) => {
    setCats((prevCats) => [...prevCats, newCat]);
    setIsModalVisible(false);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <AddCatButton onPress={() => setIsModalVisible(true)} label={"Add Cat"} />
      <CatList data={cats} />
      <AddCatModal
        isVisible={isModalVisible}
        onClose={onModalClose}
        onAddCat={handleAddCat}
      ></AddCatModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  }
});
