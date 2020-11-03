"use strict";

// Validation


    // manage the errors to be shown to the user


    // email:
        // email syntax (@ , .com)
        // call to db to check if email is available
    
    

    // password:
        // the length of the password
        // if the password and repeat-password match

class Validator {
    constructor() {

        // predetermined error messages
        this.invalidEmailError = 'Enter a valid email address';
        this.emailExistsError = 'The email address is already taken';
        this.passwordError = 'Password must be at least 6 characters long';
        this.repeatPasswordError = 'Password and repeat password must be the same';

        // object with all the current errors to be displayed
        this.errors = {
            invalidEmailError: this.invalidEmailError,
            emailExistsError: this.emailExistsError,
            passwordError: this.passwordError,
            repeatPasswordError: this.repeatPasswordError
        };

    }

    // If email syntax is valid

    validateValidEmail = (email) => {
        // if email syntax valid
        // RegEx object - contains the regex pattern used to test the string valid
        const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

        // emailRegEx.test is used to check if the string fulfills the rules we set
        const emailIsValid = emailRegEx.test(email);

        if (emailIsValid) {
            // Don't show the email error message; remove it from the object
            delete this.errors.invalidEmailError;
        }
        else {
            // if the email is not valid, set the errors to be shown
            this.errors.invalidEmailError = this.invalidEmailError;
        }

    }

    // If email is unique (if it is not taken)
    validateUniqueEmail = (newEmail) => {

        const users = db.getAllUsers();

        let emailUnique = true;

        users.forEach( (userObj) => {
            if (userObj.email === newEmail) { // check email of each user
                emailUnique = false;       // set emailUnique to false if found
            }
        });

        // if email is unique, remove error message

        if (emailUnique) {
            delete this.errors.emailExistsError;
        }
        else {
            // if the email is taken, set the error to be shown
            this.errors.emailExistsError = this.emailExistsError;
        }
    }


    // Validate the password length

    validatePassword = (password) => {

        if ( password.length >= 6 ) {
            // remove the error message
            delete this.errors.passwordError;
        }
        else {
            this.errors.passwordError = this.passwordError;
        }


    }

    // Validate if password and repeat password are matching

    validateRepeatPassword = (password, repeatPassword) => {
        if (password === repeatPassword) {
            // remove the error message
            delete this.errors.repeatPasswordError;
        }
        else {
            // if passwords are not matching, set the error to be shown
            this.errors.repeatPasswordError = this.repeatPasswordError;
        }


    }

    // Get the errors to show them to the user on the Signup page

    getErrors = () => {

        return this.errors;
    }
}


const validator = new Validator();

console.log(validator);