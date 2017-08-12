numTextMapUnderTwenty = ['Oh','One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten',
                'Eleven', 'Twelve','Thirteen','Fourteen','Fifteen','Sixteen','Seventeen',
                'Eighteen', 'Nineteen'];

numTextMapHour = ['Twelve','One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten',
                    'Eleven', 'Twelve','One','Two','Three','Four','Five', 'Six', 'Seven', 'Eight','Nine',
                    'Ten', 'Eleven'];

numTextMapTens = {'2':'Twenty','3':'Thirty', '4':'Forty', '5':'Fifty'};

function hourToText(number){
        return numTextMapHour[number]
}

function minuteToText(number){
    secondDigit = true;
    if(number<10){
        return "O' " + numTextMapUnderTwenty[number]
    }
    else if(number>9 && number<20){
        return numTextMapUnderTwenty[number]
    }
    else{
        sNumber = number.toString().split("");
        if(sNumber[1]=="0"){
            secondDigit = false
        }
        if(secondDigit){
            return  numTextMapTens[sNumber[0]] + " " + numTextMapUnderTwenty[sNumber[1]]
        }
        else{
            return  numTextMapTens[sNumber[0]]
        }

    }
}

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    document.getElementById('txt').innerHTML =
        hourToText(h) + " " + minuteToText(m);
    secondProgess = (100 / 60) * s;
    document.getElementById('seconds').style.width = secondProgess.toString() + '%';
    var t = setTimeout(startTime, 500);
}

function setThermometer(t){
     var temp_level = 0;

     if(t<20){
         temp_level = 0
     }
     else if(t>=20 && t<40){
         temp_level = 1
     }
     else if(t>=40 && t<60){
         temp_level = 2
     }
     else if(t>=60 && t<80){
         temp_level = 3
     }
     else{
         temp_level = 4
     }

    return temp_level
}

function setWeatherIcon(w){
    // Yahoo Weather API https://developer.yahoo.com/weather/documentation.html
    code = parseInt(w);
    if ([13,14,15,16,17,41,42,43,46].includes(code)){
        // Codes indicating snow
        return "fa-snowflake-o";
    }
    else if ([31,32,33,34,36].includes(code)){
        // Codes indicating sun
        return "fa-sun-o"
    }
    else if ([26,27,28,29,30,44].includes(code)){
        // Codes indicating cloudy
        return 'fa-cloud'
    }
    else if ([5,6,7,8,9,10,11,12,35,40].includes(code)) {
        // Codes indicating rain
        return 'fa-tint'
    }
    else if ([37,38,39,45,47].includes(code)){
        return 'fa-bolt'
    }
    else{
        return 'fa-question'
    }

}


$(document).ready(function(){

    startWeather();

    function Weather(data){
        var conditions = data.query.results.channel.item;

        data = conditions.condition;

        t = data.temp;
        w = data.text;
        c = data.code;
        temp_level = setThermometer(parseInt(t));
        weather_icon = setWeatherIcon(c);

        html = '<div>' + t + '°F' + '</div>';
        html += '<div>'+ w + '</div>';
        document.getElementById('weather').innerHTML = html;
        thermometer_fa = "fa-thermometer-" + temp_level;
        document.getElementById('thermometer').classList.add(thermometer_fa);
        document.getElementById('weather_icon').classList.add(weather_icon);
    }

    function startWeather(){
        YQL = "https://query.yahooapis.com/v1/public/yql?q=select" +
            " item from weather.forecast where woeid" +
            " in (select woeid from geo.places(1)" +
            " where text='New York, NY')&format=json";

        $.getJSON(YQL, function(data){
            Weather(data)
        });



    }


});






