console.log('submitHandler.js file is imported');

/**
 * 
 * @param {Event} event represent the event that was triggered from the submit button
 */
function saveTripHandler(event) {
    const location = document.getElementById('location').value;
    const departing = document.getElementById('departing').value;
    console.log(location, departing);
    event.preventDefault()
}

export { saveTripHandler as submitHandler }