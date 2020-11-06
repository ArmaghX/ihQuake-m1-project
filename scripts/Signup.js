"use strict";

class Signup {
    constructor() {
        //store all of the input elements,
        this.nameInput = document.querySelector('#name');
        this.favouriteMapInput = document.querySelector('#fav-map');
        this.emailInput = document.querySelector('#email');
        this.passwordInput = document.querySelector('#password');
        this.repeatPasswordInput = document.querySelector('#repeat-password');

        this.buttonInput = document.querySelector('#signup-button');
        this.errorsWrapper = document.querySelector('.message-container');

    }


    // Handle the email

    handleEmailInput = (event) => {
        const emailInput = event.target;
        const email = emailInput.value;

        // validator 
        validator.validateValidEmail(email);
        validator.validateUniqueEmail(email);

        this.setErrorMessages();

    };

    // handle the password input

    handlePasswordInput = (event) => {
        const passwordInput = event.target;
        const repeatPasswordInput = this.repeatPasswordInput;

        const password = passwordInput.value;
        const repeatPassword = repeatPasswordInput.value;

        // validator
        validator.validatePassword(password);
        validator.validateRepeatPassword(password, repeatPassword);

        this.setErrorMessages();

    };

    // handle the repeat-password input
    // password confirmation

    handleRepeatPasswordInput = (event) => {

        const passwordInput = this.passwordInput;
        const repeatPasswordInput = event.target;

        const password = passwordInput.value;
        const repeatPassword = repeatPasswordInput.value;

        // validator
        validator.validatePassword(password);
        validator.validateRepeatPassword(password, repeatPassword);

        this.setErrorMessages();
    };

    // used to show messages below the Signup form

    setErrorMessages = () => {

        // clear previous messages, so that they don't add up
        this.errorsWrapper.innerHTML = "";

        const errorsObj = validator.getErrors();

        // return an array of object values ( only error strings )
        const errorStringsArr = Object.values( errorsObj );

        
        errorStringsArr.forEach ( (str) => {
            const p = document.createElement('p');
            p.textContent = str;

            this.errorsWrapper.appendChild(p);
        });
    };




    // handle the sending of the data (on submit)

    saveData = (event) => {

        // prevent the default behaviour of the form submit button (which reloads the page)

        event.preventDefault();

        // get the value from all of the inputs
        const name = this.nameInput.value;
        const favMap = this.favouriteMapInput.value;
        const email = this.emailInput.value;
        const password = this.passwordInput.value;

        // create a new user

        const newUser = new User(name, favMap, email, password);


        // Save the user in the database

        db.saveNewUser( newUser );

        // empty the form

        this.nameInput.value = '';
        this.favouriteMapInput.value = '';
        this.emailInput.value = '';
        this.passwordInput.value = '';

        // redirect invoke
        this.redirect();
        
    };

    // redirect to the login page

    redirect = () => {
        setTimeout( function (){
            location.assign('login.html');
        }, 2000)

    }

    // function to add listeners

    addListeners = () => {
        this.emailInput.addEventListener('input', this.handleEmailInput);
        this.passwordInput.addEventListener('input', this.handlePasswordInput);
        this.repeatPasswordInput.addEventListener('input', this.handleRepeatPasswordInput);

        this.buttonInput.addEventListener('click', this.saveData);
    };

}

// create an instance of the Signup (object)
const signup = new Signup();

// Add event listeners once the page and all the resources are loaded
window.addEventListener('load', signup.addListeners);