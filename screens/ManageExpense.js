import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { getFormateDate } from "../utility/date";
import { useContext, useLayoutEffect } from "react";
import IconButton from "../UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../UI/Button";
import { ExpensesContext, DUMMY_EXPENSES } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

function ManageExpense({ route, navigation }) {
  const expenseCtx = useContext(ExpensesContext);

  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;

  const selectedExpense = expenseCtx.expenses.find(
    (expense) => expense.id === expenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);
  const expense = DUMMY_EXPENSES.find((expense) => expense.id === expenseId);
  function renderEditExpense() {
    return (
      <View>
        <Text>{expense?.description}</Text>
        <Text>{expense?.amount}</Text>
        <Text>{getFormateDate(expense.date)}</Text>
      </View>
    );
  }
  function onPressDeleteHandler() {
    expenseCtx.deleteExpense(expenseId);
    navigation.goBack();
  }
  function cancelHandler() {
    navigation.goBack();
  }
  function confirmationHandler(expenseData) {
    if (expenseData) {
      if (isEditing) {
        /*       expenseCtx.updateExpense(expenseId, {
        description: "update",
        amount: 24.99,
        date: new Date("2023-10-9"),
      }); */
        expenseCtx.updateExpense(expenseId, expenseData);
      } else {
        /*   expenseCtx.addExpense({
        description: "Test",
        amount: 34.99,
        date: new Date("2023-10-10"),
      }); */
        expenseCtx.addExpense(expenseData);
      }
    } else {
      Alert.alert("Add expense", "No data");
    }
    navigation.goBack();
  }
  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        onSubmit={confirmationHandler}
        isEditing={isEditing}
        defaultValues={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            name="Delete"
            color="#710a0a"
            onPress={onPressDeleteHandler}
          ></IconButton>
        </View>
      )}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },

  deleteContainer: {
    marginTop: 24,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
