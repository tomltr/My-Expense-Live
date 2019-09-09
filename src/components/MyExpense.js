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

    // Set state's userName to newName 
    getInputName(newName)
    {
        this.setState({userName: newName});
    }

    // Add newExpense to state's expenses list and add its amount to the state's total.
    addExpense(newExpense,amount)
    {
        this.setState({expenses: [...this.state.expenses, newExpense]});
        const newTotal = (parseFloat(this.state.total) + parseFloat(amount)).toFixed(2);
        this.setState({total: newTotal});
    }

    // Remove all expenses from the state's expenses list and set state's total to zero.
    removeAll()
    {
        const confirmed = window.confirm("Remove ALL expenses?");
        if(confirmed)
        {
            this.setState({expenses: []});
            this.setState({total: 0});
        }
    }

    // Set state's currentExpense to expenseToBeEdited
    toggleEdit(expenseToBeEdited)
    {
        this.setState({currentExpense: expenseToBeEdited});
    }

    /*
        Check valid expense index and only add new amount to total if it valid.
        Set state's currentExpense to null to cancel edit.
    */ 
    updateExpense(index, modifiedAmount)
    { 
        if (index !== null && modifiedAmount !== null)
        {
            console.log('Update expense');
            const newAmount = (parseFloat(modifiedAmount) + parseFloat(this.state.total)).toFixed(2);
            this.setState({total: (newAmount)});
        }
        this.setState({currentExpense: null});
    }

    /*
        Delete expense based on expenseId 
        Subtract the expense amount from the total
    */
    removeExpense(expenseId, expenseAmount)
    {
        const confirmed = window.confirm("Remove this expense?");
        if(confirmed)
        {
            this.setState({expenses: this.state.expenses.filter(expense => (expense.id.localeCompare(expenseId)) !== 0)});
            const newAmount = (parseFloat(this.state.total) - parseFloat(expenseAmount)).toFixed(2);
            this.setState({total: (newAmount)});
        }
    }

    // Export user's expenses to a pdf file
    /*
        Note: Multipage output does not work. Only Singlepage output.
        Approximately less than 10 expenses will be displayed correctly.
    */
    export()
    {
        html2canvas(document.querySelector("#capture")).then(canvas => 
        {
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

    // Get expense validation element
    getExpenseValidation()
    {
        return (document.getElementById("expenseValidation"));
    }

    // Get amount validation element
    getAmountValidation()
    {
        return (document.getElementById("amountValidation"));
    }
    
    // Validate expense input
    validateExpense(expense)
    {
        /*
            Get expenseValidation label and set it default value to blank
            Check if expense input length is equal or less than 30.
        */
        const expenseValidation = this.getExpenseValidation();
        expenseValidation.innerHTML="";
        const expenseInput = document.getElementById("expense");
        const validExpense = expense.length <=30;
        
        // Display error for invalid expense input
        if(!validExpense)
        {
            const expenseError = document.createElement("p");
            expenseInput.setAttribute("style", "border: 1px solid red; box-shadow: 0 0 10px rgb(255, 0, 0)");
            expenseError.innerHTML ="** Limit Characters: 30 **";
            expenseError.setAttribute("style", "color:red");
            expenseError.style.textAlign="left";
            expenseValidation.appendChild(expenseError);
        }

        // Display default/valid expense input
        else
        {
            expenseInput.setAttribute("style", "border:default");
        }
        
        // Return valid or invalid expense input
        return validExpense;
    }

    // Validate amount input
    validateAmount(amount)
    {
        /*
            Get amountValidation label and set it to default value to blank
            Check if amount input contains only numbers and decimal.
        */
        const amountValidation = this.getAmountValidation();
        amountValidation.innerHTML = "";
        const amountInput = document.getElementById("amount");
        const validAmount = /^[0-9.]+$/.test(amount);
        const amountError = document.createElement("p");

        // Display error for invalid amount input
        if (!validAmount)
        {
            amountInput.setAttribute("style", "border: 1px solid red; box-shadow: 0 0 10px rgb(255, 0, 0)");
            amountError.innerHTML ="** Only numbers and decimal are allowed **";
            amountError.setAttribute("style", "color:red");
            amountError.style.textAlign="left";
            amountValidation.appendChild(amountError);
        }

        // Display default/valid amount input
        else
        {
            amountInput.setAttribute("style", "border:default");
        }

        // Return valid or invalid amount input
        return validAmount;
        
    }

    // Display MyExpense component based on its state's username and currentExpense
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
                            <AddExpense 
                                        addExpense={this.addExpense}
                                        validateExpense={this.validateExpense}
                                        validateAmount={this.validateAmount}
                            /> ,
                            <Expenses   expenses={this.state.expenses}
                                        removeAll={this.removeAll}
                                        removeExpense={this.removeExpense}
                                        toggleEdit={this.toggleEdit}
                                        total={this.state.total}
                                        export={this.export}
                                        userName={this.state.userName}
                            />,
                        ] :
                        
                        <UpdateExpense  currentExpense={this.state.currentExpense}
                                        expenses={this.state.expenses}
                                        updateExpense={this.updateExpense}
                                        validateExpense={this.validateExpense}
                                        validateAmount={this.validateAmount}
                        />
                    ]
                }
            </div>
        );
    }
}
