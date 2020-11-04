"use strict";


class Login {
    constructor() {
        this.emailInput = document.querySelector('#email');
        this.passwordInput = document.querySelector('#password');
        this.messageContainer = document.querySelector('.message-container');
        this.loginButton = document.querySelector('#login-button');
    }

    // handle the login (on submit)

    handleSubmit = (event) => {

        //prevent the reload of the page
        event.preventDefault();

        // get the values from the inputs

            // email
            const email = this.emailInput.value;

            // password
            const password = this.passwordInput.value;

        // get the users from db (localStorage)

            const users = db.getAllUsers();

        // check the password and email exists in the db (localStorage)
        // arr.find() - returns the first element that matches the expression

        const user = users.find( function(userObj) {
            if (userObj.email === email && userObj.password === password){
                return true;
            }
        })

        // empty the container so that the messages don't add up
        
        this.messageContainer.innerHTML = "";
        const p = document.createElement('p');

        // set the message

        if (!user) {
            p.textContent = 'Email or Password are incorrect!';
            //this.messageContainer.appendChild(p);
        }
        else {
            p.textContent = `Hello ${user.name}`;
            p.classList.add('correct-message');
            // Redirect to the dashboard page
            this.redirect();
        }

        this.messageContainer.appendChild(p);

    }

    redirect = () => {
        setTimeout( function () {
            location.assign('../dashboard.html');
        }, 2000)

    }
}


const login = new Login();

window.addEventListener('load', function() {

    login.loginButton.addEventListener('click', login.handleSubmit);

})