const api = {
  key: '320d51e9dfe6c512c3b4210c3989c24a',
  base:'https://api.openweathermap.org/data/2.5'
}

const search = document.getElementById('search');

// CHECK IF BROWSER SUPPORTS GEOLOCATION
if('geolocation' in navigator){
  navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
   console.log('err')
}

// SET USER'S POSITION
function setPosition(position){
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  getWeather(latitude, longitude);
}

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error){
  alert(error);
}

const dateData = (d) => {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let yr = d.getFullYear();

  return `${day} ${date} ${month} ${yr}`;
}

// get weather data with latitude and longitude

const getWeather = (latitude, longitude) => {
  let data = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${api.key}`;;
  console.log(data);
  
  fetch(data).then((response) => {
    if(!response.ok) {
      throw Error(response.statusText);
    }

    return response;
  }).then((response) => response.json())
  .then((responceData) => {
    console.log(responceData);
    const city = document.querySelector('.city');
    city.innerText = `${responceData.name}, ${responceData.sys.country}`;
    const date = document.querySelector('.date');
    let now = new Date();
    date.innerText = `${dateData(now)}`;
    const temp = document.querySelector('.temp');
    temp.innerHTML = `${Math.round(responceData.main.temp)}<span>°c</span>`;
    const weather = document.querySelector('.weather');
    weather.innerText = responceData.weather[0].main;
    const hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(responceData.main.temp_min)}°c / ${Math.round(responceData.main.temp_max)}°c`;
  })
}

// get weather data with city name
const getWeatherData = (query) => {
  fetch(`${api.base}/weather?q=${query}&units=metric&APPID=${api.key}`)
  .then((response) => {
    if(!response.ok) {
      throw Error(response.statusText);
    }

    return response;
  })
  .then((response) => response.json())
  .then((responceData) => {
    console.log(responceData);
    const city = document.querySelector('.city');
    city.innerText = `${responceData.name}, ${responceData.sys.country}`;
    const date = document.querySelector('.date');
    let now = new Date();
    date.innerText = `${dateData(now)}`;
    const temp = document.querySelector('.temp');
    temp.innerHTML = `${Math.round(responceData.main.temp)}<span>°c</span>`;
    const weather = document.querySelector('.weather');
    weather.innerText = responceData.weather[0].main;
    const hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(responceData.main.temp_min)}°c / ${Math.round(responceData.main.temp_max)}°c`;
  })
  .catch((err) => alert(`there is an error: ${err}`))
}

const querySearch = (event) => {
  if (event.keyCode === 13) {
    console.log(search.value);
    getWeatherData(search.value);
  }
}


search.addEventListener('keypress', querySearch);

