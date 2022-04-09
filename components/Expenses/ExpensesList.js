import { FlatList } from 'react-native';

import ExpenseItem from './ExpenseItem';

function ExpensesList({expenses}) {
    return (
        <FlatList keyExtractor={item => item.id} data={expenses} renderItem={(itemData) => {
            return <ExpenseItem {...itemData.item}/>
        }}/>
    )
}

export default ExpensesList;