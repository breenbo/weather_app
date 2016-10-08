//
    var maLatitude=48.847;
    var maLongitude=2.208;
    var apiKey="b8bcc556b7a1fd8c";

    function showPosition (position) {
        maLatitude=position.coords.latitude;
        maLongitude=position.coords.longitude;
        
        // if loop for auto or manual setting : change var wundergroundUrl
        var wundergroundUrl="https://api.wunderground.com/api/" + apiKey + "/conditions/forecast10day/astronomy/hourly/q/" + maLatitude + "," + maLongitude + ".json";
        // display current conditions
        $.getJSON(wundergroundUrl, function (json) {
            var city=json.current_observation.display_location.city;
            $("#city").html("City of " + city);
        // boucle if pour choisir ligne en farenheit ou celsius
            var actualTemp_c=json.current_observation.temp_c;
            $("#actualTemp").html(" " + actualTemp_c + "°");
        // boucle if si farenheit -> basculer en mph
            var wind=json.current_observation.wind_kph;
            $("#wind").html(" " + wind + " kph");
        // boucle if si farenheit -> basculer en psi
            var pressureMb=json.current_observation.pressure_mb;
            $("#pressureMb").html(" " + pressureMb + " mb");
        // end if loop
            var icon=json.current_observation.icon;
        // skycons : change for pastel colors !!!!!!!!!!!!!
            var skycons = new Skycons({
                "monochrome":false,
                "colors" : {
                    "cloud" : "lightgray",
                    "sun" : "orange",
                    "rain" : "blue",
                    "leaf" : "green"
                }
            });
            var d = new Date();
            var h = d.getHours();
            if (h >= 7 && h <= 20) {
                skycons.add("actualIcon", Skycons[icon]);
            } skycons.add("actualIcon", Skycons["nt_" + icon]);
        //
            var relativeHumidity=json.current_observation.relative_humidity;
            $("#relativeHumidity").html(" " + relativeHumidity);
            var windDir=json.current_observation.wind_dir;
            $("#windDir").html(" " + windDir);
        //
        // display forecast
            var day=[];
            var high=[];
            var low=[];
            var wind=[];
            var windDir=[];
            var humidity=[];
            var iconUrl=[];
            var icon=[];
            var precip=[];
            var text=[];
            for (var i=0; i<8; i++) {
                day[i]=json.forecast.simpleforecast.forecastday[i].date.weekday;
                $("#day" + [i]).html(day[i] + '<span class="more">...</span>');
            // boucle if pour choisir ligne en farenheit ou celsius
                high[i]=json.forecast.simpleforecast.forecastday[i].high.celsius;
                $("#max"+[i]).html(" " + high[i] + "°");
                $("#max"+[i]).css("color", "red");
                low[i]=json.forecast.simpleforecast.forecastday[i].low.celsius;
                $("#min"+[i]).html(" " + low[i] + "°");
                $("#min"+[i]).css("color", "blue");
            // boucle if si farenheit -> basculer en mph
                wind[i]=json.forecast.simpleforecast.forecastday[i].avewind.kph;
                $("#wind"+[i]).html(" " + wind[i] + " kph");
                windDir[i]=json.forecast.simpleforecast.forecastday[i].avewind.dir;
                $("#windDir" + [i]).html(" " + windDir[i]);
                humidity[i]=json.forecast.simpleforecast.forecastday[i].avehumidity;
                $("#humidity"+[i]).html(" " + humidity[i] + " %");
            // boucle if si farenheit -> basculer en in
                precip[i]=json.forecast.simpleforecast.forecastday[i].qpf_allday.mm;
                $("#precip"+[i]).html(" " + precip[i] + "mm");
            }
            for (i=0; i<16; i++) {
                icon[i]=json.forecast.txt_forecast.forecastday[i].icon;
                skycons.add("picDay" + [i], Skycons[icon[i]]);
            //boucle if si farenheit -> basculer sur fctext
                text[i]=json.forecast.txt_forecast.forecastday[i].fcttext_metric;
                text[i]=text[i].replace(/\./gi, ".<br>")
                $("#text"+[i]).html(text[i]);
            }
            skycons.play();
          //
          // display sunset and sunrise
            var sunriseHour=json.moon_phase.sunrise.hour;
            var sunriseMinute=json.moon_phase.sunrise.minute;
            var sunsetHour=json.moon_phase.sunset.hour;
            var sunsetMinute=json.moon_phase.sunset.minute;
            $("#sunrise").html(" " + "0" + sunriseHour + ":" + sunriseMinute);
            $("#sunset").html(" " + sunsetHour + ":" + sunsetMinute);
          //
          // display hourly evolution for today
            var hour=[];
            var hourIcon=[];
            var hourTemp=[];
            var hourFr=[];
            for (i=0; i<24; i+=2) {
                hour[i]=json.hourly_forecast[i].FCTTIME.civil;
                hour[i]=hour[i].split(/\b/)[0];
                $("#hourly" + [i]).addClass("wi wi-time-" + hour[i]);
                hourTemp[i]=json.hourly_forecast[i].temp.metric;
                $("#hourlyTemp" + [i]).html(hourTemp[i] + "°");
                hourIcon[i]=json.hourly_forecast[i].icon;
               hourFr[i]=json.hourly_forecast[i].FCTTIME.hour; 
               if (hourFr[i] >= 7 && hourFr[i] <= 20) {
                    skycons.add("hourlyPic" + [i], Skycons[hourIcon[i]]);
               } skycons.add("hourlyPic" + [i], Skycons["nt_" + hourIcon[i]]);
            }
        // display background color depend on temperature
        // if loop for imperial unity
            var tmax=35;
            var tmin=0;
            var hot=0;
            var cold=250;
            var temp=20;
            var index=0;
            var indexComp=180;
            index=1/(tmax-tmin)*((actualTemp_c-tmin)*hot - (actualTemp_c-tmax)*cold);
            indexComp=index+120;
            $("h3").css("backgroundColor", "hsl(" + index + ",100%,60%)");
            $("#controlBar").css("backgroundColor", "hsl(" + indexComp + ",100%,60%)");
        })
    }


// card flip on click
$(".carte").click(function() {
    $(this).toggleClass("flipped");
});
//-----------------------------
// manual country and city
function manual() {
    var country=$("#country").val();
    var city=$("#ville").val();
    var wundergroundUrl2="https://api.wunderground.com/api/" + apiKey + "/conditions/forecast10day/astronomy/hourly/q/" + country + "/" + city + ".json";
    if (country=="") {
        alert("Please enter a country or use auto mode");
    } else if (city=="") {
        alert("Please enter a city or use auto mode");
    } else {
        alert(country + "/" + city);
    }
};


$("input:radio").click(function() {
    if ($("#searchManual").is(":checked")) {
        $("input:text").css("display", "block");
        $("#send").css("display", "block");
        $("#send").click(function() {
            manual();
        });
    } else if ($("#searchAuto").is(":checked")) {
        $("input:text").css("display", "none");
        $("#send").css("display", "none");
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            alert("webbrowser incompatible with html5 geolocation");
        }
    }
    if ($("#celsius").is(":checked")) {
        // alert("Metric Mode Dude !");
    }
});
