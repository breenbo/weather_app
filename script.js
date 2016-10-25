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
    var temp="celsius";

function showPosition (position) {
        maLatitude=position.coords.latitude;
        maLongitude=position.coords.longitude;
        wundergroundUrl="https://api.wunderground.com/api/" + apiKey + "/conditions/forecast10day/astronomy/hourly/q/" + maLatitude + "," + maLongitude + ".json";
        getAndDisplay(wundergroundUrl);
}

function getAndDisplay (wundergroundUrl) {
    // waiting message
    if (window.matchMedia("(max-width:500px)").matches) {
        document.getElementById("city").style.color = "white";
        document.getElementById("city").style.fontSize = "5vw";
    }
    document.getElementById("city").innerHTML = "Looking through the window, please wait...";
        // display current conditions
        $.getJSON(wundergroundUrl, function (json) {
            if (typeof json.current_observation === "undefined") {
                alert("Sorry, unable to find the city...");
            } else {
                var city=json.current_observation.display_location.city;
                document.getElementById("city").innerHTML = city;
            }

        // get local time of observation
        localTime=json.current_observation.observation_time;
        document.getElementById("localTime").innerHTML = localTime;

        // display current time and theme
        currentTime();

        // if loop for celsius or fahrenheit
            if (temp==="fahrenheit") {
            // if (document.getElementById("fahrenheit").checked) {
                actualTemp_f=json.current_observation.temp_f;
                document.getElementById("actualTemp").innerHTML = " " + actualTemp_f + "°";
                var wind=json.current_observation.wind_mph;
                document.getElementById("wind").innerHTML = " " + wind + " mph";
                var pressureIn=json.current_observation.pressure_in;
                document.getElementById("pressureMb").innerHTML = " " + pressureIn + " in";
            } else {
                actualTemp_c=json.current_observation.temp_c;
                document.getElementById("actualTemp").innerHTML = " " + actualTemp_c + "°";
                var wind=json.current_observation.wind_kph;
                document.getElementById("wind").innerHTML = " " + wind + " kph";
                var pressureMb=json.current_observation.pressure_mb;
                document.getElementById("pressureMb").innerHTML = " " + pressureMb + " mb";
            }
        // end if loop
        // set current icon
            var actualIcon=json.current_observation.icon;
            if (h >= 7 && h <= 20) {
                document.getElementById("actualIcon").className = "bigPicture wi wi-wu-" + actualIcon;
            } else {
                document.getElementById("actualIcon").className = "bigPicture wi wi-wu-" + actualIcon;
            }
        //
            var relativeHumidity=json.current_observation.relative_humidity;
            document.getElementById("relativeHumidity").innerHTML = " " + relativeHumidity;
            var windDir=json.current_observation.wind_dir;
            document.getElementById("windDir").innerHTML = " " + windDir;
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
            for (var i=2; i<8; i++) {
                day[i]=json.forecast.simpleforecast.forecastday[i].date.weekday;
                document.getElementById("day" + i).innerHTML = day[i] + '<span class="more">+</span>';
            }
            for (var i=0; i<3; i++) {
                if (temp==="celsius") {
                // if (document.getElementById("celsius").checked) {
                    wind[i]=json.forecast.simpleforecast.forecastday[i].avewind.kph;
                    document.getElementById("wind" + i).innerHTML = " " + wind[i] + " kph";
                    precip[i]=json.forecast.simpleforecast.forecastday[i].qpf_allday.mm;
                    document.getElementById("precip" + i).innerHTML = " " + precip[i] + " mm";
                } else {
                    wind[i]=json.forecast.simpleforecast.forecastday[i].avewind.mph;
                    document.getElementById("wind" + i).innerHTML = " " + wind[i] + " mph";
                    precip[i]=json.forecast.simpleforecast.forecastday[i].qpf_allday.in;
                    document.getElementById("precip" + i).innerHTML = " " + precip[i] + " in";
                }
                windDir[i]=json.forecast.simpleforecast.forecastday[i].avewind.dir;
                document.getElementById("windDir" + i).innerHTML = " " + windDir[i];
                humidity[i]=json.forecast.simpleforecast.forecastday[i].avehumidity;
                document.getElementById("humidity" + i).innerHTML = " " + humidity[i] + " %";
            }
            for (var i=0; i<8; i++) {
        // if loop for metric or imperial units
                if (temp==="celsius") {
                // if (document.getElementById("celsius").checked) {
                    high[i]=json.forecast.simpleforecast.forecastday[i].high.celsius;
                    document.getElementById("max" + i).innerHTML = " " + high[i] + "°";
                    document.getElementById("max" + i).style.color = "hsl(0,70%,50%)";
                    low[i]=json.forecast.simpleforecast.forecastday[i].low.celsius;
                    document.getElementById("min" + i).innerHTML = " " + low[i] + "°";
                    document.getElementById("min" + i).style.color = "hsl(250,70%,50%)";
                } else {
                    high[i]=json.forecast.simpleforecast.forecastday[i].high.fahrenheit;
                    document.getElementById("max" + i).innerHTML = " " + high[i] + "°";
                    document.getElementById("max" + i).style.color = "hsl(0,70%,50%)";
                    low[i]=json.forecast.simpleforecast.forecastday[i].low.fahrenheit;
                    document.getElementById("min" + i).innerHTML = " " + low[i] + "°";
                    document.getElementById("min" + i).style.color = "hsl(250,70%,50%)";
                }
            }
        // display big weather icons and text for 3 next days
            for (i=0; i<6; i++) {
                icon[i]=json.forecast.txt_forecast.forecastday[i].icon;
                document.getElementById("picDay" + i).className = "bigPicture wi wi-wu-" + icon[i];
            // if loop for metric or imperial units
                if (temp==="celsius") {
                // if (document.getElementById("celsius").checked) {
                    text[i]=json.forecast.txt_forecast.forecastday[i].fcttext_metric;
                } else {
                    text[i]=json.forecast.txt_forecast.forecastday[i].fcttext;
                }
                text[i]=text[i].replace(/\./gi, ".<br>")
                document.getElementById("text" + i).innerHTML = text[i];
            }
        // display medium weather icons for 5 next days
            for (i=6; i<16; i++) {
                icon[i]=json.forecast.txt_forecast.forecastday[i].icon;
                document.getElementById("picDay" + i).className = "smallPicture wi wi-wu-" + icon[i];
            // if loop for metric or imperial units
                // if (document.getElementById("celsius").checked) {
                    // text[i]=json.forecast.txt_forecast.forecastday[i].fcttext_metric;
                // } else {
                    // text[i]=json.forecast.txt_forecast.forecastday[i].fcttext;
                // }
                // text[i]=text[i].replace(/\./gi, ".<br>")
                // document.getElementById("text" + i).innerHTML = text[i];
            }
          //
          // display sunset and sunrise
            var sunriseHour=json.moon_phase.sunrise.hour;
            var sunriseMinute=json.moon_phase.sunrise.minute;
            var sunsetHour=json.moon_phase.sunset.hour;
            var sunsetMinute=json.moon_phase.sunset.minute;
            document.getElementById("sunrise").innerHTML = " " + "0" + sunriseHour + ":" + sunriseMinute;
            document.getElementById("sunset").innerHTML = " " + sunsetHour + ":" + sunsetMinute;
          //
          // display hourly evolution for today
            var hour=[];
            var hourIcon=[];
            var hourTemp=[];
            var hourFr=[];
            for (i=0; i<24; i+=2) {
                hour[i]=json.hourly_forecast[i].FCTTIME.civil;
                hour[i]=hour[i].split(/\b/)[0];
                document.getElementById("hourly" + i).className = "hourly wi wi-time-" + hour[i];
            // if loop for metric or imperial units
                if (temp==="celsius") {
                // if (document.getElementById("celsius").checked) {
                    hourTemp[i]=json.hourly_forecast[i].temp.metric;
                } else {
                    hourTemp[i]=json.hourly_forecast[i].temp.english;
                }
                document.getElementById("hourlyTemp" + i).innerHTML = hourTemp[i] + "°";
            // display weather icons
                hourIcon[i]=json.hourly_forecast[i].icon;
                hourFr[i]=json.hourly_forecast[i].FCTTIME.hour;
                if (hourFr[i] >= 7 && hourFr[i] <= 20) {
                    document.getElementById("hourlyPic" + i).className = "tinyPicture wi wi-wu-" + hourIcon[i];
                } else {
                    document.getElementById("hourlyPic" + i).className = "tinyPicture wi wi-wu-nt_" + hourIcon[i];
                }
            }
        // get height of the cards for flip
            heightBackToday = document.getElementById("backToday").clientHeight + "px"; 
            heightFaceToday = document.getElementById("faceToday").clientHeight + "px";
            heightBackTomorrow = document.getElementById("backTomorrow").clientHeight + "px";
            heightFaceTomorrow = document.getElementById("faceTomorrow").clientHeight + "px";
            heightBackNext = document.getElementById("backNext").clientHeight + "px";
            heightFaceNext = document.getElementById("faceNext").clientHeight + "px";
            
            document.getElementById("f1_container").style.opacity = "1";
            var f2_container=document.getElementsByClassName("f2_container");
            var len=f2_container.length;
            for (var j=0; j<len; j++) {
                f2_container[j].style.opacity = "1";
            }
            document.getElementById("endWeek").style.opacity = "1";

            dayAndNight();
            document.getElementById("city").style.color = "black";
            document.getElementById("endWeek").style.minHeight = heightFaceToday;
            document.getElementById("current").style.height = heightFaceToday;
            document.getElementById("f1_container").style.height = heightFaceToday;
            if (window.matchMedia("(max-width:500px)").matches) {
                document.getElementById("city").style.fontSize = "7vw";
            }
        })
}

