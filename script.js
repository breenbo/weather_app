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
          var actualTemp_c=json.current_observation.temp_c;
          var actualFeelTemp_c=json.current_observation.feelslike_c;
          var actualIcon=json.current_observation.icon_url;
          var relativeHumidity=json.current_observation.relative_humidity;
          var windDir=json.current_observation.wind_dir;
          var wind=json.current_observation.wind_kph;
          var windGust=json.current_observation.wind_gust_kph;
          var pressureMb=json.current_observation.pressure_mb;
          var uv=json.current_observation.UV;
          var dewPoint_c=json.current_observation.dewpoint_c;
          $("#city").html("City of " + city);
          $("#actualIcon").attr("src", actualIcon)
          $("#actualTemp").html("Temperature : " + actualTemp_c);
          $("#actualFeelTemp").html("Feels like : " + actualFeelTemp_c);
          $("#relativeHumidity").html("Humidity : " + relativeHumidity);
          $("#dewPoint").html("Dew point : " + dewPoint_c);
          $("#windDir").html("Wind direction : " + windDir);
          $("#wind").html("Wind speed : " + wind + " kph");
          $("#windGust").html("Wind gust : " + windGust + " kph");
          $("#pressureMb").html("Atmospheric pressure : " + pressureMb + " mb");
          $("#uv").html("UV indice : " + uv);
          
          // display forecast for today
          
          // display hourly evolution for today
          
          // display forecast for future
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
