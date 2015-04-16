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

var pw = "skuret1234";
var un = "trappa@bekk.no";

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

    var inter = setInterval(function(){
        fetchSCData(function(lulz) {
            //var data = Math.min(0, lulz.length/100000.).toString();
            var data = JSON.parse(lulz);
            console.log(data.messages.length);
            //console.log(temp + " " + dist + " " + desc  + " " + move);
            if (connected) {
                ws.send(JSON.stringify({
                    "socialcast": data.messages.length
                }));
            }
            
        });

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
    date.setMinutes(date.getMinutes() - 5);
    var url = "socialcast.bekk.no";
    var path = "/api/streams/company/messages.json?since="  + Math.floor(date.getTime()/1000);
    getScData(url, path, callback);
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
