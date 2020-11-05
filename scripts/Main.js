"use strict";


// Navigation Button 

const navbar = document.querySelector('#header-navbar');

const navButton = document.querySelector('.nav-toggler-button')


navButton.addEventListener('click', function (){
    navbar.classList.toggle('collapse');
});