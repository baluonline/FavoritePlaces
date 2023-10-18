import { TextInput, View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function Input({ label, inValid, style, textInputConfig }) {
  let inputStyles = [styles.input];
  if (textInputConfig && textInputConfig.multiLine) {
    inputStyles.push(styles.inputMultiLine);
  }
  if(inValid){
    inputStyles.push(styles.inValidInputs)
  }

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label]}>
        {label}
      </Text> 
      <TextInput
        style={[inputStyles]}
        {...textInputConfig}
      />
    </View>
  );
}
export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    color: "white",
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: GlobalStyles.colors.primary700,
  },
  inputMultiLine: {
    minHeight: 200,
    textAlignVertical: "top",
  },
  inValidLable: {
    color: GlobalStyles.colors.error500,
  },
  inValidInputs: {
    backgroundColor: GlobalStyles.colors.error50,
  },
});
