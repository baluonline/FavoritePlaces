import { useContext, useState } from "react";
import { Text } from "react-native";
import { ExpensesContext } from "../store/expenses-context";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { getDateMinusDays, getFormateDate } from "../utility/date";
import { useEffect } from "react";
import { getExpenses } from "../utility/http";
import LoadingOverlay from "../UI/LoadingOverlay";
import ErrorOverlay from "../UI/ErrorOverlay";

function RecentExpenses() {
  const expenseCtx = useContext(ExpensesContext);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError]= useState();

  // const [fetchedExpenses, setFetchedExpenses] = useState([]);

  useEffect(() => {
    async function fetchedExpenses() {
      setIsFetching(true);
      try {
        const expenses = await getExpenses();
        expenseCtx.setExpenses(expenses);
        
      } catch (error) {
        setError("Could not fetch expenses ")
      }
      setIsFetching(false);
      // setFetchedExpenses(expenses);
    }
    fetchedExpenses();
  }, []);

  function onErrorHandler(){
    setError(null);
  }
  if(isFetching){
    return <LoadingOverlay />
  }
  if(error && !isFetching){
    return <ErrorOverlay message={error} onConfirm={onErrorHandler} />
  }

  const recentExpenses = expenseCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7daysAgo = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 7
    );
    const expenseDate = new Date(expense.date);
    return expenseDate >= date7daysAgo && expenseDate <= today;
    // return expense
  });
  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensePeriod="Last 7 days"
      fallBackText="No recent expenses"
    />
  );
}
export default RecentExpenses;
