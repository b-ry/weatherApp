// Geolocation
// Ajax call weather api
//
var lat;
var lon;
var tempUnit = 'C';

$(document).ready(function() {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var lat = "lat=" + position.coords.latitude;
      var lon = "lon=" + position.coords.longitude;
      weather(lat, lon);
    });
  } else {
    alert('Geolocation is not supported');
  }
  $("#temp-type").click(function() {
    var currentTempType = $("#temp-type").text();
    var newTempType = 
  });
    
});

function weather(lat, lon) {
  $.ajax({
    url: "https://fcc-weather-api.glitch.me/api/current?" + lat + "&" + lon,
    success: function(result) {
      $("#city").text(result.name + ", ");
      $("#country").text(result.sys.country);
      $("#weather").text(result.weather[0].main);
      $("#icon").append($("<img>").attr("src", result.weather[0].icon));
      $("#description").text(result.weather[0].description);
      $("#temp").text(result.main.temp + String.fromCharCode(176));
      $("#temp-type").text( " " + tempUnit);
      console.log(result);
    }
  });
}


