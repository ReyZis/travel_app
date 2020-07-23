const fetch = require("node-fetch");
import 'regenerator-runtime/runtime';
import notFound from '../media/not-found.jpg'

window.onload = async() => {
    const tripsData = await getProjectData('/all');
    try {
        console.log(tripsData);
        tripsData.forEach(tripData => {
            const trip = updatUI(tripData.location, tripData.leftDays, tripData.weather, tripData.image, tripData.departing)
            document.getElementById('trips').appendChild(trip)
        });
    } catch (error) {
        console.log(error);
    }
}

/**
 * 
 * @param {Event} event represent the event that was triggered from the submit button
 */
function removeHandler(event) {
    event.target.parentElement.remove();
}

/**
 * 
 * @param {Event} event represent the event that was triggered from the submit button
 */
async function saveTripHandler(event) {
    event.preventDefault()
    const location = document.getElementById('location').value;
    const departing = document.getElementById('departing').value;
    if (location && departing) {
        const LatLng = await fetchGeonames(location)
        if (LatLng.hasLatLng) {
            const departingDay = getDateObject(departing);
            const today = new Date(Date.now())

            const leftDays = Math.floor((departingDay - today) / 1000 / 60 / 60 / 24);

            const weather = await fetchWeather(LatLng, leftDays)

            const image = await fetchPexabay(location);

            const trip = updatUI(location, leftDays, weather, image, departing)
            document.getElementById('trips').appendChild(trip)

            document.getElementById('location').value = '';
            document.getElementById('departing').value = '';

            postData('/addEntry', { location, leftDays, weather, image, departing });
        } else {
            alert('sorry, location not valid')
        }
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
        if (data.totalResultsCount) {
            return { hasLatLng: true, Lat: data['geonames'][0]['lat'], Lng: data['geonames'][0]['lng'] }
        } else {
            return { hasLatLng: false }
        }
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

async function fetchWeather(location, days) {
    const base = 'https://api.weatherbit.io/v2.0/forecast/daily?';
    const LatLng = `lat=${location["Lat"]}&lon=${location["Lng"]}`;
    const apiKey = '&key=a71e4388332a4789bf588b0150c37dd4';

    const res = await fetch(base + LatLng + apiKey)
    try {
        if (days > 16) {
            return {
                "hasDetails": false,
                "description": "we can't forecast the weather"
            }
        } else {
            const data = await res.json();
            return {
                "hasDetails": true,
                "maxTemp": data['data'][days]['max_temp'],
                "minTemp": data['data'][days]['min_temp'],
                "description": data['data'][days]['weather']['description']
            }
        }
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
        console.log(data);
        if (data.totalHits) {
            return data['hits'][0]['webformatURL']
        } else {
            return notFound
        }
    } catch (error) {
        console.log(error);
    }
}

function updatUI(location, days, weatherObj, imageUrl, departingDate) {

    const tripContainer = makeDiv("trip-container");
    const imgContainer = makeDiv("image-container");
    const img = new Image();
    img.src = imageUrl;
    imgContainer.appendChild(img);

    const detailsContainer = makeDiv('details-container');
    const location_p = makeElem('p', `My trip to: ${location}`);
    const departing_p = makeElem('p', `Departing: ${departingDate}`);
    detailsContainer.appendChild(location_p);
    detailsContainer.appendChild(departing_p);

    const btn = makeElem('button', `remove trip`);
    btn.setAttribute('class', 'remove');
    btn.addEventListener('click', removeHandler)

    const countDown = makeDiv('left-time');
    const countDownDays = makeElem('p', `${location} is ${days} days away`);
    countDown.appendChild(countDownDays);

    const weatherContainer = makeDiv('weather');
    const intro_p = makeElem('p', `Typical weather for then is:`);
    weatherContainer.appendChild(intro_p);
    if (weatherObj.hasDetails) {
        const temp_p = makeElem('p', `High ${weatherObj['maxTemp']}, Low ${weatherObj['minTemp']}`);
        weatherContainer.appendChild(temp_p);
    }
    const description_p = makeElem('p', `${weatherObj['description']}`);
    weatherContainer.appendChild(description_p);

    tripContainer.appendChild(imgContainer);
    tripContainer.appendChild(detailsContainer);
    tripContainer.appendChild(btn);
    tripContainer.appendChild(countDown);
    tripContainer.appendChild(weatherContainer);
    return tripContainer;
}

function makeDiv(classes) {
    const div = document.createElement('div');
    div.setAttribute('class', classes);
    return div;
}

function makeElem(elem, text) {
    const e = document.createElement(elem);
    const textNS = document.createTextNode(text);
    e.append(textNS);
    return e;
}

/* Function to POST data */
async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    try {
        const newEntry = response.json();
        return newEntry;
    } catch (error) {
        console.log("error", error);
    }
}

/* Function to GET Project Data */
async function getProjectData(url = '') {
    const response = await fetch(url)
    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("error", error);
    }
}


export {
    removeHandler,
    saveTripHandler,
    fetchGeonames,
    getDateObject,
    fetchWeather,
    fetchPexabay,
    updatUI
}