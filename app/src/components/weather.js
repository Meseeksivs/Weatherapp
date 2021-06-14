import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const Weather = ()  => {

    let [city, setCity] = useState('Copenhagen');
    const [responseObj, setResponseObj] = useState({});
    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);


    function get_weather(e) {
    e.preventDefault();
        if (city.length === 0) {
            return setError(true);
        }

        setError(false);
        setResponseObj({});


        const uriEncodedCity = encodeURIComponent(city);
        fetch(`http://localhost:3081/api/weather?city=${uriEncodedCity}`, {
            "method": "GET",

        })
            .then(response => response.json())
            .then(response => {



                setResponseObj(response);

            })
            .catch(err => {
                console.log('error');
                setError(true);

                console.log(err.message);
            });

    }



    return (


        <div>

            <div>



            </div>
            <div className="widget" style={{margin: '10px', width: '600px'}}>
                <div className="panel panel-info">

                    <ul className="list-group ">
                        <li className="list-group-item list-group-item-primary">Weather in <b>{city}</b></li>
                        <li className="list-group-item">Temperature: <b>{responseObj.temperature} °C</b></li>
                        <li className="list-group-item">Humidity: <b>{responseObj.humidity}</b></li>
                        <li className="list-group-item">Wind: <b>{responseObj.wind} m/s {responseObj.direction}</b></li>
                        <li className="list-group-item">
                            <form onSubmit={get_weather} className="form-inline">
                                <div className="form-group">
                                    <input type="text" className="form-control" id="city" placeholder="City"
                                           value={city}
                                           onChange={(e) => setCity(e.target.value)}
                                    />
                                </div>
                                <button type="submit" className="btn btn-default">Search</button>
                            </form>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    )

}

export default Weather;