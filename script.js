    var maLongitude=2.208;
    var maLatitude=48.847;
    var apiKey="b8bcc556b7a1fd8c";

    function showPosition (position) {
        maLongitude=position.coords.longitude;
        maLatitude=position.coords.latitude;
        var url="https://api.wunderground.com/api/" + apiKey + "/conditions/q/" + maLatitude + "," + maLongitude + ".json";
        $.getJSON(url, function (json) {
          var city=json.current_observation.display_location.city;
          var temp_c=json.current_observation.temp_c;
          alert("you're in " + city + " and it's " + temp_c);
    }); 
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("webbrowser incompatible with html5 geolocation");
    }

// $.getJSON("http://api.wunderground.com/api/b8bcc556b7a1fd8c/conditions/q/autoip.json", function(json) {
  // var city=json.current_observation.display_location.city;
  // var temp_c=json.current_observation.temp_c;
  // alert("you're in " + city + "and it's " + temp_c);
// });


    // alert("http://api.wunderground.com/api/b8bcc556b7a1fd8c/conditions/q/" + maLatitude + "," + maLongitude + ".json");
// $.ajax({
    // url : "http://api.wunderground.com/api/b8bcc556b7a1fd8c/conditions/q/" + maLatitude + "," + maLongitude + ".json",
    // datatype : "jsonp",
    // success : function (parsed_json) {
        // var city = parsed_json['current_observation']['display_location']['city'];
        // var temp_c = parsed_json['current_observation']['temp_c'];
        // alert('current temperature in' + city + 'is ' + temp_c);
    // }
// })
