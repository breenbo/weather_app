    var maLatitude=48.847;
    var maLongitude=2.208;
    var apiKey="b8bcc556b7a1fd8c";

    function showPosition (position) {
        maLatitude=position.coords.latitude;
        maLongitude=position.coords.longitude;
        
        var conditionUrl="https://api.wunderground.com/api/" + apiKey + "/conditions/q/" + maLatitude + "," + maLongitude + ".json";
        // display current conditions
        $.getJSON(conditionUrl, function (json) {
            var city=json.current_observation.display_location.city;
            $("#city").html("City of " + city);
        // boucle if pour choisir ligne en farenheit ou celsius
            var actualTemp_c=json.current_observation.temp_c;
            $("#actualTemp").html("Temperature : " + actualTemp_c);
            var actualFeelTemp_c=json.current_observation.feelslike_c;
            $("#actualFeelTemp").html("Feels like : " + actualFeelTemp_c);
            var dewPoint_c=json.current_observation.dewpoint_c;
            $("#dewPoint").html("Dew point : " + dewPoint_c);
        //change to have https and i icons
            var actualIcon=json.current_observation.icon_url;
            var iconUrl=actualIcon.slice(0,4) + "s" + actualIcon.slice(4);
            var actualIconUrl=iconUrl.replace(/k/i,"i");
            $("#actualIcon").attr("src", actualIconUrl);
        //
            var relativeHumidity=json.current_observation.relative_humidity;
            $("#relativeHumidity").html("Humidity : " + relativeHumidity);
            var windDir=json.current_observation.wind_dir;
            $("#windDir").html("Wind direction : " + windDir);
        // boucle if si farenheit -> basculer en mph
            var wind=json.current_observation.wind_kph;
            $("#wind").html("Wind speed : " + wind + " kph");
            var windGust=json.current_observation.wind_gust_kph;
            $("#windGust").html("Wind gust : " + windGust + " kph");
        // boucle if si farenheit -> basculer en psi
            var pressureMb=json.current_observation.pressure_mb;
            $("#pressureMb").html("Atmospheric pressure : " + pressureMb + " mb");
            var pressureTrend=json.current_observation.pressure_trend;
            $("#pressureTrend").html("Pressure trend : " + pressureTrend + " mb");
            var uv=json.current_observation.UV;
            $("#uv").html("UV indice : " + uv);
        // display forecast
        var forecastUrl="https://api.wunderground.com/api/" + apiKey + "/forecast10day/q/" + maLatitude + "," + maLongitude + ".json";
        $.getJSON(forecastUrl, function(json) {
            var day=[];
            var high=[];
            var low=[];
            var wind=[];
            var windDir=[];
            var humidity=[];
            var iconUrl=[];
            var precip=[];
            var text=[];
            for (var i=0; i<8; i++) {
                day[i]=json.forecast.simpleforecast.forecastday[i].date.weekday;
                $("#day" + [i]).html(day[i]);
            // boucle if pour choisir ligne en farenheit ou celsius
                high[i]=json.forecast.simpleforecast.forecastday[i].high.celsius;
                $("#max"+[i]).html(high[i]);
                low[i]=json.forecast.simpleforecast.forecastday[i].low.celsius;
                $("#min"+[i]).html(low[i]);
            // boucle if si farenheit -> basculer en mph
                wind[i]=json.forecast.simpleforecast.forecastday[i].avewind.kph;
                $("#wind"+[i]).html(wind[i]);
                windDir[i]=json.forecast.simpleforecast.forecastday[i].avewind.dir;
                $("#windDir"+[i]).html(windDir[i]);
                humidity[i]=json.forecast.simpleforecast.forecastday[i].avehumidity;
                $("#humidity"+[i]).html(humidity[i]);
            // boucle if si farenheit -> basculer en in
                precip[i]=json.forecast.simpleforecast.forecastday[i].qpf_allday.mm;
                $("#precip"+[i]).html(precip[i]);
            }
            for (i=0; i<16; i++) {
            //change to have https url and i icons
                iconUrl[i]=json.forecast.txt_forecast.forecastday[i].icon_url;
                iconUrl[i]=iconUrl[i].slice(0,4) + "s" + iconUrl[i].slice(4);
                iconUrl[i]=iconUrl[i].replace(/k/i, "i");
                $("#picDay" + [i]).attr("src",iconUrl[i]);
            //
            //boucle if si farenheit -> basculer sur fctext
            text[i]=json.forecast.txt_forecast.forecastday[i].fcttext_metric;
            $("#text"+[i]).html(text[i]);
            }
          })
          // display hourly evolution for today
        var hourlyUrl="https://api.wunderground.com/api/" + apiKey + "/hourly/q/" + maLatitude + "," + maLongitude + ".json";
    }); 
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("webbrowser incompatible with html5 geolocation");
    }

// $.ajax({
    // url : "http://api.wunderground.com/api/b8bcc556b7a1fd8c/conditions/q/" + maLatitude + "," + maLongitude + ".json",
    // datatype : "jsonp",
    // success : function (parsed_json) {
        // var city = parsed_json['current_observation']['display_location']['city'];
        // var temp_c = parsed_json['current_observation']['temp_c'];
        // alert('current temperature in' + city + 'is ' + temp_c);
    // }
// })
