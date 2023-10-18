import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { getFormateDate } from "../../utility/date";
import { useNavigation } from "@react-navigation/native";

function ExpenseItem({ id, description, date, amount }) {
  const navigation = useNavigation();
  function expensePressHandler() {
    navigation.navigate("ManageExpenses", {
      expenseId: id,
    });
  }
  // const formatedDate = getFormateDate(date);
  // console.log(formatedDate);
  return (
    <Pressable
      onPress={expensePressHandler}
      style={({ pressed }) => pressed && styles.pressed}
      android_ripple={{ color: "grey" }}
    >
      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {description}
          </Text>
          <Text style={[styles.textBase]}>date</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={[styles.textBase, styles.amount]}>
            {amount.toFixed(2)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

export default ExpenseItem;

const styles = StyleSheet.create({
  pressed: { opacity: 0.75 },
  expenseItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 5,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  description: {
    fontSize: 15,
    marginBottom: 4,
    fontWeight: "bold",
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    minWidth: 80,
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
  },
});