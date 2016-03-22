'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var Handlebars = require('handlebars');
var chalk = require('chalk');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var execFile = require('child_process').execFile;
var execOptions = {
  maxBuffer: 1024 * 1024
};

app.post('/', function(req, res){
  if(req.body.ref && checkMaster(req.body.ref)){
    console.log(chalk.yellow('incoming webhook on master'));
    var template = fs.readFileSync(__dirname + '/template.hbs');
    var createTemplate = Handlebars.compile(template.toString());
    var inputData = {
      repositoryName: 'nickells/rehash-spotify-jukebox',
      projectName: 'rehash-spotify-jukebox',
      projectStartFilePath: 'rehash-spotify-jukebox/app.js'
    };

    fs.writeFileSync(__dirname + '/hook.sh', createTemplate(inputData));

    // Exec a shell script
    execFile(__dirname + '/hook.sh', execOptions, function(error, stdout, stderr) {
      if(error) console.log(chalk.red('Error executing script'));
      else console.log(chalk.green('exec complete'));
    });
  }

  res.sendStatus(200);
});

app.set('port', 9001);
app.listen(app.get('port'), function(err){
  if(err) console.log(chalk.red('error', err));
  else console.log(chalk.green('listening on port 9001'));
});

function checkMaster(str){
  var masterString = str.split('/').pop();
  return masterString === 'master';
}