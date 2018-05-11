'use strict';

const set = {
    method: 'GET',
    credentials: 'include',
};

const url = new URL(window.location.href);
const id = url.searchParams.get('_id');

const enroll = () => {
    const data = {};
    data.id = id;
    const settings = {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(data),
        headers: {
            'content-type': 'application/json',
          },
    };
    fetch('/item/', settings)
    .then( (res) => {
        return res.json();
    })
    .then( (result) => {
        console.log(result);
        if(result.success == 'true') {
            const counter = document.querySelector('.count');
            data.count = data.count + 1;
            counter.innerHTML = 'Participants: '
            + data.count + '/' + data.endRange;
        }
    });

}

const setData = (data) => {
    // find elements
    const title = document.querySelector('h5');
    const img = document.querySelector('img');
    const user = document.querySelector('.user');
    const date = document.querySelector('.datetime');
    const counter = document.querySelector('.count');
    const detail = document.querySelector('.detail');
    const button = document.querySelector('#enroll-btn');

    // add fetched data
    title.innerHTML = data.title;
    img.src = 'images/' + data.medium;
    user.innerHTML = 'Owner: ' + data.username;
    date.innerHTML = 'Time: ' + data.datetime;
    counter.innerHTML = 'Participants: '
        + data.count + '/' + data.endRange;
    detail.innerHTML = 'About: ' + data.detail;

    button.addEventListener('click', (evt) => {
        console.log('clicked');
        enroll();
    });
};

fetch('/item/event?_id=' + id, set)
    .then( (res) => {
        return res.json();
    })
    .then( (result) => {
        console.log(result);
        setData(result);
    });

