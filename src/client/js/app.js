// requiring the node-fetch and a regenerator-runtime so the test won't fail
const fetch = require("node-fetch");
import 'regenerator-runtime/runtime';
//importing the image that will appear if no image was founded about the place
import notFound from '../media/not-found.jpg'

//the function will load once the page is loaded so the trips will be there even when the user refresh the page
window.onload = async() => {
    //fetching the trips data drom the server
    const tripsData = await getProjectData('/all');
    try {
        //using foreach loop to display the trips
        tripsData.forEach(tripData => {
            const trip = makeTripDiv(tripData.location, tripData.leftDays, tripData.weather, tripData.image, tripData.departing)
            document.getElementById('trips').appendChild(trip)
        });
    } catch (error) {
        console.log(error);
    }
}

/**
 * @description this is the event listener that will be loaded whenever the user press the remove button
 * @param {Event} event represent the event that was triggered from the submit button
 */
const removeHandler = (event) => {
    event.target.parentElement.remove();
}

/**
 * @description this is the async event listener that will be loaded when the user press thesubmit button
 * @param {Event} event represent the event that was triggered from the submit button
 */
const saveTripHandler = async(event) => {
    //preventing the default listener of the submit
    event.preventDefault();

    // setting variable that hold the value of the trip and daparting day
    const location = document.getElementById('location').value;
    const departing = document.getElementById('departing').value;

    //cheking that the loaction and daprting areas are not empty
    if (location && departing) {
        //fetching the geonames api to get the lat and lng of the place
        const LatLng = await fetchGeonames(location)

        // checking that the lat and lng are actually defined
        if (LatLng.hasLatLng) {
            //making a new date object and calculating the days until the trip
            const departingDay = getDateObject(departing);
            const today = new Date(Date.now())
            const leftDays = Math.floor((departingDay - today) / 1000 / 60 / 60 / 24);

            //fetching the weatherbit api to get the forecasting of the weather
            const weather = await fetchWeather(LatLng, leftDays)

            //fetching the pexabay api to get an image of the place
            const image = await fetchPexabay(location);

            //updating the user interface to display the new trip details
            const trip = makeTripDiv(location, leftDays, weather, image, departing)
            document.getElementById('trips').appendChild(trip)

            //making the input area empty again
            document.getElementById('location').value = '';
            document.getElementById('departing').value = '';

            //saving the details of the trip to the server endpoint
            postData('/addEntry', { location, leftDays, weather, image, departing });
        } else {
            //an alert message will show up if the location is not found
            alert('sorry, location not valid')
        }
    } else {
        //an alert message will show up if the location or the departing fields are empty
        alert('enter a location, and a date, please')
    }
}

/**
 * @description an async function to fetch the geonames api
 * @param {string} location a string of the chosen destination
 * @returns {object} that hold a truthy boolean that clearify whether there a data found or not and the lat/lng of the place and there is any
 */
const fetchGeonames = async(location) => {
    //setting a basic variables to fetch the api
    const base = 'http://api.geonames.org/searchJSON?';
    const username = '&username=mohamed_rami';

    //encoding the string to an url format
    const encodedLocation = encodeURI(`q=${location}`);

    //fetching the api
    const res = await fetch(base + encodedLocation + username)
    try {
        const data = await res.json();
        //checking if there are any result founded
        if (data.totalResultsCount) {
            return { hasLatLng: true, Lat: data['geonames'][0]['lat'], Lng: data['geonames'][0]['lng'] }
        } else {
            return { hasLatLng: false }
        }
    } catch (error) {
        console.log("error", error)
    }
}

/**
 * @description - a function that extract the date and convert it to a Date object
 * @param {String} date - a string that hold the date chosen for the trip
 * @returns {Date} - a date object that of the trip day
 */
const getDateObject = (date) => {
    const month = date.slice(0, 2);
    const day = date.slice(3, 5);
    const year = date.slice(6, 10);

    const dateObject = new Date(year, month - 1, day);
    return dateObject;
}


/**
 * @description an async function that fetches the weatherbit api to get the forecating of the weather
 * @param {object} location - an object that hold the lat/lng of the chosen destibation
 * @param {number} days - the nubmer of the left days until the trip
 * @returns {object} that hold a truthy boolean that clearify whether there a data found or not and the description of the weather, the max/min temperature if there is any
 */
