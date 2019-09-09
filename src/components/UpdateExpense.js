import React from 'react';

export default class UpdateExpense extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.updateExpense = this.updateExpense.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    // Update expense based on user input 
    updateExpense(e)
    {
        // Prevent page refresh
        e.preventDefault()

        // Find index from the currentExpense id
        const index = this.props.expenses.findIndex((expense) => expense.id === this.props.currentExpense.id);

        // Get expense and amount input
        let expense = e.target.elements.expense.value;
        let amount = e.target.elements.amount.value;

        // Default expense if left blank
        if(expense === '')
        {
            expense = this.props.currentExpense.name;
        }

        // Default amount if left blank
        if(amount === '')
        {
            amount = this.props.currentExpense.amount;
        }

        // Validate expense and amount
        const validExpense = this.props.validateExpense(expense);
        const validAmount = this.props.validateAmount(amount);

        // If valid inputs then update them accordingly
        if(validExpense && validAmount)
        {
            const type = e.target.elements.type.value;
            amount = parseFloat(amount).toFixed(2);
            this.props.currentExpense.setExpense(expense);
            this.props.currentExpense.setType(type);
            const modifiedAmount = (amount - parseFloat(this.props.expenses[index].amount)).toFixed(2);
            this.props.currentExpense.setAmount(amount);
            this.props.updateExpense(index, modifiedAmount);
        }
    }

    // Cancel and brings the user back to add page 
    cancel(e)
    {
        e.preventDefault();
        this.props.updateExpense(null,null);
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
