    const playerInputEl = document.querySelector("#player-input")
    
    
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
            'X-RapidAPI-Key': '02aa8ccc36msh7aa387c3b284e1fp1af881jsn3ac93989983c'
        }
    };
    
    var getPlayer = function(player) {
    // player.replace(/\s+/g, '-').toLowerCase();
    fetch(`https://api-nba-v1.p.rapidapi.com/players?name=James`, options)
        .then(function(response){
            response.json().then(function(data){
                console.log(data)
                playerName = data.response[0].firstname + " " + data.response[0].lastname
                console.log(playerName)
                playerDraftYear = data.response[0].nba.start
                console.log(playerDraftYear)
                playerJerseyNumber = data.response[0].leagues.standard.jersey
                console.log(playerJerseyNumber)
            })
        })

    }

    getPlayer('James')

    // fetch('https://www.balldontlie.io/api/v1/players').then(function(response){
    //     response.json().then(function(data){
    //         console.log(data)
            
    //     })
    // })