// checking manual or auto search and setting var search
function autoManualSearch() {
    if (document.getElementById("searchAuto").checked) {
        search="auto";
    } else if (document.getElementById("searchManual").checked) {
        search="manual";
    }
}

// checking imperial or metrics units
function isCelsius() {
    if (document.getElementById("celsius").checked) {
        temp = "celsius";
    } else if (document.getElementById("fahrenheit").checked) {
        temp = "fahrenheit";
    }
}

function isCelsiusShadow(val) {
    if (val==="celsius") {
        document.getElementById("celsiusButton").classList.remove("shadow");
        document.getElementById("fahrenheitButton").classList.add("shadow");
        // $("#celsiusButton").css("backgroundColor", "hsl(" + indexComp + ",90%,50%)");
        // $("#fahrenheitButton").css("backgroundColor", "hsl(" + indexComp + ",90%,30%)");
    } else if (val==="fahrenheit") {
        document.getElementById("fahrenheitButton").classList.remove("shadow");
        document.getElementById("celsiusButton").classList.add("shadow");
        // $("#celsiusButton").css("backgroundColor", "hsl(" + indexComp + ",90%,30%)");
        // $("#fahrenheitButton").css("backgroundColor", "hsl(" + indexComp + ",90%,50%)");
    }
}

// setting footer depending of screen size
function footerSize() {
    if (window.matchMedia("(min-width:500px)").matches) {
        document.getElementById("foot").innerHTML = 'Designed and coded by <em>Bruno Berrehuel</em>. All right reserved. Powered by <a href="https://www.wunderground.com/">Wunderground</a> and <a href="https://erikflowers.github.io/weather-icons/">Weather Icons</a>.';
    } else {
        document.getElementById("foot").innerHTML = 'Designed and coded by <em>Bruno Berrehuel</em>. <br>All right reserved.<br>Powered by <a href="https://www.wunderground.com/">Wunderground</a> and <a href="https://erikflowers.github.io/weather-icons/">Weather Icons</a>.';
    }
}

