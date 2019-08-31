import React from 'react';

export default class EditExpense extends React.Component
{
    constructor(props)
    {
        super(props);
        this.editExpense = this.editExpense.bind(this);
    }
    editExpense()
    {
         const index = this.props.expenses.find((expense) => expense.id === this.props.expenseId);
         this.props.toggleEdit(index);
    }
    render()
    {
        return (
                <td><button onClick={this.editExpense} class="btn btn-info">Edit</button></td>
        );
    }
}
