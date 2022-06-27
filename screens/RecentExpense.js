import { useContext, useEffect, useState } from "react";
import { Text } from "react-native";
import ExpensesOutPut from "../components/ExpensesOutPut/ExpensesOutPut";
import ErrorOverLay from "../components/UI/ErrorOverlay";
import LoadingOverLay from "../components/UI/LoadingOverlay";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";

function RecentExpense() {
    const [isFetching, setIsFetching] = useState(true);
    const expensesCtx = useContext(ExpensesContext);
    const [error, setError] = useState();

    useEffect(() => {
        async function getExpenses() {
           setIsFetching(true);
           try
           {
            const expenses = await fetchExpenses();
            expensesCtx.setExpenses(expenses);
           }
           catch(error) {
            setError('Could not fetch expenses!')
           }
           setIsFetching(false);
        }

        getExpenses();
    }, []);

    function errorHandler() {
        setError(null);
    }
    if (error && !isFetching) {
        return <ErrorOverLay message={error} onConfirm={errorHandler}/>
    }
    if (isFetching) {
        return <LoadingOverLay/>
    }
    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date();
        const date7DayAgo = getDateMinusDays(today, 7);

        return expense.date > date7DayAgo && (expense.date <= today);
    });
    return <ExpensesOutPut expenses={recentExpenses} fallbackText='No Expenses Registered for the last seven days'  expensesPeriod="Last Period 7 days"/>
}

export default RecentExpense;