function controlBarSize(val) {
    if (val==="manual") {
        var mobile="38vw";
        var tablet="18vw";
        var laptop="14.5vw";
    } else if (val==="auto") {
        var mobile="30vw";
        var tablet="11vw";
        var laptop="9vw";
    }
    if (window.matchMedia("(min-width:850px)").matches) {
        document.getElementById("f3_container").style.height = laptop;
    } else if (window.matchMedia("(min-width:500px)").matches) {
        document.getElementById("f3_container").style.height = tablet;
    } else {
        document.getElementById("f3_container").style.height = mobile;
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
    document.getElementById("currentTitle").innerHTML = "Current - " + h + ":" + m;
}

function dayAndNight() {
    if (h >= 7 && h <= 20) {
        tempColor("day");
    } else {
        tempColor("night");
        document.body.style.backgroundColor =  "hsl(30,0%,40%)";
        var card=document.getElementsByClassName("card");
            var l=card.length;
            for (var i=0; i<l; i++) {
                card[i].style.backgroundColor = "hsl(30,0%,60%)";
            }
        var h4=document.getElementsByTagName("h4");
            l=h4.length;
            for (i=0; i<l; i++) {
                h4[i].style.borderTopColor = "hsl(30,0%,40%)";
            }
        var hourly=document.getElementsByClassName("hourly");
            l=hourly.length;
            for (i=0; i<l; i++) {
                hourly[i].style.color = "black";
            }
        var more=document.getElementsByClassName("more");
            l=more.length;
            for (i=0; i<l; i++) {
                more[i].style.color = "hsl(30,0%,60%)";
            }
        var input=document.getElementsByTagName("input");
        l=input.length;
        for (i=0; i<l; i++) {
            if (input[i].type === "text") {
                input[i].style.backgroundColor = "hsl(30,0%,60%)";
            }
        }
    }
}

function tempColor(val) {
    // tmax and tmin define the range for the color palette
    // if loop for metric or imperial units
    var hot=0;
    var cold=250;
    var tmaxC=40;
    var tminC=0;
    var tmaxF=104;
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
    if (temp==="celsius") {
        index=1/(tmaxC-tminC)*((actualTemp_c-tminC)*hot - (actualTemp_c-tmaxC)*cold);
    } else if (temp==="fahrenheit") {
        index=1/(tmaxF-tminF)*((actualTemp_f-tminF)*hot - (actualTemp_f-tmaxF)*cold);
    }
    indexComp=index+120;
    var button = document.getElementsByClassName("button");
        var l=button.length;
        for (var i=0; i<l; i++) {
            button[i].style.backgroundColor = "hsl(" + indexComp + ",90%," + light + "%)";
        }
    var h3 = document.getElementsByTagName("h3");
        l=h3.length;
        for (var i=0; i<l; i++) {
            h3[i].style.backgroundColor = "hsl(" + index + "," + lightSat + "%," + light + "%)";
        }
    document.getElementById("controlBarFront").style.backgroundColor = "hsl(" + index + "," + darkLightSat + "%," + darkLight + "%)";
    document.getElementById("controlBarBack").style.backgroundColor = "hsl(" + index + "," + darkLightSat + "%," + darkLight + "%)";
}

// manual country and city
function manual() {
    var country=document.getElementById("country").value;
    var city=document.getElementById("ville").value;
    wundergroundUrl="https://api.wunderground.com/api/" + apiKey + "/conditions/forecast10day/astronomy/hourly/q/" + country + "/" + city + ".json";
    if (country=="") {
        alert("Please enter a country or an US state, or use auto mode");
    } else if (city=="") {
        alert("Please enter a city or use auto mode");
    }
}

//close, flip and get normal size
function close() {
    document.getElementById("carte2").classList.toggle("flipped");
    document.getElementById("formulaire").style.display = "none";
    controlBarSize("auto");
}

// use manual or auto mode
function autoManualData(val) {
    document.getElementById("send").addEventListener("click", function() {
        manual();
        getAndDisplay(wundergroundUrl);
        close();
    }, false);
    if (val==="auto") {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            alert("webbrowser incompatible with html5 geolocation");
        }
    }
}

