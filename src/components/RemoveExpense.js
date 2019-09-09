import React from 'react';

export default class RemoveExpense extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.removeExpense = this.removeExpense.bind(this);
    }

    // Remove expense based on props expenseId and expenseAmount
    removeExpense()
    {
       this.props.removeExpense(this.props.expenseId, this.props.expenseAmount);
    }

    // A delete button
    render()
    {
        return(
            <td><button class="btn btn-danger" onClick={this.removeExpense}>Delete</button></td>
        );
    }
}
