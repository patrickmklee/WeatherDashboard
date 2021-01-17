
//`https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}`
//`api.openweathermap.org/data/2.5/forecast?q={city name},{state code},{country code}&appid={API key}`
responseEl = document.getElementById("test-response");

const openweather_api_key = "5fc3f110a3d5d2428821e5494308d37e";
const gmaps_api_key = "AIzaSyC-gt3oXsbcFrzXPzQ3ZfTGkHwQvOn_flw";

function searchForCity() {
  // event.preventdefault();
    searchText = document.querySelector("#search-city").value.trim();
    console.log(`Searching for ${searchText}`)
    getCityForecast(`https://api.openweathermap.org/data/2.5/forecast?q=${searchText}&appid=${openweather_api_key}`);
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
       responseEl.innerHTML = `<h4>No results</h4>`
      } else {
        console.log(response);
          var country = response.city.country;
          var coord = response.city.coord;
          console.log(country);
          console.log(coord);
          responseEl.innerHTML = `<h4>${country}</h4>`;
      }
    });
  }
    //   // return getOneCall(`https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key} 

function myFunction() {
    fetch(
      // Make a fetch request to Wikipedia to get a random article title
      // `// YOUR CODE HERE`
      //
      `https://api.openweathermap.org/data/2.5/forecast?q=new york&appid=${openweather_api_key}`
    )
      .then(function(forecastResponse) {
        return forecastResponse.json();
      })
      .then(function(forecastResponse) {
        // Create a variable to hold the title of the Wikipedia article
        // YOUR CODE HERE
        //
        console.log(forecastResponse);
        // var title = wikiResponse.query.random[0].title;
        
        // console.log(title);
  
        // Display the article title above the GIF as a <h2> heading
        // YOUR CODE HERE
        //
        // wikiResponse.
        // var titleEl = document.getElementById("response-header");
        // titleEl.innerHTML = `<h2>${title}</h2>`;
        // var rating = document.getElementById('rating').value;
        // // Return a fetch request to the Giphy search API with the article title and rating parameters
        // // YOUR CODE HERE
        // //
        // let api_key='&api_key=rfhVXaTL030QmFPVM9lp1dxcPCcMZwzW';
        return;
        // return fetchGiphy('https://api.giphy.com/v1/gifs/search?q=' +
        // title +
        // "&rating="+rating
        // + api_key)
        // Remember to add your API key at the end
      })
     
  }
  
  function fetchGiphy(url) {
    fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      if (response.data.length === 0) {
        console.log('Giphy could not find anything for that.');
      } else {
        console.log(response.data[0]);
        var responseContainerEl = document.querySelector('#response-container');
        responseContainerEl.innerHTML = '';
        var gifImg = document.createElement('img');
        gifImg.setAttribute('src', response.data[0].images.fixed_height.url);
        responseContainerEl.appendChild(gifImg);
      }
    });
  }