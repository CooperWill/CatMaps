import { StyleSheet, View, Pressable, Text } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

type Props = {
  label: string;
  onPress: () => void;
};

export default function AddCatButton({ label, onPress }: Props) {
  return (
      <Pressable style={styles.buttonContainer} onPress={onPress}>
        <View style={styles.button}>
          <FontAwesome
              name="plus-square-o"
              size={18}
              color="#fff"
              style={styles.buttonIcon}
          />
          <Text style={styles.buttonLabel}>{label}</Text>
        </View>
      </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginHorizontal: 15,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
    borderWidth: 5,
    borderColor: "#ffffff",
    borderRadius: 18,
    backgroundColor: "#717172",
  },
  button: {
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingVertical: 15,
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: "#fff",
    fontSize: 16,
  },
});
