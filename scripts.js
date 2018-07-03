// Creating some variables for later. 
let time = new Date();
let day = new Date().getDay();
let currentTime = new Date().getHours();
let timeNow = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
const body = document.querySelector('body');
const x = document.getElementById('lat-lon');
let tempUnit = 'F';
const div = document.createElement('div');
div.classList.add('main-wrapper');
let currentTempInCelsius;
let currentTempInFahrenheit;
let description;
let tempHigh;
let tempLow;
let tempInFahrenheit;
let tempInCelsius;
let weather;
let cityName;
let country;
let dayOrNight;
let highTempCelsius;
let lowTempCelsius;
let highTempFahrenheit;
let lowTempFahrenheit;

const weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

// Weather icon classes
let weatherIcon = {
    Clouds: 'wi-cloudy',
    Rain: 'wi-rain',
    Thunderstorm: 'wi-thunderstorm',
    Drizzle: 'wi-sprinkle',
    Mist: 'wi-fog',
    Fog: 'wi-fog',
    Clear: 'wi-day-sunny',
    Snow: 'wi-snow',
    Haze: 'wi-day-haze'
}

// Initiating geoLocation
getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser";
    }
}

// Gathering the Latitude 
showPosition = (position) => {
    const lat = "lat=" + position.coords.latitude;
    const lon = "lon=" + position.coords.longitude;
    getWeather(lat, lon);
}

//Checking hour of day to later set a body class for some fancy theming.
dayOrNight = () => {
    if (currentTime >= 7 && currentTime <= 17) {
        dayOrNight = "dayTime";
    } else {
        dayOrNight = "nightTime";

    }
    colorScheme();
}

// Checking if day or night and temp. Adding a class to the body. 
colorScheme = () => {
    let timeColorScheme;
    if (dayOrNight === "dayTime") {
        switch (true) {
            case currentTempInFahrenheit < 35:
                timeColorScheme = "day-cold";
                break;
            case currentTempInFahrenheit < 55:
                timeColorScheme = "day-chill";
                break;
            case currentTempInFahrenheit < 75:
                timeColorScheme = "day-nice";
                break;
            case currentTempInFahrenheit < 95:
                timeColorScheme = "day-warm";
                break;
            case currentTempInFahrenheit >= 96:
                timeColorScheme = "day-hot";
                break;
        }
    } else if (dayOrNight === "nightTime") {
        switch (true) {
            case currentTempInFahrenheit < 35:
                timeColorScheme = "night-cold";
                break;
            case currentTempInFahrenheit < 55:
                timeColorScheme = "night-chill";
                break;
            case currentTempInFahrenheit < 75:
                timeColorScheme = "night-nice";
                break;
            case currentTempInFahrenheit < 95:
                timeColorScheme = "night-warm";
                break;
            case currentTempInFahrenheit >= 96:
                timeColorScheme = "night-hot";
                break;
        }
    }
    body.classList.add(timeColorScheme);
}

// Getting and storing the weather information from a fetch in variables. 
getWeather = (lat, lon) => {
    // Setting URL with latitude and longitude.
    const endpoint = 'https://fcc-weather-api.glitch.me/api/current?' + lat + '&' + lon;
    //Fetching the API object.
    fetch(endpoint)
        .then(blob => blob.json())
        .then(function(data) {

            // Assigning temperature
            currentTempInCelsius = Math.floor(data.main.temp);
            currentTempInFahrenheit = Math.floor(currentTempInCelsius * 9) / 5 + 32;

            highTempCelsius = Math.floor(data.main.temp_max);
            lowTempCelsius = Math.floor(data.main.temp_min);
            highTempFahrenheit = Math.floor(highTempCelsius * 9) / 5 + 32;
            lowTempFahrenheit = Math.floor(lowTempCelsius * 9) / 5 + 32;

            tempInFahrenheit = currentTempInFahrenheit + "&#176 F";
            tempInCelsius = currentTempInCelsius + "&#176 C";

            // Assigning variables to their content.
            description = data.weather[0].main;
            weather = data.weather[0].main;
            cityName = data.name;
            country = data.sys.country;

            dayOrNight();
            updateDisplay();
            getCelsius();
            getFahrenheit();
            console.log(data);
        });
}

updateDisplay = () => {
    document.querySelector('.wi').classList.add(`${weatherIcon[description]}`);
    document.querySelector('.weather').innerHTML = `${weather}`;
    document.querySelector('.day-of-week').innerHTML = `${weekday[day]}`;
    document.querySelector('.time').innerHTML = `${timeNow}`;
    document.querySelector('.city').innerHTML = `${cityName}`;
    document.querySelector('.country').innerHTML = `${country}`;
    document.querySelector('.main-temp').innerHTML = tempInFahrenheit;
    document.querySelector('.temp-high').innerHTML = highTempFahrenheit;
    document.querySelector('.temp-low').innerHTML = lowTempFahrenheit;

    getCelsius();
    getFahrenheit();
}

getFahrenheit = () => {
    document.querySelector('.main-temp').innerHTML = tempInFahrenheit;
    document.querySelector('.temp-high').innerHTML = highTempFahrenheit;
    document.querySelector('.temp-low').innerHTML = lowTempFahrenheit;
    document.querySelector('.fahrenheit-trigger').classList.add('active');
    document.querySelector('.celsius-trigger').classList.remove('active');
}

getCelsius = () => {
    document.querySelector('.main-temp').innerHTML = tempInCelsius;
    document.querySelector('.temp-high').innerHTML = highTempCelsius;
    document.querySelector('.temp-low').innerHTML = lowTempCelsius;
    document.querySelector('.fahrenheit-trigger').classList.remove('active');
    document.querySelector('.celsius-trigger').classList.add('active');
}

const fButton = document.querySelector('.fahrenheit-trigger');
const cButton = document.querySelector('.celsius-trigger');

fButton.addEventListener('click', getFahrenheit);
cButton.addEventListener('click', getCelsius);
