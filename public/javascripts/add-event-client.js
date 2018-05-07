'use strict';

// Datetime picker function
$(() => {
    $('#datetimepicker1').datetimepicker();
    });

// Range slider

const startSlider = document.querySelector('.start-slider');
const start = document.querySelector('.start');
start.innerHTML = 'Count: ' + startSlider.value;

// Update the current slider value (each time you drag the slider handle)
startSlider.oninput = () => {
    start.innerHTML = 'Count: ' + startSlider.value;
};

const endSlider = document.querySelector('.end-slider');
const end = document.querySelector('.end');
end.innerHTML = 'Count: ' + endSlider.value;

// Update the current slider value (each time you drag the slider handle)
endSlider.oninput = () => {
    end.innerHTML = 'Count: ' + endSlider.value;
};


const addEventForm = document.querySelector('#add-event');
addEventForm.addEventListener( 'submit', (evt) => {
    evt.preventDefault();
    const url = new URL(window.location.href);
    const id = url.searchParams.get('id');
    const fData = new FormData(evt.target);
    fData.append('id', id);
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
    fetch('add-event/', settings)
        .then( (response) => {
            return response;
        }).then( (result) => {
            console.log(result);
            // window.location.replace('/');
        }
    );
});

