'use strict';

// Datetime picker function
$(() => {
    $('#datetimepicker1').datetimepicker();
    });

// Range slider

const slider = document.querySelector('.slider');
const output = document.querySelector('.value');
console.log(slider);
console.log(output);
output.innerHTML = 'Count: ' + slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = () => {
    output.innerHTML = 'Count: ' + slider.value;
};


const addEventForm = document.querySelector('#add-event');
addEventForm.addEventListener( 'submit', (evt) => {
    evt.preventDefault();
    const fData = new FormData(evt.target);
    // Check that formdata has values
    for (let value of fData.values()) {
        console.log(value);
    }
    const settings = {
        method: 'post',
        credentials: 'include',
        body: fData,
    };
    // First then return must return promise
    // next is for using response data.
    fetch('add-event/new', settings)
        .then( (response) => {
            return response;
        }).then( (result) => {
            console.log(result);
            // window.location.replace('/');
        }
    );
});

