import React from 'react';
import Header from './Header';
import Expenses from './Expenses';
import AddExpense from './AddExpense';
import UpdateExpense from './UpdateExpense';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default class MyExpense extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            userName: '',
            total: 0.00,
            expenses: [],
            currentExpense: null
        }

        this.getInputName = this.getInputName.bind(this);
        this.addExpense = this.addExpense.bind(this);
        this.removeAll = this.removeAll.bind(this);
        this.removeExpense = this.removeExpense.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.updateExpense = this.updateExpense.bind(this);
        this.export = this.export.bind(this);
        this.getExpenseValidation = this.getExpenseValidation.bind(this);
        this.getAmountValidation = this.getAmountValidation.bind(this);
        this.validateExpense = this.validateExpense.bind(this);
        this.validateAmount = this.validateAmount.bind(this);
    }

    getInputName(newName)
    {
        this.setState({userName: newName});
    }

    addExpense(newExpense,amount)
    {
        this.setState({expenses: [...this.state.expenses, newExpense]});
        const newTotal = (parseFloat(this.state.total) + parseFloat(amount)).toFixed(2);

        this.setState({total: newTotal});
    }

    

    removeAll()
    {
        const confirmed = window.confirm("Remove ALL expenses?");
        if(confirmed)
        {
            this.setState({expenses: []});
            this.setState({total: 0});
        }
    }
    toggleEdit(expenseToBeEdited)
    {
        this.setState({currentExpense: expenseToBeEdited});
    }
    updateExpense(modifiedExpense,index, modifiedAmount)
    { 
        if (modifiedAmount && index>=0 && modifiedAmount)
        {
            const newAmount = (parseFloat(modifiedAmount) + parseFloat(this.state.total)).toFixed(2);
            this.setState({total: (newAmount)});
        }
        this.setState({currentExpense: null});
    }

    removeExpense(expenseId, expenseAmount)
    {
        const confirmed = window.confirm("Remove this expense?");
        if(confirmed)
        {
            this.setState({expenses: this.state.expenses.filter(expense => (expense.id.localeCompare(expenseId)) !==0)});
            const newAmount = (parseFloat(this.state.total) - parseFloat(expenseAmount)).toFixed(2);
            this.setState({total: (newAmount)});
        }
    }

    export()
    {
        html2canvas(document.querySelector("#capture")).then(canvas => {
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        const pdf = new jsPDF 
        ({
            orientation: 'landscape',
        });
        const imgProps = pdf.getImageProperties(imgData);
        const width = pdf.internal.pageSize.getWidth();
        const height = (imgProps.height * width) / imgProps.width;
        pdf.addImage(imgData, 'JPG', 0, 0, width, height);
        pdf.save(`${this.state.userName}'s Expenses.pdf`); 
        });
    }

    getExpenseValidation()
    {
        return (document.getElementById("expenseValidation"));
    }

    getAmountValidation()
    {
        return (document.getElementById("amountValidation"));
    }
    
    validateExpense(expense)
    {
        const expenseValidation = this.getExpenseValidation();
        expenseValidation.innerHTML="";
        const expenseInput = document.getElementById("expense");
        const validExpense = expense.length <=30;
        const expenseError = document.createElement("p");
        
        if(!validExpense)
        {
            expenseInput.setAttribute("style", "border: 1px solid red; box-shadow: 0 0 10px rgb(255, 0, 0)");
            expenseError.innerHTML ="** Limit Characters: 30 **";
            expenseError.setAttribute("style", "color:red");
            expenseError.style.textAlign="left";
            expenseValidation.appendChild(expenseError);
        }
        else
        {
            expenseInput.setAttribute("style", "border:default");
        }
        return validExpense;
    }
    validateAmount(amount)
    {
        const amountValidation = this.getAmountValidation();
        amountValidation.innerHTML = "";
        const amountInput = document.getElementById("amount");
        const validAmount = /^[0-9.]+$/.test(amount);
        const amountError = document.createElement("p");
        if (!validAmount)
        {
            amountInput.setAttribute("style", "border: 1px solid red; box-shadow: 0 0 10px rgb(255, 0, 0)");
            amountError.innerHTML ="** Only numbers and decimal are allowed **";
            amountError.setAttribute("style", "color:red");
            amountError.style.textAlign="left";
            amountValidation.appendChild(amountError);
        }
        else
        {
            amountInput.setAttribute("style", "border:default");
        }
        return validAmount;
        
    }

    render()
    {   
        return (
            <div>
                {
                    this.state.userName === '' ?
                    <Header getInputName={this.getInputName}/> :
                    [
                        this.state.currentExpense === null ?
                        [
                            <AddExpense userName={this.state.userName}
                                        addExpense={this.addExpense}
                                        getExpenseValidation={this.getExpenseValidation}
                                        getAmountValidation={this.getAmountValidation}
                                        validateExpense={this.validateExpense}
                                        validateAmount={this.validateAmount}
                            /> ,
                            <Expenses expenses={this.state.expenses}
                                    removeAll={this.removeAll}
                                    removeExpense={this.removeExpense}
                                    toggleEdit={this.toggleEdit}
                                    total={this.state.total}
                                    export={this.export}
                                    userName={this.state.userName}
                            />,
                        ] :
                        
                         <UpdateExpense currentExpense={this.state.currentExpense}
                                        expenses={this.state.expenses}
                                        updateExpense={this.updateExpense}
                                        total={this.state.total}
                                        getExpenseValidation={this.getExpenseValidation}
                                        getAmountValidation={this.getAmountValidation}
                                        validateExpense={this.validateExpense}
                                        validateAmount={this.validateAmount}
                                        />
                    ]
                }
            </div>
        );
    }
}
