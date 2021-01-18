
//`https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}`
//`api.openweathermap.org/data/2.5/forecast?q={city name},{state code},{country code}&appid={API key}`
//`http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}`
var searchFormEl = document.querySelector("#search-form");
var responseEl = document.querySelector("#current-weather-card");
var responseHeaderEl = document.getElementById("current-city");
var searchHistoryEl = document.getElementById("search-history-div");
//const openweather_api_key = config.OWEATHER_KEY;
const openweather_api_key = OPENWEATHER_KEY;
const weather_exclude = "minutely,hourly"
const unit_standard = "imperial";
const targetJSONParams = {'current': ['temp','humidity','wind_speed','uvi'],
                          '5D':['temp','humidity'] }


function getDailyForecast(dailyForecastData) {
  // weather indicator (icon)
  // temperature
  // humidity
  for (var i=0; i < 5; i++){

  }
} 
function renderDashboard(weatherDataObj) {
  for (const [key, value] of Object.entries(weatherDataObj)) {
    console.log(`${key}: ${value}`);
  }
  var weatherIconImgEl = document.getElementById("weather-icon");
  icon = weatherDataObj['weatherIcon'];
  icon_url = `http://openweathermap.org/img/wn/${icon}@4x.png`
  // imgEl = document.createElement("img");
  // imgEl.setAttribute("style","width:200px");
  // imgEl.className = "card-img";
  // imgEl.src = `htctp://openweathermap.org/img/wn/${icon}@4x.png`;
  // weatherIconImgEl.append(imgEl);
  weatherIconImgEl.innerHTML = `<figure class=figure> <img src=${icon_url} class="figure-img" height="100" width="100" </img>`;
  
  // weatherIconImgEl.innerHTML
  // weatherDataObj.forEach( function(item) {
  //   console.log(item);
  //   } );
  // var currentDataHTML = `<p class=card-text>Temperature: ${temp} F</p>
  //       <p class=card-text>Humidity: ${humidity}%</p>
  //       <p class=card-text>Wind Speed: ${wind_speed} mph</p>
  //       <p class=card-text>UV Index: ${uvi}<p`;
}
// function createHistEntry()

