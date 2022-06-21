import { useContext } from "react";
import { Text } from "react-native";
import ExpensesOutPut from "../components/ExpensesOutPut/ExpensesOutPut";
import { ExpensesContext } from "../store/expenses-context";

function AllExpenses() {
    const expensesCtx = useContext(ExpensesContext);


    return <ExpensesOutPut expenses={expensesCtx.expenses} fallbackText='no registered expenses founded' expensesPeriod="Total"/>
}

export default AllExpenses;