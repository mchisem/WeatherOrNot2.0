//API Key//
var APIKey = "94fb4992412a398a9fb2333272321439";

//on click function/ local storage of city value
$(".btn-small").on('click', function(event){
    event.preventDefault();
    console.log("good job!");
    var city = $("#value").val().trim();
    $("#loader-wrapper").removeClass("hide");
 
    weatherDaily(city);
})  

// Daily Weather function with the URL we need to query the database
function weatherDaily(city) {

        // remove previous weather data
        $(".city-name").empty();
        $(".date").empty();
        $(".icon").empty();
        $(".temp").empty();
        $(".humid").empty();
        $(".wind").empty();
        
        //weather input styling// 
        var weatherPosition = $("#weather");
        $("#weather").append(weatherPosition).css({"position":"absolute", "margin-top":"455px"}); 

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=94fb4992412a398a9fb2333272321439"

    // AJAX call to the OpenWeatherMap for Daily Weather
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        //variables for daily weather response array//
        var nameCity = response.name;
        //console.log(nameCity);
        var date = response.dt;
        //console.log(date);
        var dayDate = moment.unix(date).format("LL");
        //console.log(dayDate);
            var iconUrl = "https://openweathermap.org/img/wn/";
            var iconCity = response.weather[0].icon; 
            var iconPng = "@2x.png";
            var icon = iconUrl + iconCity + iconPng;
            var iconImg = $("<img>");
            iconImg.attr("src", icon);
            // console.log(iconImg);
        var tempCity = response.main.temp;
        //change the temp from celsius to farenheight 
            var fDegree = ((tempCity - 273.15) * 1.8 + 32).toFixed(0);
        // console.log(tempCity);
        var humidCity = response.main.humidity;
        // console.log(humidCity);
        var windCity = response.wind.speed;
        // console.log(windCity);
        
        $(".city-name").append(nameCity);
        $(".date").text(dayDate); 
        $(".icon").append(iconImg);
        $(".temp").append("Temperature: " + fDegree + "°F");
        $(".humid").append("Humidity: " + humidCity + "%");
        $(".wind").append("Wind Speed: " + windCity + "MPH").css({"margin-bottom":"60px"});

        //if else statements that change background//
        if (fDegree >= 80) {
          eventsHot(city);
          console.log("it's hot!");
          $("#myVideo").addClass('hide');
          $("#video-hot").removeClass('hide');
          $("#video-cold").addClass('hide');
          $("#loader-wrapper").addClass('hide');
        } else if (fDegree < 80 && fDegree > 60) {
            eventsMid(city);
            $("#video-hot").addClass('hide');
            $("#video-cold").addClass('hide');
            $("#myVideo").removeClass('hide');
            $("#loader-wrapper").addClass('hide');
        } else if (fDegree <= 59) {
            eventsCold(city);
            console.log("it's cold!");
            $("#myVideo").addClass("hide");
            $("#video-cold").removeClass('hide');
            $("#video-hot").addClass('hide');
            $("#loader-wrapper").addClass('hide');
        }
      })
      }