// const city_list = JSON.parse(json_file);
function searchForCity(queryString) {
    console.log(`Searching for ${queryString}`)
    getCityForecast(`https://api.openweathermap.org/data/2.5/weather?q=${queryString}&units=imperial&appid=${openweather_api_key}`);
}
function getOneCall(url) {
  fetch(`${url}&appid=${openweather_api_key}`)
  .then(function(response) {
      if (!response.ok) {
        return null;
        // throw new Error("Not 2XX response")
      } else {
        return response.json();
        // responseEl.innerHTML = `<h4>No results</h4>`
        // return undefined;
      }
  })
  .then(function(response) {
    if (response===null) {
      responseEl.innerHTML = "No Results found!";//`<h4>No results</h4>`;
      // return null;
    } else {
        console.log(response);
        //var name = response.name;
        var temp = response.current.temp;
        var uvi = response.current.uvi;
        var weatherType = response.current.weather[0].description;
        var weatherIcon = response.current.weather[0].icon;
        var humidity = response.current.humidity;
        var wind_speed = response.current.wind_speed;
        var weather = response.current.weather;
        var city_id = response.id;
        var cityCurrentWeather = `<li class="list-group-item">Temperature: ${temp} F</li>
        <li class="list-group-item">Humidity: ${humidity}%</li>
        <li class="list-group-item">Wind Speed: ${wind_speed} mph</li>
        <li class="list-group-item">UV Index: ${uvi}</li>`
      console.log(cityCurrentWeather);
      var weatherDataUl = document.getElementById("current-weather-list");
      weatherDataUl.innerHTML = cityCurrentWeather; 
      var weatherDataObj = {
        'temp' : temp,
        'humidity' : humidity,
        'wind_speed' : wind_speed,
        'uvi'         : uvi,
        'weatherType' : weatherType,
        'weatherIcon' : weatherIcon
      };
      getDailyForecast(response.daily);
      // searchItemButton.id = name;
      // searchItemButton.value= city_id
      // searchItemButton.type = "submit";
      // searchItemButton.id = 
      

    
    
      // // Update the to-dos on the page
      // createCitySearchButton(searchHistoryItem);
    
      renderDashboard(weatherDataObj);
      // } console.log()
        // cityEl = document.createElement("h4");
        // cityEl.className = "card-title";
        // cityEl.textContent = response.name;
        // dateEl = document.createElement("p");
        // dateEl.className = "card-text";
        // dateEl.textContent=""
        // responseEl.appendChild(cityEl);
        // temperatureEl = document.createElement("li");
        // responseEl.innerHTML = `<h4>${country}</h4>`;
    }
  });

}

  var search_history = JSON.parse(localStorage.getItem('search-history-list')) || [];
  $('#new-city-search').on('click', function(event) {
    event.preventDefault();

    // console.log(event.target.id);
    // // console.log(event.val));
    // console.log(event.type);
    // console.log(event.target.value);
    // if (event.target.value === "new"){
    // Get the to-do "value" from the textbox and store it as a variable using `.val()` and `.trim()`
    var searchText = $('#city-name')
       .val()
       .trim();
    getGeoData(searchText); // convert city name to longitude, latitude
    console.log(searchText);
    $(`#city-name`).val('');
    // } else {
      // return
    // }
    // // Clear the textbox when done using `.val()`
    // $('#to-do').val('');
  });
  
  // var createCitySearchButton = function(searchHistoryItem) {
  //   var searchItemButton = document.createElement("button");
  //   searchItemButton.textContent=searchHistoryItem.name;
  //   searchItemButton.name=searchHistoryItem;
  //   searchItemButton.value= city_id;
  //   searchItemButton.type = "submit";
  //   searchItemButton.classList = "list-group-item list-group-item-action";
  //   searchHistoryEl.appendChild(searchItemButton);
    
  // }
  function renderSearchHistory() {
    $('#search-history-div').empty();
    for (var i=0; i < search_history.length; i++) {
    // for (const [key, value] of Object.entries(search_history)) {
      let key = search_history[i];
      console.log(`${key}`);
      
      var mySearchArray = localStorage.getItem(key);
      console.log(mySearchArray);
      var searchItemButton = document.createElement("button");
      searchItemButton.value=mySearchArray.query;
      searchItemButton.name=mySearchArray.name;
      searchItemButton.textContent=fullName;
      searchItemButton.classList = "list-group-item list-group-item-action";
      searchHistoryEl.appendChild(searchItemButton);
    }
    // for (var i=0; i<search_history.length; i++){
      // console.log(search_history[i]);
    // Creates a new variable 'toDoItem' that will hold a "<p>" tag
    // Sets the `list` item's value as text of this <p> element
      // var searchItem = $('')
      // searchItem.text(search_history[i].name);select
      // searchItem.addClass('');
      
      // var 
      // searchItemButton;
      // searchItemButton.id(search_term);
      // searchItemButton
      // searchItemButton.addEventListener(clicjonclick(`getGeoData(${search_term}`);
      //(search_history[i].lon,search_history[i].lat,search_history[i].name,search_history[i].state,search_history[i].country))
    // Creates a button `toDoClose` with an attribute called `data-to-do` and a unique `id`
    // var toDoClose = $('<button>');
    // toDoClose.attr('data-to-do', i);

    // Gives the button a class called 'checkbox'
    // toDoClose.addClass('checkbox');

    // Adds a checkmark symbol as its text value
    // toDoClose.text('✓');

    // Adds the button to the `toDoItem`
    // toDoItem = toDoItem.prepend(toDoClose);
    // searchItem = searchItem.append(searchItemButton);

    // Adds 'toDoItem' to the To-Do List div
    // $('#search-history-ul').append(searchItem);   
  }
  function getGeoData(searchText) {
    // searchText = document.querySelector("#search-city").value.trim();
    if (!searchText) return
    // searchArgs = searchText.split(',');
    console.log(`Searching for ${searchText}`)
    // responseEl.innerHTML="";
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchText}&limit=1&appid=${openweather_api_key}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(geoResponse) {
      if(geoResponse.length === 0) {
        console.log("No response from geo api");
        return null;
        // responseEl.innerHTML = `<h4>No results</h4>`;
      } else {
        // responseEl.innerHTML="";
      
      // console.log(geoResponse);
        var name = geoResponse[0].name;
        var state = geoResponse[0].state;
        var country = geoResponse[0].country;
        var lon = geoResponse[0].lon;
        var lat = geoResponse[0].lat;
      // add to search history


    // renderTodos(list);
    // appendSearchInst(searchText);
    

    // // Save the to-dos into localStorage
    // // We need to use JSON.stringify to turn the list from an array into a string
    if (country === "US") {
      var fullName = `${name}, ${state}`;
    } else {
      var fullName = `${name}, ${country}`;
    }
    var query = `lat=${lat}&lon=${lon}&${weather_exclude}&units=${unit_standard}`;
    var searchHistoryItem = {"fullName": fullName,
                            "query":query
                          }

    search_history.push(searchText);
    localStorage.setItem(searchText, JSON.stringify(searchHistoryItem));
    var searchItemButton = document.createElement("button");
    searchItemButton.value=query;
    searchItemButton.name=name;
    // searchItemButton.id=``
    searchItemButton.textContent=name;
    searchItemButton.classList = "list-group-item list-group-item-action";
    searchHistoryEl.appendChild(searchItemButton);
   
    var date = moment().format('MM/DD/YY');
   
   
    var queryString=`${name},${state},${country}`;
    //cardTitleEl = document.createElement("h3")
    
    responseEl.innerHTML = `
                            <div class="row">
                            <div class="col">
                              <h3 class="card-title">${fullName}</h3>
                              <h5 class="card-text text-muted">Current weather - ${date}</h5>
                              <span id="weather-icon"></span>
                            </div>
                            </div>`;
    // searchHistory
    return getOneCall(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&${weather_exclude}&units=${unit_standard}`);

    }
    });
  }
  var formSubmitHandler = function(event) {
    event.preventDefault();
    console.log(event.target);
    // debugger;
  }
  renderSearchHistory();
  searchFormEl.addEventListener("submit",formSubmitHandler);