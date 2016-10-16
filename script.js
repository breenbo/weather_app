//
    var maLatitude=48.847;
    var maLongitude=2.208;
    var apiKey="b8bcc556b7a1fd8c";
    var wundergroundUrl="";
    var actualTemp_c=0;
    var actualTemp_f=32;
    var heightBackToday=0;
    var heightFaceToday=0;
    var heightBackTomorrow=0;
    var heightFaceTomorrow=0;
    var heightBackNext=0;
    var heightFaceNext=0;
    var locaTime="";
    var date=0;
    var h=0;

function showPosition (position) {
        maLatitude=position.coords.latitude;
        maLongitude=position.coords.longitude;
        wundergroundUrl="https://api.wunderground.com/api/" + apiKey + "/conditions/forecast10day/astronomy/hourly/q/" + maLatitude + "," + maLongitude + ".json";
        getAndDisplay(wundergroundUrl);
}

function getAndDisplay (wundergroundUrl) {
        // display current conditions
        $.getJSON(wundergroundUrl, function (json) {
            if (typeof json.current_observation === "undefined") {
                alert("Sorry, unable to find the city...");
            } else {
                var city=json.current_observation.display_location.city;
                $("#city").html(city);
            }

        // get local time of observation
        localTime=json.current_observation.observation_time;
        $("#localTime").html(localTime);

        // display current time and theme
        currentTime();

        // if loop for celsius or fahrenheit
            if ($("#celsius").is(":checked")) {
                actualTemp_c=json.current_observation.temp_c;
                $("#actualTemp").html(" " + actualTemp_c + "°");
                var wind=json.current_observation.wind_kph;
                $("#wind").html(" " + wind + " kph");
                var pressureMb=json.current_observation.pressure_mb;
                $("#pressureMb").html(" " + pressureMb + " mb");
            } else {
                actualTemp_f=json.current_observation.temp_f;
                $("#actualTemp").html(" " + actualTemp_f + "°");
                var wind=json.current_observation.wind_mph;
                $("#wind").html(" " + wind + " mph");
                var pressureIn=json.current_observation.pressure_in;
                $("#pressureMb").html(" " + pressureIn + " in");
            }
        // end if loop
        // set current icon
            var actualIcon=json.current_observation.icon;
            console.log(actualIcon);
            
            // d = new Date();
            // h = d.getHours();
            if (h >= 7 && h <= 20) {
                $("#actualIcon").removeClass();
                $("#actualIcon").addClass("bigPicture wi wi-wu-" + actualIcon);;
            } else {
                $("#actualIcon").removeClass();
                $("#actualIcon").addClass("bigPicture wi wi-wu-nt_" + actualIcon);;
            }
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
                $("#day" + [i]).html(day[i] + '<span class="more">+</span>');
        // if loop for metric or imperial units
            if ($("#celsius").is(":checked")) {
                high[i]=json.forecast.simpleforecast.forecastday[i].high.celsius;
                $("#max"+[i]).html(" " + high[i] + "°");
                $("#max"+[i]).css("color", "hsl(0,70%,50%)");
                low[i]=json.forecast.simpleforecast.forecastday[i].low.celsius;
                $("#min"+[i]).html(" " + low[i] + "°");
                $("#min"+[i]).css("color", "hsl(250,70%,50%)");
                wind[i]=json.forecast.simpleforecast.forecastday[i].avewind.kph;
                $("#wind"+[i]).html(" " + wind[i] + " kph");
                precip[i]=json.forecast.simpleforecast.forecastday[i].qpf_allday.mm;
                $("#precip"+[i]).html(" " + precip[i] + " mm");
            } else {
                high[i]=json.forecast.simpleforecast.forecastday[i].high.fahrenheit;
                $("#max"+[i]).html(" " + high[i] + "°");
                $("#max"+[i]).css("color", "hsl(0,70%,50%)");
                low[i]=json.forecast.simpleforecast.forecastday[i].low.fahrenheit;
                $("#min"+[i]).html(" " + low[i] + "°");
                $("#min"+[i]).css("color", "hsl(250,70%,50%)");
                wind[i]=json.forecast.simpleforecast.forecastday[i].avewind.mph;
                $("#wind"+[i]).html(" " + wind[i] + " mph");
                precip[i]=json.forecast.simpleforecast.forecastday[i].qpf_allday.in;
                $("#precip"+[i]).html(" " + precip[i] + " in");
            }
                windDir[i]=json.forecast.simpleforecast.forecastday[i].avewind.dir;
                $("#windDir" + [i]).html(" " + windDir[i]);
                humidity[i]=json.forecast.simpleforecast.forecastday[i].avehumidity;
                $("#humidity"+[i]).html(" " + humidity[i] + " %");
            }
        // display big weather icons
            for (i=0; i<6; i++) {
                icon[i]=json.forecast.txt_forecast.forecastday[i].icon;
                $("#picDay" + [i]).removeClass();
                $("#picDay" + [i]).addClass("bigPicture wi wi-wu-" + icon[i]);;
            // if loop for metric or imperial units
                if ($("#celsius").is(":checked")) {
                    text[i]=json.forecast.txt_forecast.forecastday[i].fcttext_metric;
                } else {
                    text[i]=json.forecast.txt_forecast.forecastday[i].fcttext;
                }
                text[i]=text[i].replace(/\./gi, ".<br>")
                $("#text"+[i]).html(text[i]);
            }
        // display medium weather icons
            for (i=6; i<16; i++) {
                icon[i]=json.forecast.txt_forecast.forecastday[i].icon;
                $("#picDay" + [i]).removeClass();
                $("#picDay" + [i]).addClass("smallPicture wi wi-wu-" + icon[i]);;
            // if loop for metric or imperial units
                if ($("#celsius").is(":checked")) {
                    text[i]=json.forecast.txt_forecast.forecastday[i].fcttext_metric;
                } else {
                    text[i]=json.forecast.txt_forecast.forecastday[i].fcttext;
                }
                text[i]=text[i].replace(/\./gi, ".<br>")
                $("#text"+[i]).html(text[i]);
            }
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
                $("#hourly" + [i]).removeClass(); // remove former class to avoid interference
                $("#hourly" + [i]).addClass("hourly wi wi-time-" + hour[i]);
            // if loop for metric or imperial units
                if ($("#celsius").is(":checked")) {
                    hourTemp[i]=json.hourly_forecast[i].temp.metric;
                } else {
                    hourTemp[i]=json.hourly_forecast[i].temp.english;
                }
                $("#hourlyTemp" + [i]).html(hourTemp[i] + "°");
            // display weather icons
                hourIcon[i]=json.hourly_forecast[i].icon;
                hourFr[i]=json.hourly_forecast[i].FCTTIME.hour;
                if (hourFr[i] >= 7 && hourFr[i] <= 20) {
                    $("#hourlyPic" + [i]).removeClass();
                    $("#hourlyPic" + [i]).addClass("tinyPicture wi wi-wu-" + hourIcon[i]);;
                } else {
                    $("#hourlyPic" + [i]).removeClass();
                    $("#hourlyPic" + [i]).addClass("tinyPicture wi wi-wu-nt_" + hourIcon[i]);;
                }
            }
        // get height of the cards for flip
            heightBackToday = $("#backToday").height()+10;
            heightFaceToday = $("#faceToday").height()+15;
            heightBackTomorrow = $("#backTomorrow").height()+10;
            heightFaceTomorrow = $("#faceTomorrow").height()+10;
            heightBackNext = $("#backNext").height()+10;
            heightFaceNext = $("#faceNext").height()+10;
            
            $(".f1_container").css("opacity","1");
            $(".f2_container").css("opacity","1");
            $("#endWeek").css("opacity","1");
            
            // display day or night theme - background color depend of temperature
            dayAndNight();
        })
}