//mid temperature events//
function eventsMid(city) {
  var oArg = {
    app_key: "nnvHmLFmL3fNTWwG",
    q: "sports",
    where: city,
    date: "LL",
    page_size: 5,
    sort_order: "popularity",
    total_items: 5,
  }

  EVDB.API.call("/events/search", oArg, function(oData) {

    console.log(oData);
    // Note: this relies on the custom toString() methods below

    var image = $("#image0")
    if (oData.events.event[0].image) {
      image.attr({ "src": oData.events.event[0].image.medium.url, "height": "200px", "width": "200px" });
    } else {
      image.attr({ "src": "data:image/jpeg;base64,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", "height": "200px", "width": "200px" });
      // alert("Not working")
    }

    //mid events 1//
    var activities = $("#activities")
    $("#activities").append(activities).css({"background-color":"white","opacity":"0.7","color":"black"});

    var image = $("#image0")
    image.attr({"src": oData.events.event[0].image.medium.url,"height": "200px", "width": "200px"});
    var act = $("#activities")
    act.append(image)

    $("#title0").text(oData.events.event[0].title);
    $("#city-activity0").text(oData.events.event[0].city_name + " , " + oData.events.event[0].region_name).css({"margin":"0"});
    $("#start-time0").text("Start-Time: " + oData.events.event[0].start_time);
    $("#addy0").text("Address: " + oData.events.event[0].venue_address);
    $("#venue0").text("Venue: " + oData.events.event[0].venue_name);
    $("#link0").attr("href", oData.events.event[0].venue_url);
    console.log(oData.events.event[0].venue_url)

    //mid events 2//
    var image = $("#image1")
    image.attr({"src": oData.events.event[1].image.medium.url,"height": "200px", "width": "200px"});
    var actOne = $("#activities1")
    actOne.append(image)

    $("#activities1").append(actOne).css({"background-color":"white", "opacity":"0.7","color":"black"});

    //images//
    var image = $("#image2")
    image.attr({"src": oData.events.event[2].image.medium.url,"height": "200px", "width": "200px"});
    var actTwo = $("#activities2")
    actTwo.append(image)

    $("#title1").text(oData.events.event[1].title);
    $("#city-activity1").text(oData.events.event[1].city_name + " , " + oData.events.event[1].region_name);
    $("#start-time1").text("Start-Time: " + oData.events.event[1].start_time);
    $("#addy1").text("Address: " + oData.events.event[1].venue_address);
    $("#venue1").text("Venue: " + oData.events.event[1].venue_name);
    $("#link1").attr("href", oData.events.event[1].venue_url);
    console.log(oData.events.event[1].venue_url)

    //mid event background 3//
    $("#activities2").append(actTwo).css({"background-color":"white", "opacity":"0.7","color":"black"});

    $("#city-activity2").text(oData.events.event[2].city_name + " , " + oData.events.event[2].region_name);
    $("#start-time2").text("Start-Time: " + oData.events.event[2].start_time);
    $("#addy2").text("Address: " + oData.events.event[2].venue_address);
    $("#venue2").text("Venue: " + oData.events.event[2].venue_name);
    $("#title2").text(oData.events.event[2].title);
    $("#link2").attr("href", oData.events.event[2].venue_url);
    console.log(oData.events.event[2].venue_url)

    if (!oData.events.event[0].image.medium.url) {
      alert("nothing")
    }

    // Google API Maps
    var eventLat0 = parseFloat(oData.events.event[0].latitude);
    var eventLong0 = parseFloat(oData.events.event[0].longitude);

    var eventOne0 = { lat: eventLat0, lng: eventLong0 };

    var map = new google.maps.Map(document.getElementById('map_canvas'), {
      zoom: 8,
      center: eventOne0

  });

  var marker = new google.maps.Marker({
    position: eventOne0,
    map: map, marker,
  });

  // lat/long map two
  var eventLat1 = parseFloat(oData.events.event[1].latitude);
  var eventLong1 = parseFloat(oData.events.event[1].longitude);

  var eventOne1 = { lat: eventLat1, lng: eventLong1 };
  var map = new google.maps.Map(document.getElementById('map_canvas1'), {
    zoom: 8,
    center: eventOne1

  });

  var marker = new google.maps.Marker({
  position: eventOne1,
  map: map, marker,
  });

  // map three
  var eventLat2 = parseFloat(oData.events.event[2].latitude);
    var eventLong2 = parseFloat(oData.events.event[2].longitude);

    var eventOne2 = { lat: eventLat2, lng: eventLong2 };
    var map = new google.maps.Map(document.getElementById('map_canvas2'), {
      zoom: 8,
      center: eventOne2
});

  var marker = new google.maps.Marker({
    position: eventOne2,
    map: map, marker,

});

});
}


