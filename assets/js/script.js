let containerDivEl = document.querySelector(".container")
let inputField = document.querySelector(".inputField")
let submitBtn = document.querySelector(".submitBtn")
let videoIframe = document.querySelector(".video-iframe")


let getPlayerName = function(draftYear) {
    event.preventDefault()

    // Assign userInput to a variable
    let chosenPlayerName = playerName.value

    // Run the API with the userInput as an argument
    fetchTheApi(chosenPlayerName)
    }

let fetchTheApi = function(draftYear) {
    let apiUrl = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=most popular songs of' + draftYear + '&key=AIzaSyDlhGHiQ4BazcwFF_5FyT8TAp5fA9t78RE'

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
    // Remove the hidden class so the container is visible
    // containerDivEl.classList.remove("hidden")
    // Clear the text content of the container each time the function is ran
    containerDivEl.textContent = ''

    for(let i = 0; i < yaya.items.length; i++) {
        // Create title for the container
        let youtubeSearchHeader = document.createElement("h2")
        youtubeSearchHeader.classList.add("video-title")
        youtubeSearchHeader.textContent = yaya.items[i].snippet.title
        // Append Title to container
        containerDivEl.appendChild(youtubeSearchHeader)

        // Give the iframe a correct link
        videoIframe.setAttribute("src", 'https://www.youtube.com/embed/' + yaya.items[i].id.videoId)
        // Append iframe to the container
        containerDivEl.appendChild(videoIframe)
    }
}

submitBtn.addEventListener("click", getPlayerName)


// 'https://www.youtube.com/watch?v=${result.id.videoId}';