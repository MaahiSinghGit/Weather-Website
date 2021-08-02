const { response } = require("express");
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: true }));
const port = 3000
const https = require("https");
//
app.listen(port, function () {
    console.log("server started");
})
app.get("/", function (request, response) {
    response.sendFile(__dirname + "/index.html");

})
app.post("/", function (request, response) {
    var cityName = request.body.cityname;
    api_key = "34356e7b8595fe72206fdebd05ec9cb2";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=" + api_key + "&units=metric";
    https.get(url, (res) => {
        res.on("data", (data) => {
            var weatherinfo = JSON.parse(data)
            var weather = weatherinfo.weather[0].main;
            var tem = weatherinfo.main.temp;
            var place = weatherinfo.name;
            var icon = weatherinfo.weather[0].icon;
            var iconURL = ("https://openweathermap.org/img/wn/" + icon + "@2x.png");
            response.write("<h1>The Weather in " + place + " is " + weather + " </h2>.");
            response.write("the temp in "+place+" is " + tem + "degree Celcius. <br>");
            response.write("<img src=" + iconURL + ">");
            response.send();
        })
    })
})
