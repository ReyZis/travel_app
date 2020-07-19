// importing statements
import './view/index.html';
import './style/style.scss'
import { submitHandler } from "./js/submitHandler";
import { removeHandler } from "./js/removeHandler";
import img from './media/paris-placeholder.jpg'

// add an event listener to the submit button on the trip form
document.getElementById('submit').addEventListener('click', submitHandler)

// add an event listener to every remove button on the page
document.querySelectorAll('.remove').forEach(button => {
    button.addEventListener('click', removeHandler)
});