'use strict';
console.log('does this work');
const list = (eventlist) => {
    for (let array of eventlist) {
        // create elements
        const link = document.createElement('a');
        const img = document.createElement('img');
        const title = document.createElement('h5');
        const user = document.createElement('small');
        const datetime = document.createElement('p');
        console.log(link);
        // Add classes
        link.classList.add('list-group-item', 'list-group-item-action',
            'flex-column', 'align-items-start');
        img.classList.add('img-thumbnail', 'rounded', 'float-left');
        title.classList.add('mb-1');
        datetime.classList.add('mb-1');

        // Add data from the db
        link.href = '/list/item?id=' + array.id;
        img.src = 'images/' + array.thumb;
        title.innerHTML = array.title;
        user.innerHTML = array.username;
        datetime.innerhtml = array.datetime;

        const container = document.querySelector('.list-group');
        link.appendChild(img);
        link.appendChild(title);
        link.appendChild(user);
        link.appendChild(datetime);

        container.appendChild(link);
    }
};
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
        list(result);
    });

