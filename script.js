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
    var search="auto";

function showPosition (position) {
        maLatitude=position.coords.latitude;
        maLongitude=position.coords.longitude;
        wundergroundUrl="https://api.wunderground.com/api/" + apiKey + "/conditions/forecast10day/astronomy/hourly/q/" + maLatitude + "," + maLongitude + ".json";
        getAndDisplay(wundergroundUrl);
}

function getAndDisplay (wundergroundUrl) {
    // waiting message
    $("#city").css("color","white");
    $("#city").html("Looking through the window...")
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
                $("#picDay" + [i]).addClass("wi wi-wu-" + icon[i] + " smallPicture");;
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

            dayAndNight();
            $("#city").css("color", "black");
            $("#endWeek").css("min-height",heightFaceToday);
            $("#current").css("height",heightFaceToday);
            $(".f1_container").css("height",heightFaceToday);
        })
}

// checking manual or auto search and setting var search
function autoManualSearch() {
    if ($("#searchAuto").is(":checked")) {
        search="auto";
    } else if ($("#searchManual").is(":checked")) {
        search="manual";
    }
}

// setting footer depending of screen size
function footerSize() {
    if (window.matchMedia("(min-width:500px)").matches) {
        $("#foot").html('Designed and coded by <em>Bruno Berrehuel</em>. All right reserved. Powered by <a href="https://www.wunderground.com/">Wunderground</a> and <a href="https://erikflowers.github.io/weather-icons/">Weather Icons</a>.');
    } else {
        $("#foot").html('Designed and coded by <em>Bruno Berrehuel</em>. <br>All right reserved.<br>Powered by <a href="https://www.wunderground.com/">Wunderground</a> and <a href="https://erikflowers.github.io/weather-icons/">Weather Icons</a>.');
    }
}

function controlBarSize(val) {
    if (val==="manual") {
        var mobile="38vw";
        var tablet="18vw";
        var laptop="14vw";
    } else if (val==="auto") {
        var mobile="30vw";
        var tablet="11vw";
        var laptop="9vw";
    }
    if (window.matchMedia("(min-width:850px)").matches) {
        $(".f3_container").css("height",laptop);
    } else if (window.matchMedia("(min-width:500px)").matches) {
        $(".f3_container").css("height",tablet);
    } else {
        $(".f3_container").css("height",mobile);
    }
}

function currentTime() {
    date = new Date;
    h = date.getHours();
    var m = date.getMinutes();
    if (h<10) {
        h = "0" + h;
    }
    if (m<10) {
        m = "0" + m;
    }
    $("#currentTitle").html("Current - " + h + ":" + m);
}

function dayAndNight() {
    if (h >= 7 && h <= 20) {
        tempColor("day");
    } else {
        tempColor("night");
        $("body").css("backgroundColor","hsl(30,0%,40%)");
        $(".card").css("backgroundColor","hsl(30,0%,60%)");
        $("h4").css("border-top-color","hsl(30,0%,40%)");
        $(".hourly").css("color","black");
        $(".more").css("color","hsl(30,0%,60%)");
        $("input[type=text]").css("backgroundColor","hsl(30,0%,60%)");
    }
}

function tempColor(val) {
    // tmax and tmin define the range for the color palette
            // if loop for metric or imperial units
            var hot=0;
            var cold=250;
            var tmaxC=35;
            var tminC=0;
            var tmaxF=95;
            var tminF=32;
            var index=0;
            var indexComp=120;

            if (val==="day") {
                var lightSat=80;
                var light=50;
                var darkLightSat=80;
                var darkLight=30;
            } else if (val==="night") {
                var lightSat=80;
                var light=30;
                var darkLightSat=80;
                var darkLight=20;
            }
            if ($("#celsius").is(":checked")) {
                index=1/(tmaxC-tminC)*((actualTemp_c-tminC)*hot - (actualTemp_c-tmaxC)*cold);
            } else if ($("#fahrenheit").is(":checked")) {
                index=1/(tmaxF-tminF)*((actualTemp_f-tminF)*hot - (actualTemp_f-tmaxF)*cold);
            }
            indexComp=index+120;
            $("h3").css("backgroundColor", "hsl(" + index + "," + lightSat + "%," + light + "%)");
            $(".button").css("backgroundColor", "hsl(" + indexComp + ",90%," + light + "%)");
            $("#controlBarFront").css("backgroundColor", "hsl(" + index + "," + darkLightSat + "%," + darkLight + "%)");
            $("#controlBarBack").css("backgroundColor", "hsl(" + index + "," + darkLightSat + "%," + darkLight + "%)");
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
    $("#formulaire").css("display","none");
    controlBarSize("auto");
}

