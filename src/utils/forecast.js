'use strict';

const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/99249505149700cc7c407c68ca1e54ea/${latitude},${longitude}?units=si`;

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to Weather service', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {

            callback(undefined, `${body.daily.data[0].summary} .It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain.`);
        }
    });
};

module.exports = forecast;