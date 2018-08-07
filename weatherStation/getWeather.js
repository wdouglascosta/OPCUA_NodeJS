var fs = require("fs");
var key = fs.readFileSync("worldweatheronline.key");

console.log("a chave é: " + key);

function getCityWeather(city,callback) {
    var api_url="http://api.worldweatheronline.com/premium/v1/weather.ashx?key="+
    key+"&q="+
    city+ "&format=json&num_of_days=1&showlocaltime=yes"
    var options = {
        url: api_url,
        "content-type": "application-json",
        json: ""
    };
    var request = require("request");
    request(options, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        var data  = perform_read(city,body);
        callback(null,data);
      } else {
        callback(error);
      }
    });
}

function perform_read(city,body) {
    var obj = JSON.parse(body);
    var current_condition = obj.data.current_condition[0];
    var timezone = obj.data.time_zone[0];
    var request = obj.data.request[0];
    return  {
        city:               request.query,
        date:               timezone.localtime,
        observation_time:   current_condition.observation_time,
        temperature:        parseFloat(current_condition.temp_C),
        humidity:           parseFloat(current_condition.humidity),
        pressure:           parseFloat(current_condition.pressure),
        weather:            current_condition.weatherDesc.value
    };
}
var city = "Maringa";
getCityWeather(city,function(err,data) {
    if (!err) {
   
        console.log(" cidade =",data.city);
        console.log(" data e hora local =",data.date);
        console.log(" hora da medição =",data.observation_time);
        console.log(" temperatura =",    data.temperature);
        console.log(" pressão do ar =",    data.pressure);
        console.log(" humidade =",    data.humidity);
    }
});