// use manual or auto mode
function autoManualData(val) {
    if (val==="manual") {
        $("#send").click(function() {
            manual();
            getAndDisplay(wundergroundUrl);
            close();
        });
    } else if (val==="auto") {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            alert("webbrowser incompatible with html5 geolocation");
        }
    }
}

// move options buttons depending of manual or auto search, and screen size
function controlButton(val) {
    if (val==="manual") {
        var display="flex";
        var buttonMarginMobile="1vw 0";
        var menuMarginMobile="5vw";
        var buttonMarginTablet="1vw 0";
        var buttonMarginLaptop="0.5vw 0"; // valeurs à caler
    } else if (val==="auto") {
        var display="none";
        var buttonMarginMobile="6vw 0";
        var menuMarginMobile="5vw";
        var buttonMarginTablet="2vw 0";
        var buttonMarginLaptop="1vw 0"; // valeurs à caler 
    }
    if (window.matchMedia("(min-width:850px)").matches) {
        $("input:text").css("display",display);
        $("#send").css("display",display);
        $("#formulaire").css("display",display);
        $("#boxButton").css("margin",buttonMarginLaptop);
    } else if (window.matchMedia("(min-width:500px)").matches) {
        $("input:text").css("display",display);
        $("#send").css("display",display);
        $("#formulaire").css("display",display);
        $("#boxButton").css("margin",buttonMarginTablet);
    } else {
        $("input:text").css("display",display);
        $("#send").css("display",display);
        $("#formulaire").css("display",display);
        $("#boxButton").css("margin",buttonMarginMobile);
    }
}

function autoManualShadow(val) {
    if (val==="manual") {
        $("#manual").removeClass("shadow");
        // $("#manual").css("backgroundColor", "hsl(" + indexComp + ",90%,50%)");
        $("#auto").addClass("shadow");
        // $("#auto").css("backgroundColor", "hsl(" + indexComp + ",90%,30%)");
    } else if (val==="auto") {
        $("#auto").removeClass("shadow");
        // $("#auto").css("backgroundColor", "hsl(" + indexComp + ",90%,50%)");
        $("#manual").addClass("shadow");
        // $("#manual").css("backgroundColor", "hsl(" + indexComp + ",90%,30%)");
    }
}

function autoManualDisplay(val) {
    controlBarSize(val);
    controlButton(val);
    autoManualShadow(val);
}

function celsiusFahrenheitShadow() {
    if ($("#celsius").is(":checked")) {
        $("#celsiusButton").removeClass("shadow");
        // $("#celsiusButton").css("backgroundColor", "hsl(" + indexComp + ",90%,50%)");
        $("#fahrenheitButton").addClass("shadow");
        // $("#fahrenheitButton").css("backgroundColor", "hsl(" + indexComp + ",90%,30%)");
    } else if ($("#fahrenheit").is(":checked")) {
        $("#celsiusButton").addClass("shadow");
        // $("#celsiusButton").css("backgroundColor", "hsl(" + indexComp + ",90%,30%)");
        $("#fahrenheitButton").removeClass("shadow");
        // $("#fahrenheitButton").css("backgroundColor", "hsl(" + indexComp + ",90%,50%)");
    }
}

// function for adaptative card size
function adaptativeCard(cardId, containerId, heightId) {
    $(cardId).toggleClass("flipped");
    $(containerId).css("height",heightId);
}

// display select auto or manual mode with shadow on button
$("#auto").click(function() {
    search="auto";
});
$("#manual").click(function() {
    search="manual";
});
$("input[name=search]").click(function() {
    autoManualData(search);
    autoManualDisplay(search);
});
$("#searchAuto").click(function() {
    autoManualData(search);
    autoManualDisplay(search);
    close();
});

// card flip on click, with adaptative size
$("#faceToday").click(function() {
    adaptativeCard("#today", ".f1_container", heightBackToday);
    $('#current').css("height",heightBackToday);
});
$("#backToday").click(function() {
    adaptativeCard("#today", ".f1_container", heightFaceToday);
    $("#current").css("height",heightFaceToday);
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
    autoManualDisplay(search);
});

// close option menu
$("#close").click(function() {
    controlButton("auto");
    close();
});

// select metric or imperial units
$("input[name=degre]").click(function(){
    celsiusFahrenheitShadow();
    getAndDisplay(wundergroundUrl);
    close();
});

// mode on refresh : depend of the radio checked, so call autoManual fct
autoManualSearch();
autoManualData(search);
autoManualDisplay(search);
footerSize();