//hot events//
function eventsHot(city) {
  var oArgs = {
      app_key: "nnvHmLFmL3fNTWwG",
      q: "attractions",
      where: city,
      date: "2020021000-2020022000",
      page_size: 5,
      sort_order: "popularity",
      total_items: 5,
  };
  EVDB.API.call("/events/search", oArgs, function (oData) {
      console.log(oData);
      // Note: this relies on the custom toString() methods below

      var image = $("#image0")
      if (oData.events.event[0].image) {
      image.attr({ "src": oData.events.event[0].image.medium.url, "height": "200px", "width": "200px" });
      } else {
      image.attr({ "src": "data:image/jpeg;base64,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", "height": "200px", "width": "200px" });
      }

      var image = $("#image0")
      image.attr({ "src": oData.events.event[0].image.medium.url, "height": "200px", "width": "200px" });
      var imgDiv = $("#activities")
      imgDiv.append(image)

      //hot event info //
      $("#activities").append(imgDiv).css({"background-color":"white", "opacity":"0.7","color":"black"});

      $("#city-activity0").text(events.event[0].city_name  + " , " + oData.events.event[0].region_name);
      $("#start-time0").text("Start-Time: " + oData.events.event[0].start_time);
      $("#addy0").text("Address: " + oData.events.event[0].venue_address);
      $("#venue0").text("Venue: " + oData.events.event[0].venue_name);
      $("#title0").text(oData.events.event[0].title);
      $("#link0").attr("href", oData.events.event[0].venue_url);
      console.log(oData.events.event[0].venue_url)

      var image = $("#image1")
      image.attr({ "src": oData.events.event[1].image.medium.url, "height": "200px", "width": "200px" });
      var imgDiv = $("#activities1")
      imgDiv.append(image)

      // //background//
      $("#activities1").append(imgDiv).css({"background-color":"white", "opacity":"0.7","color":"black"});

      $("#city-activity1").text(events.event[1].city_name   + " , " + oData.events.event[1].region_name);
      $("#start-time1").text("Start-Time: " + oData.events.event[1].start_time);
      $("#addy1").text("Address: " + oData.events.event[1].venue_address);
      $("#venue1").text("Venue: " + oData.events.event[1].venue_name);
      $("#title1").text(oData.events.event[1].title);
      $("#link1").attr("href", oData.events.event[1].venue_url);
      console.log(oData.events.event[1].venue_url)

      var image = $("#image2")
      image.attr({ "src": oData.events.event[2].image.medium.url, "height": "200px", "width": "200px" });
      var imgDiv = $("#activities2")
      imgDiv.append(image)

      // //background//
      $("#activities2").append(imgDiv).css({"background-color":"white", "opacity":"0.7","color":"black"});

      $("#city-activity2").text(events.event[2].city_name   + " , " + oData.events.event[2].region_name);
      $("#start-time2").text("Start-Time: " + oData.events.event[2].start_time);
      $("#addy2").text("Address: " + oData.events.event[2].venue_address);
      $("#venue2").text("Venue: " + oData.events.event[2].venue_name);
      $("#title2").text(oData.events.event[2].title);
      $("#link2").attr("href", oData.events.event[2].venue_url);
      console.log(oData.events.event[2].venue_url)

      if (!oData.events.event[0].image.medium.url) {
        alert("nothing")
      }

    // Google maps API
    var eventLat0 = parseFloat(oData.events.event[0].latitude);
    var eventLong0 = parseFloat(oData.events.event[0].longitude);

    var eventOne0 = { lat: eventLat0, lng: eventLong0 };

    var map = new google.maps.Map(document.getElementById('map_canvas'), {
      zoom: 8,
      center: eventOne0
    });

    var marker = new google.maps.Marker({
      position: eventOne0,
      map: map, marker,
    });

    // lat/long map two
    var eventLat1 = parseFloat(oData.events.event[1].latitude);
    var eventLong1 = parseFloat(oData.events.event[1].longitude);

    var eventOne1 = { lat: eventLat1, lng: eventLong1 };
    var map = new google.maps.Map(document.getElementById('map_canvas1'), {
      zoom: 8,
      center: eventOne1
    });

    var marker = new google.maps.Marker({
      position: eventOne1,
      map: map, marker,
    });
    // map three
    var eventLat2 = parseFloat(oData.events.event[2].latitude);
    var eventLong2 = parseFloat(oData.events.event[2].longitude);

    var eventOne2 = { lat: eventLat2, lng: eventLong2 };
    var map = new google.maps.Map(document.getElementById('map_canvas2'), {
      zoom: 8,
      center: eventOne2
    });

    var marker = new google.maps.Marker({
      position: eventOne2,
      map: map, marker,
    });
  });
}

