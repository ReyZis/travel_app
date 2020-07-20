// importing statements
import './view/index.html';
import './style/style.scss'
import { removeHandler } from "./js/removeHandler";
import { saveTripHandler } from "./js/submitHandler";
import img from './media/paris-placeholder.jpg'


// add an event listener to the submit button on the trip form
document.getElementById('submit').addEventListener('click', saveTripHandler)

// add an event listener to every remove button on the page
document.querySelectorAll('.remove').forEach(button => {
    button.addEventListener('click', removeHandler)
});

export {
    removeHandler,
    saveTripHandler
}