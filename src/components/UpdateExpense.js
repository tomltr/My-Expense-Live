import React from 'react';

export default class UpdateExpense extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.updateExpense = this.updateExpense.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    updateExpense(e)
    {
        e.preventDefault()
        const index = this.props.expenses.findIndex((expense) => expense.id === this.props.currentExpense.id );
        let expense = e.target.elements.expense.value;
        let amount = e.target.elements.amount.value;
        if(expense === '')
        {
            expense = this.props.currentExpense.name;
        }
        if(amount === '')
        {
            amount = this.props.currentExpense.amount;
        }
        const validExpense = this.props.validateExpense(expense);
        const validAmount = this.props.validateAmount(amount);

        if(validExpense && validAmount)
        {
            const type = e.target.elements.type.value;
            amount = parseFloat(amount).toFixed(2);
            this.props.currentExpense.setExpense(expense);
            this.props.currentExpense.setType(type);
            const modifiedAmount = (amount - parseFloat(this.props.expenses[index].amount)).toFixed(2);
            this.props.currentExpense.setAmount(amount);
            this.props.updateExpense(this.props.currentExpense, index, modifiedAmount);
        }
    }

    cancel(e)
    {
        e.preventDefault();
        this.props.updateExpense(null,null,null);
    }

    render()
    {
        return (
            <div class="container">
                <div class="card text-center" id="expenseInput">
                    <div class="card-body">
                        <form id="expenseForm" onSubmit={this.updateExpense}>
                            <div class="form-group">
                                <input type="text" name="expense" id="expense" class="form-control" placeholder={this.props.currentExpense.name} ></input>
                                <label id="expenseValidation"></label>
                            </div>
                            <div class="form-group">
                                <select class="form-control" name="type" id="typeInput" required>
                                        <option selected disabled hidden value=''></option>
                                        <option value="Entertainment">Entertainment</option>
                                        <option value="Food">Food</option>
                                        <option value="Hobby">Hobby</option>
                                        <option value="Mischellaneous">Miscellaneous</option>
                                        <option value="Transportation">Transportation</option>
                                    </select>
                            </div>
                            <div class="form-group">
                                <input type="text" name="amount" id="amount" class="form-control" placeholder={this.props.currentExpense.amount} r></input>
                                <label id="amountValidation"></label>
                            </div>
                            <button type="submit" class="btn btn-success btn-lg btn-block" id="submitExpense">Update</button>
                            <button class="btn btn-outline-secondary btn-lg btn-block" onClick={this.cancel}>Cancel</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}