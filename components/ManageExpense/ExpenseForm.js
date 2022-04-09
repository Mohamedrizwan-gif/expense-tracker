import { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';

import Input from './Input';
import Button from '../../UI/Button';
import { GlobalStyles } from '../../constants/styles';
import { getFormattedDate } from '../../utils/date';

function ExpenseForm({submitButtonLabel, onCancel, onSubmit, defaultValues}) {
    console.log(defaultValues);
    const [inputs, setInputs] = useState({
        amount: { 
            value: defaultValues ? defaultValues.amount.toString() : '',
            valid: true            
        },
        date: {
            value: defaultValues ? getFormattedDate(defaultValues.date) : '',
            valid: true            
        },
        description: {
            value: defaultValues ? defaultValues.description  : '',
            valid: true           
        }
    });

    const inputChangeHandler = (inputIdentifier, enteredValue) => {
        setInputs((curInputs) => {
            return {
                ...curInputs,
                [inputIdentifier]: { value: enteredValue, valid: true }
            }
        });
    }

    const submitHandler = () => {
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value
        }
        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if(!amountIsValid || !dateIsValid || !descriptionIsValid) {
            Alert.alert('Invalid input', 'Please check your input values');
            setInputs((curInputs) => {
                return {
                    amount: { value: curInputs.amount.value, valid: amountIsValid },
                    date: { value: curInputs.date.value, valid: dateIsValid },
                    description: { value: curInputs.description.value, valid: descriptionIsValid }
                }
            });
            return;
        }
        onSubmit(expenseData);
    }

    const formIsInvalid = !inputs.amount.valid || !inputs.date.valid || !inputs.description.valid;

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input 
                    style={styles.rowInput}
                    label="Amount" 
                    invalid={!inputs.amount.valid}
                    textInputConfig={{
                        keyboardType: 'decimal-pad',
                        onChangeText: inputChangeHandler.bind(this, 'amount'),
                        value: inputs.amount.value
                    }}
                />
                <Input 
                    style={styles.rowInput}
                    label="Date" 
                    invalid={!inputs.date.valid}
                    textInputConfig={{
                        placeholder: 'YYYY-MM-DD',
                        maxLength: 10,
                        onChangeText: inputChangeHandler.bind(this, 'date'),
                        value: inputs.date.value
                    }}
                />
            </View>
            <View>
                <Input 
                    label="Description" 
                    invalid={!inputs.description.valid}
                    textInputConfig={{
                        multiline: true,
                        autoCorrect: false,
                        onChangeText: inputChangeHandler.bind(this, 'description'),
                        value: inputs.description.value
                    }}
                />
            </View>
            {formIsInvalid && <Text style={styles.errorText}>Invalid input values - please check your entered data!</Text>}
            <View style={styles.buttons}>
                <Button 
                    style={styles.button} 
                    mode="flat" 
                    onPress={onCancel}
                >
                    Cancel
                </Button>
                <Button 
                    style={styles.button} 
                    onPress={submitHandler}
                >
                    {submitButtonLabel}
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        marginTop: 40
    },
    title: {
        fontSize: 24,
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
    errorText: {
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        margin: 8
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    }
});

export default ExpenseForm;