function currentTime() {
    date = new Date;
    h = date.getHours();
    var m = date.getMinutes();
    $("#currentTitle").html("Current - " + h + ":" + m);
}

function dayAndNight() {
    if (h >= 7 && h <= 20) {
        tempColor("day");
    } else {
        tempColor("night");
        $("body").css("backgroundColor","hsl(30,0%,40%)");
        $(".card").css("backgroundColor","hsl(30,0%,60%)");
        $(".hourly").css("color","black");
        $(".more").css("color","hsl(30,12%,60%)");
    }
}

function tempColor(val) {
    // tmax and tmin define the range for the color palette
            // if loop for metric or imperial units
            var hot=0;
            var cold=250;
            var index=0;
            var indexComp=120;
            var tmaxC=35;
            var tminC=0;
            var tmaxF=95;
            var tminF=32;

            if (val==="day") {
                var light=40;
                var darkLight=30;
            } else if (val==="night") {
                var light=30;
                var darkLight=20;
            }
            if ($("#celsius").is(":checked")) {
                index=1/(tmaxC-tminC)*((actualTemp_c-tminC)*hot - (actualTemp_c-tmaxC)*cold);
            } else if ($("#fahrenheit").is(":checked")) {
                index=1/(tmaxF-tminF)*((actualTemp_f-tminF)*hot - (actualTemp_f-tmaxF)*cold);
            }
            indexComp=index+120;
            $("h3").css("backgroundColor", "hsl(" + index + ",100%," + light + "%)");
            $(".button").css("backgroundColor", "hsl(" + indexComp + ",100%,75%)");
            $("#controlBarFront").css("backgroundColor", "hsl(" + index + ",100%," + darkLight + "%)");
            $("#controlBarBack").css("backgroundColor", "hsl(" + index + ",100%," + darkLight + "%)");
}

