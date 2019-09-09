import React from 'react';
export default class Header extends React.Component
{
    constructor(props)
    {
        super(props);
        this.getInputName = this.getInputName.bind(this);
        this.validateInputName = this.validateInputName.bind(this);
    }

    // Display error if user input is nothing but spaces
    validateInputName(name)
    {
        const validName = name.length > 0;
        if (!validName)
        {
            const nameField = document.getElementById("nameInput");
            const nameErrorLabel = document.getElementById("userNameValidation");
            nameField.setAttribute("style", "border: 1px solid red; box-shadow: 0 0 10px rgb(255, 0, 0)");
            const nameError = document.createElement("p");
            nameError.innerHTML =" ** Please enter a valid name ** ";
            nameError.setAttribute("style", "color: red");
            nameErrorLabel.appendChild(nameError);
        }

        return name.length > 0;
    }

    // Get user input name
    getInputName(e)  
    {
        e.preventDefault();
        const inputName = e.target.elements.nameInput.value.trim();
        if (this.validateInputName(inputName))
        {
            this.props.getInputName(inputName);
        }
    }

    // Display jumbotron along with name text input 
    render()
    {
        return (
            <div class="jumbotron text-center">
                <h1 class="display-4">Welcome to MyExpense!</h1>
                <p class="lead">A simple CRUD application built with React that allowing users to log their expenses.</p>
                <hr class="my-4"></hr>
                <form onSubmit={this.getInputName}>
                    <div class="form-group">
                        <input class="form-control col-md-4 offset-md-4" type="text" id="nameInput" name="nameInput" placeholder="First Name" required></input>
                        <label id="userNameValidation"></label>
                    </div>
                </form>
            </div>
        );
    }
}
