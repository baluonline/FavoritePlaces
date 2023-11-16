import { Pressable, StyleSheet, Text } from "react-native";
import Colors from "..//Constants/Colors";

function OutlinedButton({ iconText, children, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Text style={styles.icon} color={Colors.primary500}>
        {iconText}
      </Text>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

export default OutlinedButton;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    margin: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.primary500,
  },
  pressed: {
    opacity: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  text: {
    color: Colors.primary500,
  },
});
