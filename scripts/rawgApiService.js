"use strict";


const gameInfo = document.querySelector('.game-info');

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
        <img class="front-image" src="https://media.rawg.io/media/screenshots/f1f/f1f418ba6c1c5d6e83e21b511b65b6d6.jpg" class="dsh-image"/>
        <div class="text-description">${data.description}</div>
        `

        gameInfo.appendChild(article);
    });

// RAWG Quake videos Endpoint

const gameVideo = document.querySelector(".video-demo");

fetch('https://api.rawg.io/api/games/54491/youtube?key=614dbd57a1fb4e5398b41255389364ec')
    .then( (response) => {
        return response.json();
    })
    .then( (video) => {

        let urlId = video.results[3].external_id;
        let uniqueVideo = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${urlId}" frameborder="0" allow="autoplay;encrypted-media" allowfullscreen></iframe>`;
        
        const iframeContainer = document.createElement('div');
        iframeContainer.innerHTML = uniqueVideo;
        gameVideo.appendChild(iframeContainer);
        }
    );

// RAWG Development Team Endpoint

const devTeam = document.querySelector(".dev-team");

fetch('https://api.rawg.io/api/games/quake/development-team?key=614dbd57a1fb4e5398b41255389364ec')
    .then( (response) => {
        return response.json();
    })
    .then( (developers) => {

        console.log(developers);

        let q1DevTeam = [];

        for (let i = 0; i < developers.results.length; i++) {
            q1DevTeam.push({'name':developers.results[i].name, 
            'position':developers.results[i].positions[0].name});
            const listDevelopers = document.createElement('div');
            listDevelopers.innerHTML = `<h3 class="dev-positions">${developers.results[i].positions[0].name}</h3>
            <p class="dev-names">${developers.results[i].name}</p>`;
            devTeam.appendChild(listDevelopers);
        }

        console.log(q1DevTeam);

    });