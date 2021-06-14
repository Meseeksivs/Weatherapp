const express = require('express');
const cors = require('cors');
const app = express(),
    bodyParser = require('body-parser');

const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 3080;
const fetch = require("node-fetch");
const api_key = process.env.API_KEY;
const api_url = process.env.API_URL;


    app.use(cors());
    app.use(bodyParser.json());

    app.get('/api/weather', (req, res) => {

        const city = req.query.city;


            url = encodeURI(api_url + "?q=" + city + "&units=metric&APPID=" + api_key);


         fetch(
            url
        )
            .then((response) => response.json())
            .then((data) => {


                const direction = degree_converter(data.wind.deg);
            

                 res.json({
                     'forecast': data.weather[0].description,
                     'temperature': data.main.temp,
                     'humidity' : data.main.humidity,
                     'wind': data.wind.speed,
                     'location': data.name,
                     'direction': direction
                 });



            })
            .catch(err => console.log(err));



    });



app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});

async function get_weather(city) {

   url = encodeURI(api_url + "?q=" + city + "&units=metric&APPID=" + api_key);

    const weather = [];
    await fetch(
        url
    )
        .then((response) => response.json())
        .then((data) => {

            weather['forecast'] = data.weather[0].description;
            weather['temperature'] = data.main.temp;
            weather['humidity'] = data.main.humidity;
            weather['wind'] = data.wind.speed;
            weather['name'] = data.name;

            const direction = degree_converter(data.wind.deg);
            weather['direction'] = direction;

            return weather;


        })
        .catch(err => console.log(err));



}


function degree_converter (value){
     value = parseFloat(value); if (value <= 11.25) return 'Nord'; value -= 11.25; var allDirections = ['Nord Nord Øst', 'Nord Øst', 'Øst Nord Øst', 'Øst', 'Øst Syd Øst', 'Syd Øst', 'Syd Syd Øst', 'Syd', 'Syd Syd Vest', 'Syd Vest', 'Vest Syd Vest', 'Vest', 'Vest Nord Vest', 'Nord Vest', 'Nord Nord Vest', 'Nord']; var dIndex = parseInt(value/22.5); return allDirections[dIndex] ? allDirections[dIndex] : 'Nord';
    }