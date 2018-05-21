const x = document.getElementById('lat-lon');
let tempUnit = 'C';

// Initiating geoLocation
function getLocation() {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser";
  }
} 

// Gathering the Latitude 
function showPosition(position) {
  const lat = "lat=" + position.coords.latitude; 
  const lon = "lon=" + position.coords.longitude;
  weather(lat, lon);
}

// Building the weather dispaly
function weather(lat, lon) {
  const endpoint = 'https://fcc-weather-api.glitch.me/api/current?' + lat + '&' + lon;
  const div = document.createElement('div');
  div.classList.add('main-wrapper');

  //Fetching the API object
  fetch(endpoint)
    .then(blob => blob.json())
    .then(function(data) {
  
    let currentTempInCelsius = Math.round(data.main.temp * 10) / 10;
    let currentTempInFahrenheit = Math.round(currentTempInCelsius * 9) / 5 + 32;
    console.log(data.weather[0].icon);

    // Weather icon classes
    let weatherIcon = {
      clouds: 'wi-cloudy',
      rain: 'wi-rain',
      thunderstorm: 'wi-thunderstorm',
      drizzle: 'wi-sprinkle',
      // 'wi-cloud',
      mist: 'wi-fog',
      fog: 'wi-fog',
      clear: 'wi-day-sunny',
      // 'wi-rain-wind',
      // 'wi-raindrops',
      // 'wi-windy',
      // 'wi-hail',
      // 'wi-showers',
      // 'wi-storm-showers',
      // 'wi-sleet',
      // 'wi-cloudy-windy',
      // 'wi-rain-mix',
      // 'wi-snow',
      // 'wi-snow-wind'
    }

    // Getting the name of the weather and setting it to be used as a class. 
    let mainDescription = data.weather[0].main;
    let description = mainDescription.toLowerCase();

    // HTML to build the weather widget.
    div.innerHTML = 
    ` <div class="temp-wrapper"><span class="temp">${data.main.temp + String.fromCharCode(176)}</span><span id="temp-unit">${tempUnit}</span></div>
      <div class="weather-icon"><i class="wi ${weatherIcon[description]}"></i></div>
      <div class="weather">${data.weather[0].main}</div>
      <div class="local">
        <span>${data.name}</span>, <span>${data.sys.country}</span>
      </div>
    `;

    x.appendChild(div);
    console.log(data);

    // Variables setting the temp if F and C.
    const clickTempUnit = document.querySelector('#temp-unit');
    const tempDiv = document.querySelector('.temp');
    let tempInFahrenheit = currentTempInFahrenheit + String.fromCharCode(176);
    let tempInCelsius = currentTempInCelsius + String.fromCharCode(176);

    // Switching tempreature content on click.
    clickTempUnit.addEventListener('click', function() {
      if(clickTempUnit.innerHTML == 'C') {
        clickTempUnit.innerHTML = 'F'; 
        tempDiv.innerHTML = tempInFahrenheit;
      } else {

        // return tempInCelsius;
        clickTempUnit.innerHTML = 'C';
        tempDiv.innerHTML = tempInCelsius;
      }
      
    });

  });

}

