const axios = require("axios");
//fetch variables
url = "http://http://climatedataapi.worldbank.org/climateweb/rest/v1/country/";
mavg = "mavg/";
annualavg = "annualavg/";
//precipitation
pr = "pr/";
//temp
tas = "tas/";
start ="1970/";
end ="1999/";
ISO = "";

// url+mavg+tas+start+end+CAN

url2 = "http://climatedataapi.worldbank.org/climateweb/rest/v1/country/mavg/tas/1980/1999/USA"


// const url = "http://api.openweathermap.org/data/2.5/weather?q=";
// const key = "&appid=a87ae803577428dbda6ec98b6dafbeec";

// var city = "amsterdam";
// var units = '&units=metric'

const getData = async url => {
        try {
        const response = await axios.get(url2);
        const data = response.data;
        console.log(data[0].monthVals);
    } catch (error) {
        console.log(error);
    }
    };

getData(url);