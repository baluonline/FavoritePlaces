import { FlatList, Text, View } from "react-native";
import ExpenseItem from "./ExpenseItem";

function ExpensesList({ expenses }) {
  function renderExpense(itemData) {
    // const item = itemData.item;
    return <ExpenseItem {...itemData.item} />;
  }
  return (
    <FlatList
      data={expenses}
      keyExtractor={(item) => item.id}
      renderItem={renderExpense}
    />
  );
}

export default ExpensesList;
