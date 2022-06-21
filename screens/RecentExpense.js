import { useContext } from "react";
import { Text } from "react-native";
import ExpensesOutPut from "../components/ExpensesOutPut/ExpensesOutPut";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";

function RecentExpense() {
    const expensesCtx = useContext(ExpensesContext);
    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date();
        const date7DayAgo = getDateMinusDays(today, 7);

        return expense.date > date7DayAgo && (expense.date <= today);
    });
    return <ExpensesOutPut expenses={recentExpenses} fallbackText='No Expenses Registered for the last seven days'  expensesPeriod="Last Period 7 days"/>
}

export default RecentExpense;