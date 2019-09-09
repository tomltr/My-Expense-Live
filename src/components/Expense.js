import React from 'react';
import RemoveExpense from './RemoveExpense';
import EditExpense from './EditExpense';


// A single expense row contains its info along with EditExpense and RemoveExpense Component
const Expense = (props) =>
{
   return (
        <tr>
            <td>{props.expenseName}</td>
            <td>{props.expenseType}</td>
            <td>${props.expenseAmount}</td>
            <td>{props.dateCreated}</td>

        <EditExpense    expenses={props.expenses}
                        toggleEdit={props.toggleEdit}
                        expenseId={props.expenseId}/>

        <RemoveExpense  expenseId={props.expenseId}
                        expenseAmount={props.expenseAmount}
                        removeExpense={props.removeExpense}/>
        </tr>
   ); 
}

export default Expense;
