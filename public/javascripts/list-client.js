'use strict';
console.log('does this work');
const set = {
    method: 'GET',
    credentials: 'include',
};

fetch('list/events', set)
    .then( (res) => {
        return res.json();
    })
    .then( (result) => {
        console.log(result);
    });

