const fetch = require("node-fetch");


/**
 * 
 * @param {Event} event represent the event that was triggered from the submit button
 */
async function saveTripHandler(event) {
    event.preventDefault()
    const location = document.getElementById('location').value;
    const departing = document.getElementById('departing').value;
    if (location) {
        const LatLng = await fetchGeonames(location)

        const departingDay = getDateObject(departing);
        const today = new Date(Date.now())

        const leftDays = Math.floor((departingDay - today) / 1000 / 60 / 60 / 24);

        const weather = await fetchWeather(LatLng)
        try {
            if (leftDays > 16) {
                console.log("we can't forecast the weather")
            } else {
                console.log('max temp: ' + weather['data'][leftDays]['max_temp'])
                console.log('min temp: ' + weather['data'][leftDays]['min_temp'])
                console.log('weather is: ' + weather['data'][leftDays]['weather']['description'])
            }
        } catch (error) {
            console.log(error);
        }

        const image = await fetchPexabay(location);
        console.log(image);
    } else {
        alert('enter a location, and a date, please')
    }
}

async function fetchGeonames(location) {
    const base = 'http://api.geonames.org/searchJSON?';
    const username = '&username=mohamed_rami';
    const encodedLocation = encodeURI(`q=${location}`);
    const res = await fetch(base + encodedLocation + username)
    try {
        const data = await res.json();
        return { Lat: data['geonames'][0]['lat'], Lng: data['geonames'][0]['lng'] }
    } catch (error) {
        console.log("error", error)
    }
}

function getDateObject(date) {
    const month = date.slice(0, 2);
    const day = date.slice(3, 5);
    const year = date.slice(6, 10);

    const dateObject = new Date(year, month - 1, day);
    return dateObject;
}

async function fetchWeather(location) {
    const base = 'https://api.weatherbit.io/v2.0/forecast/daily?';
    const LatLng = `lat=${location["Lat"]}&lon=${location["Lng"]}`;
    const apiKey = '&key=a71e4388332a4789bf588b0150c37dd4';

    const res = await fetch(base + LatLng + apiKey)
    try {
        const data = res.json()
        return data
    } catch (error) {
        console.log(error);
    }
}

async function fetchPexabay(location) {
    const base = 'https://pixabay.com/api/?';
    const apiKey = 'key=17570884-65df4438aa1c4c3b5af7cda67&';
    const encodedLocation = encodeURI(`q=${location}&`);
    const type = 'image_type=photo';

    const response = await fetch(base + apiKey + encodedLocation + type)
    try {
        const data = await response.json();
        return data['hits'][0]['webformatURL']
    } catch (error) {
        console.log('error', error)
    }
}

export {
    saveTripHandler,
    fetchGeonames
}