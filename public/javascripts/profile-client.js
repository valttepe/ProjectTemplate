'use strict';

const list = (eventlist) => {
    for (let array of eventlist) {
        // create elements
        const link = document.createElement('div');
        const img = document.createElement('img');
        const title = document.createElement('h5');
        const user = document.createElement('small');
        const datetime = document.createElement('p');
        const group = document.createElement('div');
        const show = document.createElement('button');
        const remove = document.createElement('button');
        // Add classes
        link.classList.add('list-group-item', 'list-group-item-action',
            'flex-column', 'align-items-start');
        img.classList.add('img-thumbnail', 'rounded', 'float-left');
        title.classList.add('mb-1');
        datetime.classList.add('mb-1');
        group.classList.add('btn-group');
        show.classList.add('btn', 'btn-secondary');
        remove.classList.add('btn', 'btn-secondary');

        // Other attributes
        group.setAttribute('role', 'group');
        group.setAttribute('aria-label', 'modify buttons');



        // Add data from the db
        // link.href = '/list/item?id=' + array.id;
        img.src = 'images/' + array.thumb;
        title.innerHTML = array.title;
        user.innerHTML = array.username;
        datetime.innerHTML = array.datetime;
        show.innerHTML = 'Open';
        remove.innerHTML = 'Delete';

        show.addEventListener('click', (evt) => {
            console.log(array.id);
        });

        remove.addEventListener('click', (evt) => {
            console.log(array.id);
        });

        group.appendChild(show);
        group.appendChild(remove);

        const container = document.querySelector('.list-group');
        link.appendChild(img);
        link.appendChild(title);
        link.appendChild(user);
        link.appendChild(datetime);
        link.appendChild(group);
        console.log(link);
        container.appendChild(link);
    }
};

const logoutbtn = document.querySelector('#logout-btn');

logoutbtn.addEventListener('click', (evt) => {
    console.log('does it work');
    const set = {
        method: 'POST',
        credentials: 'include',
    };
    fetch('/logout', set)
        .then( (res) => {
            return res;
        })
        .then( (result) => {
            console.log(result);
            window.location.href = '/';
        });
});
const set = {
    method: 'GET',
    credentials: 'include',
};

fetch('profile/events', set)
    .then( (res) => {
        return res.json();
    })
    .then( (result) => {
        console.log(result);
        list(result);
    });
