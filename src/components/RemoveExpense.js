import React from 'react';

export default class RemoveExpense extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.removeExpense = this.removeExpense.bind(this);
    }

    removeExpense()
    {
       this.props.removeExpense(this.props.expenseId, this.props.expenseAmount);
    }
    render()
    {
        return(
            <td><button class="btn btn-danger" onClick={this.removeExpense}>Delete</button></td>
        );
    }
}