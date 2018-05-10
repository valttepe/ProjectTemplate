'use strict';

const list = (eventlist) => {
    for (let array of eventlist) {
        // create elements
        const link = document.createElement('a');
        const img = document.createElement('img');
        const title = document.createElement('h5');
        const user = document.createElement('small');
        const datetime = document.createElement('p');
        // Add classes
        link.classList.add('list-group-item', 'list-group-item-action',
            'flex-column', 'align-items-start');
        img.classList.add('img-thumbnail', 'rounded', 'float-left');
        title.classList.add('mb-1');
        datetime.classList.add('mb-1');

        // Add data from the db
        link.href = 'item?_id=' + array._id;
        img.src = 'images/' + array.thumb;
        title.innerHTML = array.title;
        user.innerHTML = array.username;
        datetime.innerHTML = array.datetime;

        const container = document.querySelector('.list-group');
        link.appendChild(img);
        link.appendChild(title);
        link.appendChild(user);
        link.appendChild(datetime);
        console.log(link);
        container.appendChild(link);
    }
};
const set = {
    method: 'GET',
    credentials: 'include',
};
const allList = () => {
    fetch('list/events', set)
    .then( (res) => {
        return res.json();
    })
    .then( (result) => {
        console.log(result);
        list(result);
    });
};

const placeList = (id) => {
    console.log(id);
    fetch('list/events?id=' + id, set)
    .then( (res) => {
        return res.json();
    })
    .then( (result) => {
        console.log(result);
        list(result);
    });
};

const getList = () => {
    const url = new URL(window.location.href);
    const id = url.searchParams.get('id');
    if (id != null) {
        placeList(id);
    } else {
        allList();
    }
};

getList();


