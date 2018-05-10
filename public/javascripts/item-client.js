'use strict';

const set = {
    method: 'GET',
    credentials: 'include',
};

const url = new URL(window.location.href);
const id = url.searchParams.get('_id');

fetch('/item/event?_id=' + id, set)
    .then( (res) => {
        return res.json();
    })
    .then( (result) => {
        console.log(result);
    });

