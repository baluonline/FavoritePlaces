import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { getFormateDate } from "../utility/date";
import { useContext, useLayoutEffect, useState } from "react";
import IconButton from "../UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../UI/Button";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../utility/http";
import LoadingOverlay from "../UI/LoadingOverlay";
import ErrorOverlay from "../UI/ErrorOverlay";

function ManageExpense({ route, navigation }) {
  const expenseCtx = useContext(ExpensesContext);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

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
  const expense = expenseCtx.expenses.find(
    (expense) => expense.id === expenseId
  );
  function renderEditExpense() {
    return (
      <View>
        <Text>{expense?.description}</Text>
        <Text>{expense?.amount}</Text>
        <Text>{getFormateDate(expense.date)}</Text>
      </View>
    );
  }
  async function onPressDeleteHandler() {
    setIsFetching(true);
    try {
      expenseCtx.deleteExpense(expenseId);
      deleteExpense(expenseId);
    } catch (error) {
      setError("Delete is failed, Please try again later");
    }
    // setIsFetching(false);  no need here, because we are navigating to anoth screen
    navigation.goBack();
  }
  function cancelHandler() {
    navigation.goBack();
  }
  async function confirmationHandler(expenseData) {
    setIsFetching(true);
    if (expenseData) {
      try {
        if (isEditing) {
          /*       expenseCtx.updateExpense(expenseId, {
        description: "update",
        amount: 24.99,
        date: new Date("2023-10-9"),
      }); */
          expenseCtx.updateExpense(expenseId, expenseData);
          await updateExpense(expenseId, expenseData);
        } else {
          // with dummay data
          /*   expenseCtx.addExpense({
        description: "Test",
        amount: 34.99,
        date: new Date("2023-10-10"),
      }); */
          //for local changes
          const id = await storeExpense(expenseData);
          expenseCtx.addExpense({ ...expenseData, id: id });
        }
      } catch (error) {
        setError("Failed to updated/add");
      }
    } else {
      Alert.alert("Add expense", "No data");
    }

    setIsFetching(false);
    navigation.goBack();
  }

  function onErrorHandler() {
    setError(null);
  }
  if (isFetching) {
    return <LoadingOverlay />;
  }
  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={onErrorHandler} />;
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
