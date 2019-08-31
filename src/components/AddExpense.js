import React from 'react';
import uuid from "uuid";
export default class AddExpense extends React.Component
{
    constructor(props)
    {
        super(props);
        this.addExpense = this.addExpense.bind(this);
    }
    addExpense(e)
    {
        e.preventDefault();
        const name = e.target.elements.expense.value;
        let amount = e.target.elements.amount.value;
        const validExpense = this.props.validateExpense(name);
        const validAmount = this.props.validateAmount(amount);    
        if(validExpense && validAmount)
        {
            const typeElement = document.getElementById("type");
            const selectedType = e.target.elements.type[typeElement.selectedIndex].value;
            amount = parseFloat(amount).toFixed(2);
            const date = new Date().toLocaleDateString().concat(` ${new Date().toLocaleTimeString()}`);
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
            
            this.props.addExpense(newExpense, amount);
            document.getElementById("expenseForm").reset();
        }
    }
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
                                            <option selected>Entertainment</option>
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