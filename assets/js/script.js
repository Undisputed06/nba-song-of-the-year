const playerInputEl = document.querySelector("#player-input")
    
    
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
        'X-RapidAPI-Key': '02aa8ccc36msh7aa387c3b284e1fp1af881jsn3ac93989983c'
    }
};




var getPlayerID = function (player) {
    fetch(`https://www.balldontlie.io/api/v1/players?search=${player}`).then(function(response){
        response.json().then(function(data){
            console.log(data)
            playerFirstName = data.data[0].first_name
            playerLastName = data.data[0].last_name
            console.log(playerLastName)
            console.log(playerFirstName)
            // playerID = data.data[0].id 
            // console.log(playerID)
            team = data.data[0].team.full_name
            console.log(team)


            getPlayerDraftYear(playerLastName, playerFirstName)
        })
    })
    }

getPlayerID("LeBron James")
    





var getPlayerDraftYear = function(player, firstname) {
fetch(`https://api-nba-v1.p.rapidapi.com/players?name=${player}`, options)
    .then(function(response){
        response.json().then(function(data){
            for (let i =0; i <data.response.length; i++){
                if (data.response[i].firstname == firstname) {
                    playerDraftYear = data.response[i].nba.start
                    playerJerseyNumber = data.response[i].leagues.standard.jersey
                    console.log(playerDraftYear)
                    console.log(playerJerseyNumber)
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

getPlayerDraftYear()


        