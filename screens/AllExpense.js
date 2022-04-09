import { Component } from 'react';

import ExpensesOutput from '../components/Expenses/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';

class AllExpense extends Component {
    static contextType = ExpensesContext;
    
    render() {
        return (
            <ExpensesOutput 
                expenses={this.context.expenses} 
                expensesPeriod={"Total"}
                fallbackText="No registered expenses found"
            />
        )
    }
}

export default AllExpense