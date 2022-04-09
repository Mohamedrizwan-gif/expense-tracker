import { Component } from 'react';

import ExpensesOutput from '../components/Expenses/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../utils/date';

class RecentExpense extends Component {
    static contextType = ExpensesContext;
    constructor() {
        super();
    }

    componentDidMount() {
        this.recentExpenses = this.context.expenses.filter(expense => {
            const today = new Date();
            const date7DaysAgo = getDateMinusDays(today, 7);
            return (expense.date >= date7DaysAgo) && (expense.date <= today);
        });   
    }

    render() {
        return (
            <ExpensesOutput 
                expenses={this.recentExpenses} 
                expensesPeriod={"Last 7 days"}
                fallbackText="No expenses registered for the last 7 days"
            />
        )
    }
}

export default RecentExpense;