// move options buttons depending of manual or auto search, and screen size
function controlButton(val) {
    var input=document.getElementsByTagName("input");
    var l=input.length;
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
        var buttonMarginTablet="1.9vw 0";
        var buttonMarginLaptop="1vw 0"; // valeurs à caler 
    }
    if (window.matchMedia("(min-width:850px)").matches) {
        for (var i=0; i<l; i++) {
            if (input[i].type === "text") {
                input[i].style.display = display;
            }
        }
        document.getElementById("send").style.display = display;
        document.getElementById("formulaire").style.display = display;
        document.getElementById("boxButton").style.margin = buttonMarginLaptop;
    } else if (window.matchMedia("(min-width:500px)").matches) {
        for (var i=0; i<l; i++) {
            if (input[i].type === "text") {
                input[i].style.display = display;
            }
        }
        document.getElementById("send").style.display = display;
        document.getElementById("formulaire").style.display = display;
        document.getElementById("boxButton").style.margin = buttonMarginTablet;
    } else {
        for (var i=0; i<l; i++) {
            if (input[i].type === "text") {
                input[i].style.display = display;
            }
        }
        document.getElementById("send").style.display = display;
        document.getElementById("formulaire").style.display = display;
        document.getElementById("boxButton").style.margin = buttonMarginMobile;
    }
}

