// importing statements
import './style/style.scss'
import {
    removeHandler,
    saveTripHandler,
    fetchGeonames,
    getDateObject,
    fetchWeather,
    fetchPexabay,
    updatUI
} from "./js/app";


// add an event listener to the submit button on the trip form
document.getElementById('submit').addEventListener('click', saveTripHandler)

export {
    removeHandler,
    saveTripHandler,
    fetchGeonames,
    getDateObject,
    fetchWeather,
    fetchPexabay,
    updatUI,
}