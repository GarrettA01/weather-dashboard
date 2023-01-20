//Variables
var key = "46256012a49a37d8e104f08913eb594e";
var today = dayjs();
var currentWeather = $("#current-weather");
var forecast = $("#five-day-forecast");

//Functions

// this function saves the city to local storage
function saveCity(newCity) {
  var citySaved = false;
  // checks to see if city exists in the localstorage
  for (var i = 0; i < localStorage.length; i++) {
    if (localStorage["cities" + i] === newCity) {
      citySaved = true;
      break;
    }
  }

  // if the city is not already in localstorage, will save to local storage here
  if (citySaved === false) {
    localStorage.setItem("cities" + localStorage.length, newCity);
  }
}
//Event Listeners
