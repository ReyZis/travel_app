console.log('removeHandler.js file is imported');

/**
 * 
 * @param {Event} event represent the event that was triggered from the submit button
 */
function removeHandler(event) {
    event.preventDefault()
    event.target.parentElement.remove();
}

export { removeHandler }