var express = require('express');
var cors = require('cors')
var app = express();

app.use(express.json());
app.use(cors());

app.get('/chart', getChart, sendJSON);
app.get('/dignities', geDignities, sendJSON);

function sendJSON(req, res) {
    // console.log('sendJSON: ', req);
    // return res.json(req.body);
}

function formatData(req, object) {
    const {hour, date, lat, lng} = req.query;
    if (!hour || !date || !lat || !lng) res.send(400);

    var finalHour = hour.toString().substring(0,2);
    finalHour = finalHour.concat(':').concat(hour.substring(2,4));

    var finalDate = date.toString().substring(0,4).concat('/');
    finalDate = finalDate.concat(date.toString().substring(4,6)).concat('/');
    finalDate = finalDate.concat(date.toString().substring(6,8));
    
    return [object+'.py', finalDate, finalHour, '+00:00', lat, lng];
}

function sendData(data, res, next) {
    var spawn = require("child_process").spawn;
    var process = spawn('python3', data);
    process.stdout.on('data', (data) => {
        console.log(data)
        return next(data);
    });
}

function getChart(req, res, next) {
    // http://localhost:3000/chart?date=19791020&hour=1026&lat=22s54&lng=44w11
    const data = formatData(req, 'chart');
    sendData(data, res, next);    
}

function geDignities(req, res, next) {
    // http://localhost:3000/dignities?date=19791020&hour=1026&lat=22s54&lng=44w11
    const data = formatData(req, 'dignities');
    sendData(data, res, next);
}

app.listen(3000, function() {
    console.log('server running on port 3000');
});