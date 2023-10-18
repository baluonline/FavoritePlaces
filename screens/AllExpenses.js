import { StyleSheet, Text, View } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";

function AllExpenses() {
  const expensesCtx = useContext(ExpensesContext);
  const allExpenses = expensesCtx.expenses;
  return (
    <View style={style.container}>
      <ExpensesOutput expenses={allExpenses} expensePeriod="Check"
      fallBackText="Expenses are not available"
      />
    </View>
  );
}

export default AllExpenses;

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});
