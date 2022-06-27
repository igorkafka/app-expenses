import { useState } from "react";
import { StyleSheet, View, Text, TextInput, Alert} from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { getFomattedDate } from "../../util/date";
import Button from "../UI/Button";
import Input from "./Input";

function ExpenseForm({submitButtonLabel, onCancel, onSubmit, defaultValues}) {
    const [inputs, setInputs] = useState({
        amount: {value: defaultValues? defaultValues.amount.toString() : '', isValid: true},
        date: {value: defaultValues? getFomattedDate(defaultValues.date): '',isValid: true},
        description: {value: defaultValues? defaultValues.description : '', isValid: true}
    });


    function inputChangedHandler(inputIdentifier ,enteredValue) {
        setInputs((currentInputs) => {
            return{
                ...currentInputs,
                [inputIdentifier]: {value: enteredValue, isValid: true}
            }
        })
    }

    function submitHandler() {
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value

        };

        const amountIsValid = ! isNaN(expenseData.amount > 0) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
            setInputs((curInputs) => {
                return {
                    amount: {value: curInputs.amount.value, isValid: amountIsValid},
                    date: {value: curInputs.date.value, isValid: dateIsValid},
                    description: {value: curInputs.description.value, isValid: descriptionIsValid},
                }
            })
            return;
        }


        onSubmit(expenseData);

    }
    const formIsValid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;

    return <View style={styles.form}>
     <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input style={styles.rowInput} label="Amount" invalid={!inputs.amount.isValid} textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangedHandler.bind(this, 'amount'),
            value: inputs.amount.value
        }} />
        <Input  style={styles.rowInput}  label="Date" invalid={!inputs.date.isValid}  textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, 'date'),
            value: inputs.date.value
        }}/>
     </View>
        <Input label="Description" invalid={!inputs.description.isValid}  textInputConfig={
            {
                multiline: true,
                onChangeText: inputChangedHandler.bind(this, 'description'),
                value: inputs.description.value
            }
        } />
     {formIsValid && <Text style={styles.errorText}>Invalid input valus - please check your values</Text>}
     <View style={styles.buttons}>
        <TextInput/>
        <Button mode='flat' onPress={onCancel} style={styles.button}>Cancel</Button>
        <Button onPress={submitHandler}>{submitButtonLabel}</Button>
    </View>
    </View>
}

export default ExpenseForm;

const styles = StyleSheet.create({
    form: {
        marginTop: 80
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 24,
        textAlign: 'center'
    },
    inputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowInput: {
        flex: 1
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    },
    errorText: {
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        margin: 8
    }
})