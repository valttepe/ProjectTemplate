'use strict';

const logout = () => {
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
            });
    });
};

document.addEventListener('DOMContentLoaded', (evt) => {
    logout();
}, false);

