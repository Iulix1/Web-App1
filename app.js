// const api = {
//    key: 'e8132a8ccac0e8b808ef23c997a7a976',
//    base: 'https://api.openweathermap.org/data/2.5/'
// }

// const searchbox = document.querySelector('.search-box');
// searchbox.addEventListener('keypress', setQuery);

// function setQuery (evt) {
//    if (evt.keyCode == 13) {
//      getResults(searchbox.value);
//    }
// }

// function getResults (query) {
//    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
//      .then(weather => {
//        return weather.json();
//    }).then(displayResults);
// }

// function displayResults (weather) {
  
//    let city = document.querySelector('.location .city');
//    city.innerText = `${weather.name}, ${weather.sys.country}`;

//    let now = new Date();
//    let date = document.querySelector('.location .date');
//    date.innerText = dateBuilder(now);

//    let temp = document.querySelector('.current .temp');
//    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

//    let weather_el = document.querySelector('.current .weather');
//    weather_el.innerText = weather.weather[0].main;

//    let hilow = document.querySelector('.hi-low');
//    hilow.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;
// }


let weather = {
   "apiKey": "e8132a8ccac0e8b808ef23c997a7a976",
   fetchWeather: function(city) {
      fetch(
         "https://api.openweathermap.org/data/2.5/weather?q=" 
         + city 
         + "&units=metric&appid=" 
         + this.apiKey
         )
         .then((response) => response.json())
         .then((data) => this.displayWeather(data));
      },
      displayWeather: function(data) {
         const { name } = data;
         const { description } = data.weather[0];
         const { temp, humidity } = data.main;
         const { speed } = data.wind;
         const { country } = data.sys;
         const { feels_like, temp_min, temp_max } = data.main;
         document.querySelector('.city').innerText = 'Weather in ' + name + ', ' + country;
         document.querySelector('.weather').innerText = description;
         document.querySelector('.temp').innerText = Math.floor(temp) + "°C";
         document.querySelector('.humidity').innerText = 'Humidity: ' + humidity + '%';
         document.querySelector('.wind-speed').innerText = 'Wind Speed: ' + speed + 'km/h';
         document.querySelector('.feels').innerText = 'Feels Like ' + Math.floor(feels_like) + '°C';
         document.querySelector('.hi-low').innerText = Math.floor(temp_max) + '°C / ' + Math.floor(temp_min) + '°C';
         document.querySelector('main').classList.remove('loading');
         document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')"
      },
      search: function ()  {
          this.fetchWeather(document.querySelector('.search-box').value);
      }
   }


   function dateBuilder(d) {
      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "November", "December"];
      let days = ["Sunday", "Monday", "Tuesday","Wednesday", "Thursday", "Friday", "Saturday"];
   
      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();
   
      return `${day} ${date} ${month} ${year}`;
   }

   let now = new Date();
   document.querySelector('.date').innerText = dateBuilder(now);


// document.querySelector('.search-box').addEventListener('click', function (){
//       weather.search();
// });


document.querySelector('.search-box').addEventListener('keyup', function(event) {
      if (event.key === 'Enter') {
          weather.search();
      }
});