function autoManualShadow(val) {
    if (val==="manual") {
        document.getElementById("manual").classList.remove("shadow");
        document.getElementById("auto").classList.add("shadow");
        // $("#manual").css("backgroundColor", "hsl(" + indexComp + ",90%,50%)");
        // $("#auto").css("backgroundColor", "hsl(" + indexComp + ",90%,30%)");
    } else if (val==="auto") {
        document.getElementById("auto").classList.remove("shadow");
        document.getElementById("manual").classList.add("shadow");
        // $("#auto").css("backgroundColor", "hsl(" + indexComp + ",90%,50%)");
        // $("#manual").css("backgroundColor", "hsl(" + indexComp + ",90%,30%)");
    }
}

function autoManualDisplay(val) {
    controlBarSize(val);
    controlButton(val);
    autoManualShadow(val);
}

// function for adaptative card size
function adaptativeCard(cardId, containerId, heightId) {
    document.getElementById(cardId).classList.toggle("flipped");
    document.getElementById(containerId).style.height = heightId;
}

// display select auto or manual mode with shadow on button
document.getElementById("manual").addEventListener("click", function () {
    search="manual";
    autoManualData(search);
    autoManualDisplay(search);
}, false);
document.getElementById("searchAuto").addEventListener("click", function() {
    search="auto";
    autoManualData(search);
    autoManualDisplay(search);
    close();
}, false);

// card flip on click, with adaptative size
$("#faceToday").click(function() {
    adaptativeCard("today", "f1_container", heightBackToday);
    $('#current').css("height",heightBackToday);
});
$("#backToday").click(function() {
    adaptativeCard("today", "f1_container", heightFaceToday);
    $("#current").css("height",heightFaceToday);
});
$("#faceTomorrow").click(function() {
    adaptativeCard("tomorrow", "tomorrowContainer", heightBackTomorrow);
});
$("#backTomorrow").click(function() {
    adaptativeCard("tomorrow", "tomorrowContainer", heightFaceTomorrow);
});
$("#faceNext").click(function() {
    adaptativeCard("next", "nextContainer", heightBackNext);
});
$("#backNext").click(function() {
    adaptativeCard("next", "nextContainer", heightFaceNext);
});

// open option menu
$("#menu").click(function() {
    $("#carte2").toggleClass("flipped");
    autoManualDisplay(search);
});

// close option menu
$("#close").click(function() {
    controlButton("auto");
    close();
});

// select metric or imperial units
$("input[name=degre]").click(function(){
    isCelsius();
    isCelsiusShadow(temp);
    getAndDisplay(wundergroundUrl);
    close();
});

// mode on refresh : depend of the radio checked, so call autoManual fct
// autoManualSearch();
// isCelsius();
isCelsiusShadow(temp);
autoManualData(search);
autoManualDisplay(search);
footerSize();
