console.log('submitHandler.js file is imported');
const url = 'http://api.geonames.org/searchJSON?name=algeria+djelfa&username=mohamed_rami'
const base = 'http://api.geonames.org/searchJSON?';
const username = '&username=mohamed_rami';

/**
 * 
 * @param {Event} event represent the event that was triggered from the submit button
 */
async function saveTripHandler(event) {
    event.preventDefault()
    const location = document.getElementById('location').value;
    const departing = document.getElementById('departing').value;
    if (location) {
        const encodedLocation = encodeURI(`q=${location}`);
        const res = await fetch(base + encodedLocation + username)
        try {
            const data = await res.json();
            console.log(data, data['geonames'][0]['lat'], data['geonames'][0]['lng'])
        } catch (error) {
            console.log("error", error)
        }
    } else {
        alert('enter location please')
    }
}

export { saveTripHandler }