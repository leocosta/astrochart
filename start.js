const express = require('express');
const cors = require('cors')
const spawn = require('child_process').spawn;

const app = express();
app.use(express.json());
app.use(cors());

app.get('/chart', getChart);
app.get('/dignities', geDignities);

function getChart(req, res, next) {
    // http://localhost:3000/chart?date=19791020&hour=1026&lat=22s54&lng=44w11
    const args = buildArgs(req, 'chart');
    
    spawnPromise('python3', args)
        .then(output => {
            const data = parseJson(output);
            res.json(data);
        })
        .catch(error => res.send(error));
}

function geDignities (req, res, next) {
    // http://localhost:3000/dignities?date=19791020&hour=1026&lat=22s54&lng=44w11
    
    const args = buildArgs(req, 'dignities');
    spawnPromise('python3', args)
        .then(output => {
            
            const data = parseJson(output);
            res.json(data);
        })
        .catch(error => res.send(error));
}

const spawnPromise = (cmd, args) => 
    new Promise((resolve, reject) => {
        try {
            let bufferArray= [];

            const runCommand = spawn(cmd, args);
            
            runCommand.stdout.on('data', data => bufferArray.push(data));
            
            runCommand.on('close', code => resolve(bufferArray.toString()));

            runCommand.on('error', err => {
                throw new Error(err.message);
            });
        } catch (e) {
            reject(e);
        }
    });

const parseJson = value => JSON.parse(value.replace(/\'/g, `"`))

const buildArgs = (req, object) => {
    const {hour, date, lat, lng} = req.query;
    if (!hour || !date || !lat || !lng) res.send(400);
    
    var finalHour = hour.toString().substring(0,2);
    finalHour = finalHour.concat(':').concat(hour.substring(2,4));
    
    var finalDate = date.toString().substring(0,4).concat('/');
    finalDate = finalDate.concat(date.toString().substring(4,6)).concat('/');
    finalDate = finalDate.concat(date.toString().substring(6,8));
    
    return [object+'.py', finalDate, finalHour, '+00:00', lat, lng];
}

app.listen(3000, function() {
    console.log('server running on port 3000');
});