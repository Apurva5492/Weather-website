const weatherform = document.querySelector(".weatherform");
const cityInput = document.querySelector(".weathercity");
const card = document.querySelector(".card")
const apiKey = "65a6fec731805613edbc2fa7fc7845d2"; 

weatherform.addEventListener("submit", async event => {

    event.preventDefault();

    const city = cityInput.value;

    if(city){

        try{
        const weatherdata = await getweatherdata(city);
        displayweather(weatherdata)
        }
        catch(error){
            console.error(error)
            displayerror(error)
        }
    }
    else{
        displayerror("please enter a city");
    }
});

async function getweatherdata(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response =  await fetch(apiUrl);

    if(!response.ok){
        throw new Error("Could not fetch the data")
    }
    return await response.json()
}

function displayweather(data){
    const {name: city, main:{temp, humidity}, weather:[{description, id}]} = data;

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");   

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getweatherEmoji(id);

    cityDisplay.classList.add("cityDisplay")
    tempDisplay.classList.add("tempdisplay")
    humidityDisplay.classList.add("humiditydisplay")
    descDisplay.classList.add("descdisplay")
    weatherEmoji.classList.add("weatherEmoji")

    card.appendChild(cityDisplay)
    card.appendChild(tempDisplay)
    card.appendChild(humidityDisplay)
    card.appendChild(descDisplay)
    card.appendChild(weatherEmoji)
}

function getweatherEmoji(weatherId){

    switch(true){
        case (weatherId >= 200 && weatherId < 300):
             return "⛈️";
        case (weatherId >= 300 && weatherId < 400):
             return "🌧️";
        case (weatherId >= 500 && weatherId < 600):
             return "⛈️";
        case (weatherId >= 600 && weatherId < 700):
             return "❄️";
        case (weatherId >= 700 && weatherId < 800):
             return "🌫️";
        case (weatherId === 800):
             return "🌞";
        case (weatherId >= 801 && weatherId < 900):
             return "☁️";
        default:
            return "❔"
    }
}

function displayerror(message){
    
    const errorDisplay = document.createElement("p")
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errordisplay")

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}