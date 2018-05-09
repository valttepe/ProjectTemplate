'use strict';


class Schemas {
    constructor() {
    }

    catSchema() {
        const catSchema = {
            title: String,
            category: String,
            gender: {
                type: String,
                enum: ['Male', 'Female'],
                default: 'Male',
            },
            time: String,
            original: String,
            thumbnail: String,
            image: String,
            coordinates: {
                type: Object,
                default: {lat: 60.192059, lng: 24.945831},
            },
          };
        return catSchema;
    }

    eventSchema() {
        const eventSchema = {
            title: String,
            datetime: String,
            startRange: Number,
            endRange: Number,
            detail: String,
            id: String,
            username: String,
            original: String,
            medium: String,
            thumb: String,
        };
        return eventSchema;
    }

}

module.exports = new Schemas();
