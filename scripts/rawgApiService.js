"use strict";


const gameList = document.querySelector('.list');

// Make a request to the server (API) using the URL

fetch('https://api.rawg.io/api/games/54491?key=614dbd57a1fb4e5398b41255389364ec')
    .then( (response) => {

        // converts the response.body to a JS object
        return response.json();

        })
    .then( (data) => {
        console.log(data);

        const article = document.createElement('article');
        article.innerHTML = `
        <img src="https://media.rawg.io/media/screenshots/f1f/f1f418ba6c1c5d6e83e21b511b65b6d6.jpg" />
        <h2>${data.name}</h2>
        ${data.description}
        `

        gameList.appendChild(article);
    });