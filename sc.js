var WebSocketServer = require('ws').Server, wss = new WebSocketServer({port: 8013});
//var WebSocket = require('ws'), wsc = new WebSocket("ws://localhost:1336/");
var http = require('https');
//var xml2js = require('xml2js');

var temp,dist,desc,move;


//var prompt = require('prompt');

//prompt.start();

// prompt.get(['username', 'password'], function (err, result) {
//     if (err) { return onErr(err); }
//     console.log('Command-line input received:');
//     console.log('  Username: ' + result.username);
//     un = result.username;
//     console.log('  Password: ' + '******');
//     pw = result.password;
// });

departure = new Date();



function onErr(err) {
    console.log("ERROR"  + err);
    return 1;
}

//var parser = new xml2js.Parser();

/*wsc.onmessage = function(event) {
    temp = event.data.temp;
    dist = event.data.dist;
    desc = event.data.desc
    move = event.data.move;
};*/

console.log('Im up');

wss.on('connection', function(ws) {
    var connected = true;

    var ruterdata = setInterval(function() {
        try {
            ruterData()
        } catch (e) {
            console.log(e);
            return;
        }
    }, 300000);

    ruterData();
    

    var inter = setInterval(function(){ 

        try {       

            fetchSCData(function(lulz) {
                //var data = Math.min(0, lulz.length/100000.).toString();
                try {
                    var data = JSON.parse(lulz);
                } catch (e) {
                    console.log(e);
                    return;
                }
                console.log("Departure" + departure);            
                console.log("Now" + new Date());            
                if(departure < new Date()) {
                    ruterData();
                }
                //console.log(temp + " " + dist + " " + desc  + " " + move);
                if (connected) {
                    ws.send(JSON.stringify({
                        "socialcast": data.messages.length,
                        "departure": ((new Date(departure) - new Date())/1000/60)
                    }));
                }
                
            });
        } catch (e) {
            console.log(e);
            return;
        }

    }, 1000);

    console.log("WebSocket connection opened");
    ws.on("close", function() {
        connected = false;
        console.log("WebSocket connection closed");
        clearInterval(inter);
    });
});


function fetchSCData(callback) {
    var date = new Date();
    date.setMinutes(date.getMinutes() - 60);
    var url = "socialcast.bekk.no";
    var path = "/api/streams/company/messages.json?since="  + Math.floor(date.getTime()/1000);
    getScData(url, path, callback);
}

function ruterData() {
    fetchRuterData(function(responsebody) {
        try {
            var data = JSON.parse(responsebody);
            departure = new Date(data[0].MonitoredVehicleJourney.MonitoredCall.AimedDepartureTime);
        if(departure < new Date()) {
            departure = new Date(data[1].MonitoredVehicleJourney.MonitoredCall.AimedDepartureTime);
        }
        console.log('Bussen går om ' + ((new Date(departure) - new Date())/1000/60) + ' minutter.');
        } catch (e) {
            console.log(e);
            return;
        }        
    });    
}

function fetchRuterData(callback) {
    var url = 'reisapi.ruter.no';
    var path = '/stopvisit/getdepartures/3010071?json=true';
    http.get({host: url, path: path}, function(response) {
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {
            callback(body);
        });
    });
}

function getScData(url, path, callback) {

    var auth = 'Basic ' + new Buffer(un + ':' + pw).toString('base64');
    http.get({
        host: url,
        path: path,
        headers:{'Authorization':auth}
    }, function(response) {
       //console.log('Response is '+ response.statusCode);
        // Continuously update stream with data
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {
            //console.log('fikk melding');
            //console.log(body.length);
            callback(body);
        });
    });

}
