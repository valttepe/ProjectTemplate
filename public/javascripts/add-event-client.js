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
