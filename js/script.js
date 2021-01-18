
//`https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}`
//`api.openweathermap.org/data/2.5/forecast?q={city name},{state code},{country code}&appid={API key}`
//`http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}`
var responseEl = document.querySelector("#current-weather-card");
const responseHeaderEl = document.getElementById("current-city");
const openweather_api_key = "5fc3f110a3d5d2428821e5494308d37e";
const weather_exclude = "&exclude=[minutely,hourly]";
const unit_standard = "imperial";

function renderDashboard(weatherDataObj) {
  for (const [key, value] of Object.entries(weatherDataObj)) {
    console.log(`${key}: ${value}`);
  }
  var weatherIconImgEl = document.getElementById("weather-icon");
  icon = weatherDataObj['weatherIcon'];
  icon_url = `http://openweathermap.org/img/wn/${icon}@2x.png`
  // imgEl = document.createElement("img");
  // imgEl.setAttribute("style","width:200px");
  // imgEl.className = "card-img";
  // imgEl.src = `http://openweathermap.org/img/wn/${icon}@4x.png`;
  // weatherIconImgEl.append(imgEl);
  weatherIconImgEl.innerHTML = `<img src=${icon_url} height="200" width="200" />`;
  
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
  fetch(url)
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
     responseEl.innerHTML = "";//`<h4>No results</h4>`;
    } else {
      console.log(response);
        // var coord = response.coord;
        // var city_id = response.id;
        // var city = response.name;
        var temp = response.current.temp;
        var uvi = response.current.uvi;
        var weatherType = response.current.weather[0].description;
        var weatherIcon = response.current.weather[0].icon;
        var humidity = response.current.humidity;
        var wind_speed = response.current.wind_speed;
        var weather = response.current.weather;
        
        // console.log(city_id);
        // console.log(country);
        // console.log(coord);
        // var name = geoData[2];
        // var state = geoData[3];
        // var country = geoData[4];


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
function getCityForecast(url) {
    fetch(url)
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
       responseEl.innerHTML = "";//`<h4>No results</h4>`;
      } else {
        console.log(response);
          var country = response.sys.country;
          var coord = response.coord;
          var city_id = response.id;
          // var city = response.name;
          var temp = response.main.temp;
          var weatherType = response.weather.main;
          var humidity = response.main.humidity;
          var wind_speed = response.wind.speed;
          
          console.log(city_id);
          console.log(country);
          console.log(coord);
          var cityCurrentWeather = `<ul class="list-group list-group-flush">
          <li class="list-group-item">Temperature: ${temp} F</li>
          <li class="list-group-item">Humidity: ${humidity}%</li>
          <li class="list-group-item">Wind Speed: ${wind_speed} mph</li>
          <li class="list-group-item">UV Index: ${uvi}</li>
        </ul>`;
        console.log(cityCurrentWeather);
        responseEl.innerHTML = cityCurrentWeather;
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
    // Get the to-do "value" from the textbox and store it as a variable using `.val()` and `.trim()`
    var searchText = $('#city-name')
       .val()
       .trim();
    getGeoData(searchText); // convert city name to longitude, latitude
    console.log(searchText);
    $(`#city-name`).val('');
    // // Clear the textbox when done using `.val()`
    // $('#to-do').val('');
  });

  function renderSearchHistory(search_history) {
    $('#search-history-ul').empty();
    for (var i=0; i<search_history.length; i++){
      console.log(search_history[i]);
    // Creates a new variable 'toDoItem' that will hold a "<p>" tag
    // Sets the `list` item's value as text of this <p> element
      var searchItem = $('<li>')
      // searchItem.text(search_history[i].name);
      searchItem.addClass('nav-item');
      var searchItemButton = $('<button>');
      searchItemButton.text(search_history[i].name);
      searchItemButton.addClass("list-group-item list-group-item-action");
      if (i===(search_history.length-1)) {
        searchItemButton.addClass("active");
      }
      
      var search_term = search_history[i].searchText;
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
    searchItem = searchItem.append(searchItemButton);

    // Adds 'toDoItem' to the To-Do List div
    $('#search-history-ul').append(searchItem);   
    }
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
    if(!state) {
      state = 0
    }
      // add to search history
    var searchHistoryItem  = {
      "name" : name,
      "state" : state,
      "country" : country,
      "coords" : [ lon, lat ],
      "searchText" : searchText
    }
    search_history.push(searchHistoryItem);

    // // Update the to-dos on the page
    // renderTodos(list);
    renderSearchHistory(search_history);

    // // Save the to-dos into localStorage
    // // We need to use JSON.stringify to turn the list from an array into a string
    localStorage.setItem('search-history', JSON.stringify(search_history));
    var date = moment().format('MM/DD/YY');
    var queryString=`${name},${state},${country}`;
    //cardTitleEl = document.createElement("h3")
    responseEl.innerHTML = `<div class="row">
                            <div class="col-md-8">
                              <h3 class="card-title">${name}, ${state}, ${country}</h3>
                              <h5 class="card-text text-muted">Current weather - ${date}</h5>
                            </div>
                            <div id="weather-icon" class="col-md-4"></div>
                            </div>`;
    // searchHistory
    return getOneCall(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&${weather_exclude}&units=${unit_standard}&appid=${openweather_api_key}`);

    }
    });
  }