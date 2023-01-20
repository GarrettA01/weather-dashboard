//Variables
var key = "46256012a49a37d8e104f08913eb594e";
var today = dayjs();
var currentWeather = $("#current-weather");
var forecast = $("#five-day-forecast");

//Functions

// this function saves the city to localStorage
function saveCity(newCity) {
  var citySaved = false;
  //for loop checks to see if city exists in the localStorage
  for (var i = 0; i < localStorage.length; i++) {
    if (localStorage["cities" + i] === newCity) {
      citySaved = true;
      break;
    }
  }

  // if the city is not already in localStorage, will save to localStorage here
  if (citySaved === false) {
    localStorage.setItem("cities" + localStorage.length, newCity);
  }
}

// function to get the five day forecast, build cards, and append to DOM
function fiveDayForecast() {
  var city = $("#city-search").val();
  var searchUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&units=metric&appid=" +
    key;

  $.ajax({
    url: searchUrl,
    method: "GET",
    crossDomain: true,
  }).then(function (response) {
    // create header and parent div elements for the 5-day forecast and append to parent div
    var fiveDayHeader = $("<h2>");
    fiveDayHeader.text("Five Day Forecast:");
    forecast.append(fiveDayHeader);
    var forecastDiv = $("<div>");
    forecastDiv.addClass("d-flex flex-wrap");
    forecast.append(forecastDiv);

    // loops through the 5 day forecast responses and builds cards showing the data from the afternoon for each day
    for (var i = 0; i < response.list.length; i++) {
      var dayData = response.list[i];
      var timeDate = dayjs.unix(dayData.dt);
      var dateFormatted = timeDate.format("MM/DD/YYYY");
      var cardHtml;
      var iconUrl =
        "https://openweathermap.org/img/w/" + dayData.weather[0].icon + ".png";
      // adds the following code block to cardHtml for every instance above as the for loop goes through the response from the API
      cardHtml += `<div class="card m-2 rounded">
        <ul class="list-unstyled p-3">
            <li>${dateFormatted}</li>
            <li><img src="${iconUrl}"></li>
            <li>Temp: ${dayData.main.temp}&#8451;</li>
            <li>Wind: ${dayData.wind.speed} km/h</li>
            <li>Humidity: ${dayData.main.humidity}%</li>
        </ul>
      </div>`;
    }
    // fills forecast with the html created in the for loop
    forecastDiv.html(cardHtml);
    console.log(typeof cardHtml);
  });
}

function printHistory() {
  $("#search-history").empty();

  // if there are cities stores in localStorage, print them to a list under search bar
  if (localStorage.length >= 0) {
    for (var i = 0; i < localStorage.length; i++) {
      var city = localStorage.getItem("cities" + i);
      var cityListEl;
      cityListEl = `<button class="list-group-item list-group-item-action">${city}</button>`;
      $("#search-history").prepend(cityListEl);
    }

    // if localstorage is populated, will create a prompt to allow the user to delete localStorage
    $("#clear-history").html($('<a id="clear-history" href="#">clear</a>'));
  } else {
    $("#clear-history").html("");
  }
}
//Event Listeners
