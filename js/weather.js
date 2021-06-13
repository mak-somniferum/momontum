const weather = document.querySelector('.weather');
const iconText = weather.querySelector('.icon');
const tempText = weather.querySelector('.temp');
const placeText = weather.querySelector('.place');

const API_KEY = '69c4a33f49465e07c0e3681d8569d5d2'; // (openWeatherMap API)
const COORDS_LS = 'coords';

function getWeather(lat, lng){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json();
    }).then(function(json){
        tempText.innerText = `${json.main.temp}°`;
        placeText.innerText = json.name;
        iconText.innerHTML = `<image src='http://openweathermap.org/img/wn/${json.weather[0].icon}.png'>`;
    })
}

function saveCoords(coords){
    localStorage.setItem(COORDS_LS, JSON.stringify(coords));
}

function geoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {latitude, longitude};

    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function geoError(){
    console.log('Cant access geo location');
}

function getCoords(){
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError)
}

const currentCoords = localStorage.getItem(COORDS_LS);
if(currentCoords){
    const parseCoords = JSON.parse(currentCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
} else {
    getCoords();
}
