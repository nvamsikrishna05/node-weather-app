'use strict';

const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for Express Configs
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectory));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Vamsi'
    });
});

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'Vamsi'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Find FAQs here for help.',
        title: 'Help Page',
        name: 'Vamsi'
    });
});

app.get('/weather', (req, res) => {

    if (!req.query.address){
        return res.send({
            error: 'You must provide an address'
        });
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {

        if(error){
            return res.send({
                error: error
            });
        }

        forecast(latitude, longitude, (error, data) => {
            if(error){
                return res.send({
                    error: error
                });
            }

            res.send({
                forecast: data,
                location: location,
                address: req.query.address
            });

        });


    });


});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Not Found Page',
        errorMessage: 'Help Article Not Found',
        name: 'Vamsi'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Not Found Page',
        name: 'Vamsi',
        errorMessage: 'Page Not Found'
    });
});

app.listen(3000, () => {
    console.log('Server is started on port 3000');
});

