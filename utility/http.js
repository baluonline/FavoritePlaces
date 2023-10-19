import axios from "axios";

const BASE_URL = "https://expense-a6653-default-rtdb.firebaseio.com";

export async function storeExpense(expenseData) {
  const response = await axios.post(`${BASE_URL}/expenses.json`, expenseData);
  const id = response.data.name;
  return id;
}

export async function getExpenses() {
  const response = await axios.get(`${BASE_URL}/expenses.json`);
  const expenses = [];
  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: response.data[key].date,
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }

  return expenses;
}

export async function updateExpense(id, expenseData){
  const response = await axios.put(`${BASE_URL}/expenses/${id}.json`, expenseData);
  return response;
}
export async function deleteExpense(id){
  return await axios.put(`${BASE_URL}/expenses/${id}.json`);;
}