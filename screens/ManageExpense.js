import { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import IconButton from '../UI/IconButton';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/expenses-context';

class ManageExpense extends Component {
    static contextType = ExpensesContext;

    constructor({route, navigation}) {
        super();
        this.navigation = navigation;
        this.editedExpenseId = route.params?.expenseId;
        this.isEditing = !!this.editedExpenseId;
    }

    deleteExpenseHandler() {
        this.context.deleteExpense(this.editedExpenseId);
        this.navigation.goBack();
    }

    cancelHandler() {
        this.navigation.goBack();
    }

    confirmHandler(expenseData) {
        if(this.isEditing) {
            this.context.updateExpense(this.editedExpenseId, expenseData);
        }
        else {
            this.context.addExpense(expenseData);
        }
        this.navigation.goBack();
    }

    componentDidMount() {
        this.selectedExpense = this.context.expenses.find(expense => expense.id === this.editedExpenseId);
        this.navigation.setOptions({
            title: this.isEditing ? 'Edit Expense' : 'Add Expense'
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <ExpenseForm 
                    submitButtonLabel={this.isEditing ? 'Update' : 'Add'} 
                    onCancel={this.cancelHandler.bind(this)}
                    onSubmit={this.confirmHandler.bind(this)}
                    defaultValues={this.selectedExpense}
                />
                {this.isEditing && 
                <View style={styles.deleteContainer}>
                    <IconButton 
                        icon="trash" 
                        color={GlobalStyles.colors.error500} 
                        size={36} 
                        onPress={this.deleteExpenseHandler.bind(this)}
                    />
                </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary500
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    }
});

export default ManageExpense;