const fetchWeather = async(location, days) => {
    //setting a basic variables to fetch the api
    const base = 'https://api.weatherbit.io/v2.0/forecast/daily?';
    const LatLng = `lat=${location["Lat"]}&lon=${location["Lng"]}`;
    const apiKey = '&key=a71e4388332a4789bf588b0150c37dd4';

    const res = await fetch(base + LatLng + apiKey)
    try {
        //checking if trip is further than the api can forecast
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

/**
 * @description - an async functionthat will fetch the pexabay api
 * @param {string} location a string of the chosen destination
 * @returns {string} - an url of the image that will appear with the trip
 */
const fetchPexabay = async(location) => {
    //setting a basic variables to fetch the api
    const base = 'https://pixabay.com/api/?';
    const apiKey = 'key=17570884-65df4438aa1c4c3b5af7cda67&';
    const encodedLocation = encodeURI(`q=${location}&`);
    const type = 'image_type=photo';

    //fetching the api
    const response = await fetch(base + apiKey + encodedLocation + type)
    try {
        const data = await response.json();

        if (data.totalHits) {
            return data['hits'][0]['webformatURL']
        } else {
            return notFound
        }
    } catch (error) {
        console.log(error);
    }
}

/**
 * @description - the function that will make a div elemnt that is ready to be appended to the DOM
 * 
 * @param {string} location - a string that holde the chosen destination
 * @param {number} days - the nubmer of the left days until the trip
 * @param {object} weatherObj - an object that hold the max/min temperature and the description of the weather
 * @param {string} imageUrl - a string of the url of the place's image
 * @param {string} departingDate - string that hold the day of the trip
 * 
 * @returns {HTMLDivElement} - div that have all the information about the trip
 */
const makeTripDiv = (location, days, weatherObj, imageUrl, departingDate) => {
    //a div that will hold the trip information
    const tripContainer = makeDiv("trip-container");

    //a div that will hold the image
    const imgContainer = makeDiv("image-container");
    const img = new Image();
    img.src = imageUrl;
    imgContainer.appendChild(img);

    //a div that will hold the general information of the trip
    const detailsContainer = makeDiv('details-container');
    const location_p = makeElem('p', `My trip to: ${location}`);
    const departing_p = makeElem('p', `Departing: ${departingDate}`);
    detailsContainer.appendChild(location_p);
    detailsContainer.appendChild(departing_p);

    //a button that have an event listener to remove the trip later if needed
    const btn = makeElem('button', `remove trip`);
    btn.setAttribute('class', 'remove');
    btn.addEventListener('click', removeHandler)

    //a div that will hold the trip length
    const countDown = makeDiv('left-time');
    const countDownDays = makeElem('p', `${location} is ${days} days away`);
    countDown.appendChild(countDownDays);

    //a div that will hold the details about the weather
    const weatherContainer = makeDiv('weather');
    const intro_p = makeElem('p', `Typical weather for then is:`);
    weatherContainer.appendChild(intro_p);
    //checking if there is a max/min temperature data
    if (weatherObj.hasDetails) {
        const temp_p = makeElem('p', `High ${weatherObj['maxTemp']}, Low ${weatherObj['minTemp']}`);
        weatherContainer.appendChild(temp_p);
    }
    const description_p = makeElem('p', `${weatherObj['description']}`);
    weatherContainer.appendChild(description_p);

    // appending all the divs in the trip container
    tripContainer.appendChild(imgContainer);
    tripContainer.appendChild(detailsContainer);
    tripContainer.appendChild(btn);
    tripContainer.appendChild(countDown);
    tripContainer.appendChild(weatherContainer);
    return tripContainer;
}

/**
 * @description - a function that make a dic and give it the needed classes
 * 
 * @param {string} classes - a string that hold the classes that will be assigned to the fiv element
 */
const makeDiv = (classes) => {
    const div = document.createElement('div');
    div.setAttribute('class', classes);
    return div;
}

/**
 * @description - a function that will make an html element and append a text node to it
 * 
 * @param {string} elem - a string that will determing the type of the elemnt
 * @param {string} text - the value of the text node that
 */
const makeElem = (elem, text) => {
    const e = document.createElement(elem);
    const textNS = document.createTextNode(text);
    e.append(textNS);
    return e;
}

/* Function to POST data on the express server */
const postData = async(url = '', data = {}) => {
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

/* Function to GET Project Data from the express server */
const getProjectData = async(url = '') => {
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
    makeTripDiv
}