// manual country and city
function manual() {
    var country=$("#country").val();
    var city=$("#ville").val();
    wundergroundUrl="https://api.wunderground.com/api/" + apiKey + "/conditions/forecast10day/astronomy/hourly/q/" + country + "/" + city + ".json";
    if (country=="") {
        alert("Please enter a country or an US state, or use auto mode");
    } else if (city=="") {
        alert("Please enter a city or use auto mode");
    }
}

//close, flip and get normal size
function close() {
    $(".carte2").toggleClass("flipped");
    $(".f3_container").css("height","30vw");
}

// use manual or auto mode
function autoManualData() {
    if ($("#searchManual").is(":checked")) {
        $("#send").click(function() {
            manual();
            getAndDisplay(wundergroundUrl);
            close();
        });
    } else if ($("#searchAuto").is(":checked")) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            alert("webbrowser incompatible with html5 geolocation");
        }
    }
}

function autoManualDisplay() {
    if ($("#searchManual").is(":checked")) {
        $("input:text").css("display", "block");
        $("#send").css("display", "block");
        $(".f3_container").css("height","45vw");
    } else if ($("#searchAuto").is(":checked")) {
        $("input:text").css("display", "none");
        $("#send").css("display", "none");
        $(".f3_container").css("height","30vw");
    }
}

function autoManualShadow() {
    if ($("#searchManual").is(":checked")) {
        $("#manual").removeClass("shadow");
        $("#auto").addClass("shadow");
    } else if ($("#searchAuto").is(":checked")) {
        $("#auto").removeClass("shadow");
        $("#manual").addClass("shadow");
    }
}

function celsiusFahrenheitShadow() {
    if ($("#celsius").is(":checked")) {
        $("#celsiusButton").removeClass("shadow");
        $("#fahrenheitButton").addClass("shadow");
    } else if ($("#fahrenheit").is(":checked")) {
        $("#celsiusButton").addClass("shadow");
        $("#fahrenheitButton").removeClass("shadow");
    }
}

// function for adaptative card size
function adaptativeCard(cardId, containerId, heightId) {
    $(cardId).toggleClass("flipped");
    $(containerId).css("height",heightId);
}

// display select auto or manual mode with shadow on button
$("input[name=search]").click(function() {
    autoManualData();
    autoManualShadow();
    autoManualDisplay();
});
$("#searchAuto").click(function() {
    autoManualData();
    autoManualShadow();
    autoManualDisplay();
    close();
});
// card flip on click, with adaptative size
$("#faceToday").click(function() {
    adaptativeCard("#today", ".f1_container", heightBackToday);
});
$("#backToday").click(function() {
    adaptativeCard("#today", ".f1_container", heightFaceToday);
});
$("#faceTomorrow").click(function() {
    adaptativeCard("#tomorrow", "#tomorrowContainer", heightBackTomorrow);
});
$("#backTomorrow").click(function() {
    adaptativeCard("#tomorrow", "#tomorrowContainer", heightFaceTomorrow);
});
$("#faceNext").click(function() {
    adaptativeCard("#next", "#nextContainer", heightBackNext);
});
$("#backNext").click(function() {
    adaptativeCard("#next", "#nextContainer", heightFaceNext);
});

// open option menu
$("#menu").click(function() {
    $(".carte2").toggleClass("flipped");
    autoManualDisplay();
});

// close option menu
$("#close").click(function() {
    close();
});

// select metric or imperial units
$("input[name=degre]").click(function(){
    celsiusFahrenheitShadow();
    getAndDisplay(wundergroundUrl);
    close();
});

// mode on refresh : depend of the radio checked, so call autoManual fct
autoManualData();
autoManualDisplay();
$(".f3_container").css("height","30vw");
