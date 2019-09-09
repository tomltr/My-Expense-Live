import React from 'react';
import uuid from "uuid";
export default class AddExpense extends React.Component
{
    constructor(props)
    {
        super(props);
        this.addExpense = this.addExpense.bind(this);
    }

    // add new expense based on click event from the user input
    addExpense(e)
    {
        // Prevent page refresh
        e.preventDefault();

        // Get expense name and amount
        const name = e.target.elements.expense.value;
        let amount = e.target.elements.amount.value;

        // Validate user's input
        const validExpense = this.props.validateExpense(name);
        const validAmount = this.props.validateAmount(amount);    

        // Add newExpense object when both name and amount are valid.
        if(validExpense && validAmount)
        {
            // Get selected type and date created
            const typeElement = document.getElementById("type");
            const selectedType = e.target.elements.type[typeElement.selectedIndex].value;
            amount = parseFloat(amount).toFixed(2);
            const date = new Date().toLocaleDateString().concat(` ${new Date().toLocaleTimeString()}`);

            // Create newExpense object with the created corresponding values.
            const newExpense = 
            {
                id: uuid.v4(),
                name: name,
                type: selectedType,
                amount: amount,
                dateCreated: date,
                setExpense(newExpense)
                {
                    this.name = newExpense;
                },
                setType(newType)
                {
                    this.type = newType;
                },
                setAmount(newAmount)
                {
                    this.amount = newAmount;
                }
            };
            
            // Add newExpense object 
            this.props.addExpense(newExpense, amount);

            // Reset all text input 
            document.getElementById("expenseForm").reset();
        }
    }


    // Render Add Form
    render() 
    {
        return (
            <div class="container">
                <div class="card " id="expenseInput">
                    <div class="card-header text-center">
                        <h1>Track Expenses with Ease </h1>
                    </div>
                            <div class="card-body">
                                <form   id="expenseForm" onSubmit={this.addExpense}>
                                    <div class="form-group">
                                        <input type="text" name="expense" id="expense" class="form-control" placeholder="Expense" required></input>
                                        <label id="expenseValidation"></label>
                                    </div>
                                    <div class="form-group" id="typeInput">
                                        <select class="form-control" name="type" id="type">
                                            <option defaultValue>Entertainment</option>
                                            <option >Food</option>
                                            <option >Hobby</option>
                                            <option >Miscellaneous</option>
                                            <option >Transportation</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <input type="text" name="amount" id="amount" class="form-control" placeholder="0.00" required></input>
                                        <label id="amountValidation"></label>
                                    </div>
                                    <button type="submit" class="btn btn-primary" id="submitExpense">  Add Expense</button>
                                </form>
                        </div>
                </div>
            </div>
        );
    }
}
