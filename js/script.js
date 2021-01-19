
const main = document.body.main;

const openweather_api_key = config.OWEATHER_KEY;
const weather_exclude = "minutely,hourly"
const unit_standard = "imperial";
const targetJSONParams = {'current': ['temp','humidity','wind_speed','uvi'],
                          'daily':['icon', 'temp','humidity'] }
const UV_INDEX_LIMIT_LOW = 2;
const UV_INDEX_LIMIT_MID = 5;
const UV_INDEX_LIMIT_HIGH = 6;
const UV_INDEX_LIMIT_SEVERE = 8;

var searchFormEl = document.querySelector("#search-form");
var responseEl = document.querySelector("#current-display-top");
var responseHeaderEl = document.querySelector("#current-city");
var searchHistoryEl = document.querySelector("#search-history-div");

var genDayElement = function(singleForecastItem, formatDate){
  // var date = moment(singleForecastItem.dt);
  // var formatDate = date.format('ddddd MMM Do YY');
  var temp = singleForecastItem.temp.day;
  var humidity = singleForecastItem.humidity;
  var icon = singleForecastItem.weather[0].icon;
  var cardBodyEl = document.createElement("div")
  let icon_html = getIconHtml(icon,50);
  cardBodyEl.className = "card-body";
  cardBodyEl.innerHTML = `<span><h6 class="card-title">${formatDate}</h6>
    ${icon_html}</span>
    <p class="card-text">${temp} <span>&#8457</span></p>
    <p class="card-text">${humidity} %</p>
    </ul>`;
  return cardBodyEl;
}
function createForecast(dailyForecastData) {
  var startDate = moment().format("ddd MMM Do YY");
  // var dt_0= moment(dailyForecastData[0].dt);
  // var dt_s = moment().format("dddd MMM Do YY");
  // var top5DayEl = document.createElement('div');
  // var mainEl = document.getElementById('main-dashboard-top');
  var forecastRowEl = document.createElement("div");
  forecastRowEl.className = "row d-flex justify-content-around'";
  

  // for (let i=0; i < 5; i++){
  //     var colEl = document.createElement("div");
  //     colEl.className="col";
  //     colEl.id = `col-forecast-${i}`
  //     forecastRowEl.appendChild(colEl);
  // }
  for (var j=0; j<5;j++) {
  // forecastRowEl.childNodes.forEach
  var colEl = document.createElement("div");
    colEl.className="col-sm-6 col-md-1 col-lg-2 my-2 my-sm-0 d-inline-flex";
    colEl.id = `col-forecast-${j}`
      const itemData = dailyForecastData[j];
      // let icon = dailyForecastData[j].icon;
      // let temp = dailyForecastData[j].temp.day;
      // let humidity = dailyForecastData[j].humidity;
      let thisDate = moment().add(j,'days').format('ddd Do MMM')
      var dayCardEl = document.createElement("div");
      dayCardEl.className = "card text-light bg-primary my-2 my-sm-0";
      dayCardEl.appendChild(genDayElement(itemData,thisDate));
      colEl.appendChild(dayCardEl);
      forecastRowEl.appendChild(colEl);
  }
  // responseEl.appendChild(forecastRowEl);
  responseEl.appendChild(forecastRowEl);
  // return forecastRowEl;
} 
var createWeatherObj = function(weatherResponseData) {
  for (const key of targetJSONParams['daily']) {
    const value = weatherResponseData.key;

  }
  
};
function getIconHtml(icon,size){
  var icon_url = `http://openweathermap.org/img/wn/${icon}@4x.png`
  return (`<figure class="figure" height=${size} width=${size}> <img src=${icon_url} class="figure-img" height="${size}" width="${size}" </img>`);
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
        response = null;
      } else {
        return response.json();
      }
  })
  .then(function(response) {
    if (response===null) {
      responseEl.innerHTML = "No Results found!";//`<h4>No results</h4>`;
      return null;
    } else {
        // console.log(response);
        //var name = response.name;
        var temp = response.current.temp;
        var uvi = parseFloat(response.current.uvi);
        
        var weatherType = response.current.weather[0].description;
        var weatherIcon = response.current.weather[0].icon;
        var humidity = response.current.humidity;
        var wind_speed = response.current.wind_speed;
        var weather = response.current.weather;
        var city_id = response.id;
        if (uvi < UV_INDEX_LIMIT_LOW) {
          var uv_indicator_color = "bg-success";
        } else if (uvi < UV_INDEX_LIMIT_MID ) {
          var uv_indicator_color = "bg-warning";
        } else if (uvi < UV_INDEX_LIMIT_HIGH) {
          var uv_indicator_color = "bg-danger";
        }
        
        let weatherDataUl = document.createElement("ul");;
        weatherDataUl.id = "current-weather-list";
        weatherDataUl.className= "list-group list-group-flush";
        weatherDataUl.innerHTML = `<li class="list-group-item">Temperature: ${temp} F</li>
        <li class="list-group-item">Humidity: ${humidity}%</li>
        <li class="list-group-item">Wind Speed: ${wind_speed} </li>
        <li class="list-group-item">UV Index: <span id="uvi-color" class="text-light ${uv_indicator_color}">${uvi}</span></li>`;

      // console.log(cityCurrentWeather);
      // var weatherDataUl = document.getElementById("current-weather-list");
      // weatherDataUl.innerHTML = cityCurrentWeather; 
      var cardTopEl= document.getElementById('weather-top-card')
      cardTopEl.appendChild(weatherDataUl);
      var weatherDataObj = {
        'temp' : temp,
        'humidity' : humidity,
        'wind_speed' : wind_speed,
        'uvi'         : uvi,
        'weatherType' : weatherType,
        'weatherIcon' : weatherIcon
      };
      // console.log(response);
      // console.log(response.daily);
      createForecast(response.daily);
      // responseEl.appendChild(forecastRowEl);
      // searchItemButton.id = name;
      // searchItemButton.value= city_id
      // searchItemButton.type = "submit";
      // searchItemButton.id = 
      

    
    
      // // Update the to-dos on the page
      // createCitySearchButton(searchHistoryItem);
    
      return renderDashboard(weatherDataObj);
      // } console.log()
        // cityEl = document.createElement("h4");
        // cityEl.className = "card-title";
        // cityEl.textContent = response.name;
        // dateEl = document.createElement("p");
        // dateEl.className = "card-text";
        // responseEl.appendChild(cityEl);
        // temperatureEl = document.createElement("li");
        // responseEl.innerHTML = `<h4>${country}</h4>`;
    }
  });

}
// $()
var search_history = JSON.parse(localStorage.getItem('search-history-list')) || [];
  $('#search-history-div').on('click', function(event) {
    if (!(event.target.matches('.btn-history')) ) return;
    event.preventDefault();
    $('#current-display-top').empty();
    
  });
    //val buttonName = $('#')
   
  //   console.log(event.target);
  //   var histVal = $('#search-history-div')
  //   .val()
  //   .trim();
  //   getOneCall()
  //   console.log(histVal);
  // });
  
  $('#new-city-search').on('click', function(event) {
    event.preventDefault();
    $('#current-display-top').empty();
    var searchText = $('#city-name')
       .val()
       .trim();
    // console.log(searchText);
    getGeoData(searchText); // convert city name to longitude, latitude
    $(`#city-name`).val('');
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
    // $('#search-history-div').empty();
    for (var i=0; i < search_history.length; i++) {
    // for (const [key, value] of Object.entries(search_history)) {
      let key = search_history[i];
      console.log(`${key}`);
      
      var mySearchArray = JSON.parse(localStorage.getItem(key));
      console.log(mySearchArray);
      var searchItemButton = document.createElement("button");
      searchItemButton.value=mySearchArray.query;
      searchItemButton.name=key;
      searchItemButton.textContent=mySearchArray.fullName;
      searchItemButton.classList = "list-group-item list-group-item-action btn-history";
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
  fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${searchText}&limit=1&appid=${openweather_api_key}`)
  .then(function(response) {
  return response.json();
  })
  .then(function(geoResponse) {
    if(geoResponse.length === 0) {
      console.log("No response from geo api");
      return null;
    } else {
        var name = geoResponse[0].name;
        var state = geoResponse[0].state;
        var country = geoResponse[0].country;
        var lon = geoResponse[0].lon;
        var lat = geoResponse[0].lat;
    if (country === "US") {
      var fullName = `${name}, ${state}`;
    } else {
      var fullName = `${name}, ${country}`;
    }
    var query = `lat=${lat}&lon=${lon}&exclude=${weather_exclude}&units=${unit_standard}`;

    var searchHistoryItem = {fullName: `${fullName}`, query : `${query}`};
  
    if (localStorage.getItem(searchText.toLowerCase())){
      console.log('already saved');
    } else {
      search_history.push(searchText.toLowerCase());
      localStorage.setItem('search-history-list', JSON.stringify(search_history));
      localStorage.setItem(searchText.toLowerCase(), JSON.stringify(searchHistoryItem));
      var searchItemButton = document.createElement("button");
      searchItemButton.value=query;
      searchItemButton.name=name;
      searchItemButton.textContent=name;
      searchItemButton.classList = "list-group-item list-group-item-action btn-history";
      searchHistoryEl.appendChild(searchItemButton);
    }
    var date = moment().format('MM/DD/YY');
   
   
    var queryString=`${name},${state},${country}`;
    //cardTitleEl = document.createElement("h3")
    var currentWeatherColEl = document.createElement("div");
    let currentWeatherCardEl = document.createElement("div");

    currentWeatherColEl.className = "col";
    currentWeatherColEl.id = "weather-top-col"
    console.log("geodata")
    currentWeatherCardEl.innerHTML = `<div class="card-title"><p class="display-4">${fullName}</p></div>
    <span id="weather-icon"><h5 class="card-text text-muted">Current weather - ${date}</span></h5>`;
    currentWeatherColEl.className = "col";
    currentWeatherColEl.id = "weather-top-col"
    currentWeatherCardEl.className = "card my-2";
    currentWeatherCardEl.id = "weather-top-card"
    // searchHistory
    // responseEl.appendChild(currentWeatherColEl)
    currentWeatherColEl.appendChild(currentWeatherCardEl)
    responseEl.appendChild(currentWeatherColEl);

    return getOneCall(`https://api.openweathermap.org/data/2.5/onecall?${query}`);

    }
    });
  }
  var formSubmitHandler = function(event) {
    event.preventDefault();  
    if (event.target.matches('#new-search-city')) return;

    var storedValue = localStorage.getItem(event.submitter.name);
    var parsedValue = JSON.parse(storedValue);
    console.log(storedValue);
    var storedName = parsedValue.fullName;
    var date = moment().format('MM/DD/YY');
    var currentWeatherColEl = document.createElement("div");
    let currentWeatherCardEl = document.createElement("div");
    var storedQuery = parsedValue.query;
    currentWeatherColEl.className = "col";
    currentWeatherColEl.id = "weather-top-col"
    currentWeatherCardEl.className = "card my-2";
    currentWeatherCardEl.id = "weather-top-card"
    currentWeatherCardEl.innerHTML = `<div class="card-title"><p class="display-4">${storedName}</p></div>
    <span id="weather-icon"><h5 class="card-text text-muted">Current weather - ${date}</h5></span>`;

    currentWeatherColEl.appendChild(currentWeatherCardEl)
    responseEl.appendChild(currentWeatherColEl);
    getOneCall(`https://api.openweathermap.org/data/2.5/onecall?${storedQuery}`);
    searchFormEl.reset();
  };
  renderSearchHistory();
  searchFormEl.addEventListener("submit",formSubmitHandler);
  searchHistoryEl.addEventListener('click', function(event){
    event.preventDefault();
    
    var storedValue = localStorage.getItem(event.target.name.toLowerCase());
    var parsedValue = JSON.parse(storedValue);
    console.log(storedValue);
    var storedName = parsedValue.fullName;
    var date = moment().format('MM/DD/YY');
    var currentWeatherColEl = document.createElement("div");
    let currentWeatherCardEl = document.createElement("div");

    var storedQuery = parsedValue.query;
    currentWeatherColEl.className = "col";
    currentWeatherColEl.id = "weather-top-col"
    currentWeatherCardEl.className = "card my-2";
    currentWeatherCardEl.id = "weather-top-card"
    
    console.log("geodata")
    currentWeatherCardEl.innerHTML = `<div class="card-title"><p class="display-4">${storedName}</p></div>
    <span id="weather-icon"><h5 class="card-text text-muted">Current weather - ${date}</h5></span>`;
    currentWeatherColEl.appendChild(currentWeatherCardEl)
    responseEl.appendChild(currentWeatherColEl);
        return getOneCall(`https://api.openweathermap.org/data/2.5/onecall?${storedQuery}`);
  });
  