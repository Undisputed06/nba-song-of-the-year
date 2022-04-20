const playerSearchBtn = document.querySelector("#submit-button")
const playerInputEl = document.querySelector("#player-input")
const draftYearEl = document.querySelector("#draft-year")
const jerseyEl = document.querySelector("#jersey")
const teamEl = document.querySelector("#team")
const anchorEl = document.querySelector(".stats")
const playerNameEl = document.querySelector("#player-name")
const sectionContainerEl = document.querySelector(".section-container")
const modalEl = document.querySelector(".modal")
const modalContainerEl = document.querySelector(".modal-container")
let modalCloseEl = document.querySelector(".modal-close")
let appendMeContainerEl = document.querySelector(".append-me")


       
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
        'X-RapidAPI-Key': '02aa8ccc36msh7aa387c3b284e1fp1af881jsn3ac93989983c'
    }
};

playerSearchBtn.addEventListener("click", function(){
    // console.dir(playerInputEl)
    let playerName = playerInputEl.value
    
    // anchorEl.setAttribute("href", "./stats.html" + playerName)
    savedSearches(playerName)
    getPlayerID(playerName)
    
})



var getPlayerID = function (player) {
    fetch(`https://www.balldontlie.io/api/v1/players?search=${player}`).then(function(response) {
        // debugger;
        if(response.ok) {
            response.json().then(function(data){
                console.log(data)
                    // Remove class hidden from the container
                    sectionContainerEl.classList.remove("hidden")

                    playerFirstName = data.data[0].first_name
                    playerLastName = data.data[0].last_name
                    playerNameEl.innerHTML = playerFirstName + " " + playerLastName
                    console.log(playerLastName)
                    console.log(playerFirstName)
                    // playerID = data.data[0].id 
                    // console.log(playerID)
                    team = data.data[0].team.full_name
                    console.log(team)
                    teamEl.innerHTML= "TEAM: " + team
                    
                    getPlayerDraftYear(playerLastName, playerFirstName)
                
            })
        }
        
    })
    
}
    

var getPlayerDraftYear = function(player, firstname) {
fetch(`https://api-nba-v1.p.rapidapi.com/players?name=${player}`, options)
    .then(function(response){
        response.json().then(function(data){
            for (let i = 0; i < data.response.length; i++){
                if (data.response[i].firstname == firstname) {
                    playerDraftYear = data.response[i].nba.start
                    playerJerseyNumber = data.response[i].leagues.standard.jersey
                    console.log(playerDraftYear)
                    console.log(playerJerseyNumber)
                    jerseyEl.innerHTML= "JERSEY #: " + playerJerseyNumber
                    draftYearEl.innerHTML = "DRAFT YEAR: " + playerDraftYear

                    // Run YouTube function
                    fetchTheApi(playerDraftYear)

                }
            }
            
            // playerName = data.response[0].firstname + " " + data.response[0].lastname
            // console.log(playerName)
            // playerDraftYear = data.response[0].nba.start
            // console.log(playerDraftYear)
            // playerJerseyNumber = data.response[0].leagues.standard.jersey
            // console.log(playerJerseyNumber)
        })
    })

}

// getPlayerDraftYear()


// YouTube API begin

const videoIframe = document.querySelector(".video-iframe")
const youtubeVideoTitle = document.querySelector("#song")
const videoContainer = document.querySelector(".video-container")



let fetchTheApi = function(userYear) {
    let apiUrl = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=most popular songs of' + userYear + '&key=AIzaSyDlhGHiQ4BazcwFF_5FyT8TAp5fA9t78RE'

    fetch(apiUrl).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                console.log(data)
                // Run the YouTube embed function with the data as an argument
                createYouTubeContent(data)
            })
        }
        
    })
}

let createYouTubeContent = function(yaya) {

    for (let i = 0; i < yaya.items.length; i++) {
        // Create title for the container
        youtubeVideoTitle.innerHTML = yaya.items[i].snippet.title
        // Append Title to container
        videoContainer.appendChild(youtubeVideoTitle)

        // Give the iframe a correct link
        videoIframe.setAttribute("src", 'https://www.youtube.com/embed/' + yaya.items[i].id.videoId)
        // Append iframe to the container
        videoContainer.appendChild(videoIframe)
    }
}

let playersInLocalStorage = JSON.parse(localStorage.getItem('player')) || []
console.log(playersInLocalStorage)

let savedSearches = function(player) {
    let previousSearchButton = document.createElement("button")
    previousSearchButton.classList.add("saved-search", "is-success", "button", "mr-2", "mt-2")
    previousSearchButton.textContent = player

    playersInLocalStorage.push(player)
    localStorage.setItem("player", JSON.stringify(playersInLocalStorage));
    appendMeContainerEl.appendChild(previousSearchButton)

    $(".saved-search").on("click", function() {
        let selectedPreviousSearch = $(this).text().trim()
        getPlayerID(selectedPreviousSearch)
    })
    
}

let loadUserInput = function() {
    var searchedPlayers = JSON.parse(localStorage.getItem("player") || "[]");
        // for (var i = 0; i < searchedCities.length; i++){
        //     $(`#${searchedCities[i]}`).val()
        // }
        for( let j = 0; j < searchedPlayers.length; j++) {
            let previousSearchButton = document.createElement("button")
            previousSearchButton.textContent = searchedPlayers[j]
            previousSearchButton.classList.add("saved-search",  "is-success", "button", "mr-2", "mt-2")    
            appendMeContainerEl.appendChild(previousSearchButton)
            
            

        }
    $(".saved-search").on("click", function() {
        let selectedPreviousSearch = $(this).text().trim()
        getPlayerID(selectedPreviousSearch)
    })

}




modalCloseEl.addEventListener("click", function() {
    modalEl.classList.remove("is-active")
})

loadUserInput()