//cold events//
function eventsCold(city) {
  var oArgs = {
      app_key: "nnvHmLFmL3fNTWwG",
      q: "music",
      where: city,
      date: "2020021000-2020022000",
      page_size: 5,
      sort_order: "popularity",
      total_items: 5,
  };
  EVDB.API.call("/events/search", oArgs, function (oData) {
      //console.log(oData);
      // Note: this relies on the custom toString() methods below

      var image = $("#image0")
      if (oData.events.event[0].image) {
      image.attr({ "src": oData.events.event[0].image.medium.url, "height": "200px", "width": "200px" });
      } else {
      image.attr({ "src": "data:image/jpeg;base64,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", "height": "200px", "width": "200px" });
      }

      //first cold activity//
      var image = $("#image0")
      image.attr({ "src": oData.events.event[0].image.medium.url, "height": "200px", "width": "200px" });
      var imgDiv = $("#activities")
      imgDiv.append(image)

      $("#activities").append(imgDiv).css({"background-color":"white", "opacity":"0.7","color":"black"});

      $("#city-activity0").text(oData.events.event[0].city_name + " , " + oData.events.event[0].region_name);
      $("#start-time0").text("Start-Time: " + oData.events.event[0].start_time);
      $("#addy0").text("Address: " + oData.events.event[0].venue_address);
      $("#venue0").text("Venue: " + oData.events.event[0].venue_name);
      $("#title0").text(oData.events.event[0].title);
      $("#link0").attr("href", oData.events.event[0].venue_url);
      //console.log(oData.events.event[0].venue_url)

      //second cold activity//
      var image = $("#image1")
      image.attr({ "src": oData.events.event[1].image.medium.url, "height": "200px", "width": "200px" });
      var imgDiv = $("#activities1")
      imgDiv.append(image)

      $("#activities1").append(imgDiv).css({"background-color":"white", "opacity":"0.7","color":"black"});

      $("#city-activity1").text(oData.events.event[1].city_name + " , " + oData.events.event[1].region_name);
      $("#start-time1").text("Start-Time: " + oData.events.event[1].start_time);
      $("#addy1").text("Address: " + oData.events.event[1].venue_address);
      $("#venue1").text("Venue: " + oData.events.event[1].venue_name);
      $("#title1").text(oData.events.event[1].title);
      $("#link1").attr("href", oData.events.event[1].venue_url);
      //console.log(oData.events.event[1].venue_url)

      //third cold activity//
      var image = $("#image2")
      image.attr({ "src": oData.events.event[2].image.medium.url, "height": "200px", "width": "200px" });
      var imgDiv = $("#activities2")
      imgDiv.append(image)

      $("#activities2").append(imgDiv).css({"background-color":"white", "opacity":"0.7","color":"black"});

      $("#city-activity2").text(oData.events.event[2].city_name + " , " + oData.events.event[2].region_name);
      $("#start-time2").text("Start-Time: " + oData.events.event[2].start_time);
      $("#addy2").text("Address: " + oData.events.event[2].venue_address);
      $("#venue2").text("Venue: " + oData.events.event[2].venue_name);
      $("#title2").text(oData.events.event[2].title);
      $("#link2").attr("href", oData.events.event[2].venue_url);
      //console.log(oData.events.event[2].venue_url)

      if (!oData.events.event[0].image.medium.url) {
        alert("nothing");
      }

      // Google maps API
      var eventLat0 = parseFloat(oData.events.event[0].latitude);
      var eventLong0 = parseFloat(oData.events.event[0].longitude);
  
      var eventOne0 = { lat: eventLat0, lng: eventLong0 };
  
      var map = new google.maps.Map(document.getElementById('map_canvas'), {
        zoom: 8,
        center: eventOne0
      });
  
      var marker = new google.maps.Marker({
        position: eventOne0,
        map: map, marker,
      });
  
      //   lat/long map two
      var eventLat1 = parseFloat(oData.events.event[1].latitude);
      var eventLong1 = parseFloat(oData.events.event[1].longitude);
  
      var eventOne1 = { lat: eventLat1, lng: eventLong1 };
      var map = new google.maps.Map(document.getElementById('map_canvas1'), {
        zoom: 8,
        center: eventOne1
      });
    
      var marker = new google.maps.Marker({
        position: eventOne1,
        map: map, marker,
      });
      // map three
      var eventLat2 = parseFloat(oData.events.event[2].latitude);
      var eventLong2 = parseFloat(oData.events.event[2].longitude);
  
      var eventOne2 = { lat: eventLat2, lng: eventLong2 };
      var map = new google.maps.Map(document.getElementById('map_canvas2'), {
        zoom: 8,
        center: eventOne2
      });
  
  
      var marker = new google.maps.Marker({
        position: eventOne2,
        map: map, marker,
      });
    });
  }     

var nav = (navigator.geolocation)
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      var test =
      {
        origin: pos,
        destination: 'Los Angeles, CA',
        provideRouteAlternatives: false,
        travelMode: 'DRIVING',
        drivingOptions: {
          departureTime: new Date(/* now, or future date */),
          trafficModel: 'pessimistic'
        },
        unitSystem: google.maps.UnitSystem.IMPERIAL
      }
      console.log(test)
    });