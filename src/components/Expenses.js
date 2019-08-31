import React from 'react';
import Expense from './Expense';

const Expenses = (props) =>
{
    return (
        <div class="container text-center" id="capture">
            <p>{props.expenses.length > 0 ?
            [
                <h3 >{props.userName}'s Expenses</h3>,
                <hr/>,
                    <table class="table table-bordered table-hover">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">Expense</th> 
                                <th scope="col">Type</th> 
                                <th scope="col">Amount</th> 
                                <th scope="col">Date Created</th> 
                                <th scope="col"><button class="btn btn-outline-success" onClick={props.export}>Export</button></th> 
                                <th scope="col"><button class="btn btn-outline-danger" onClick={props.removeAll}>Clear</button></th> 
                            </tr>
                        </thead>
                        <tbody>
                            {props.expenses.map((expense) => 
                            (
                                <Expense key={expense.id}
                                    expenses={props.expenses}
                                    expenseId = {expense.id}
                                    expenseName={expense.name}
                                    expenseType={expense.type}
                                    expenseAmount={expense.amount}
                                    dateCreated={expense.dateCreated}
                                    removeExpense={props.removeExpense}
                                    toggleEdit={props.toggleEdit}
                                 />
                                 
                            ))}
                        </tbody>
                    </table>,
                    <h3>Total: ${props.total}</h3>
            ]
            : ''}</p>            
        </div>
    );
}
export default Expenses;