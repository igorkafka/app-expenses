import { useContext, useLayoutEffect, useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import Button from "../components/UI/Button";
import ErrorOverLay from "../components/UI/ErrorOverlay";
import IconButton from "../components/UI/IconButton";
import LoadingOverLay from "../components/UI/LoadingOverlay";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import { deleteExpense, storeExpense, updateExpense } from "../util/http";

function ManageExpense({route, navigation}) {
    const [error, setError] = useState();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const expensesCtx = useContext(ExpensesContext);
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    const selectedExpense = expensesCtx.expenses.find(expense => expense.id === editedExpenseId);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense' 
        });
    }, [navigation, isEditing])

    async function deleteExpenseHandler() {
        setIsSubmitting(true);
        try {
            await deleteExpense(editedExpenseId)
            expensesCtx.deleteExpense(editedExpenseId)
            navigation.goBack();
        } catch(error) {
            setError('Could not delete expense - please try again later')
            setIsSubmitting(false);
        }
     
    }

    function cancelHandler() {
        navigation.goBack();
    }

    function errorHandler() {
        setError(null);
    }
    if (error && !isSubmitting) {
        return <ErrorOverLay message={error} onConfirm={errorHandler}/>
    }

    async function confirmHandler(expenseData) {
        setIsSubmitting(true);
        try {
        if (isEditing) {
            await updateExpense(editedExpenseId, expenseData);
            expensesCtx.updateExpense(editedExpenseId, expenseData);
        } else {
            const id = await storeExpense(expenseData);
            expensesCtx.addExpense({...expenseData, id: id});
        }
        
        navigation.goBack()
    }
    catch(error) {
        setError('Could not save data - please try again later');
        setIsSubmitting(false);
    }
    }
    if (isSubmitting) {
        return <LoadingOverLay/>
    }
    return <View style={styles.container}>
    <ExpenseForm submitButtonLabel={isEditing ? 'Update' : 'Add'} onCancel={cancelHandler} onSubmit={confirmHandler} defaultValues ={selectedExpense}/>

        {isEditing && (<View style={styles.deleteContainer}>
        <IconButton icon={'trash'} color={GlobalStyles.colors.error500} size={36} onPress={deleteExpenseHandler}/>
        </View>)
        }
    </View>
}

export default ManageExpense;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800
    },
    deleteContainer:{
        marginTop: 16,
        paddingtop: 8,
        borderTopWith: 2,
        marginHorizontal: 150,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItem: 'center'
    }
})