'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var Handlebars = require('handlebars');
var chalk = require('chalk');
var util = require('util');

// Listen on port 9001
// var gith = require('gith').create(9001);

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/', function(req, res){
  console.log(chalk.yellow('got an incoming request', util.inspect(req.body, {showHidden: false, depth: null})));
  res.sendStatus(200);
});

app.set('port', 9001);
app.listen(app.get('port'), function(err){
  if(err) console.log(chalk.red('error', err));
  else console.log(chalk.green('listening on port 9001'));
});

// Import execFile, to run our bash script
// var execFile = require('child_process').execFile;

// var execOptions = {
// 	maxBuffer: 1024 * 1024
// };



// gith({
//   repo: 'nickells/rehash-spotify-jukebox'
// }).on( 'all', function( payload ) {
//   if( payload.branch === 'master' )
//   {
//     console.log(chalk.yellow('incoming payload on master', payload));
//   	var template = fs.readFileSync(__dirname + '/template.hbs');
//   	var createTemplate = Handlebars.compile(template.toString());
//   	var inputData = {
//   		repositoryName: 'pat310/OlympicWebScraper',
//   		projectName: 'OlympicWebScraper',
//   		projectStartFilePath: 'OlympicWebScraper/server.js'
//   	};

//   	fs.writeFileSync(__dirname + '/hook.sh', createTemplate(inputData));

//     // // Exec a shell script
//     // execFile(__dirname + '/hook.sh', execOptions, function(error, stdout, stderr) {
//     //   // Log success in some manner
//     //   if(error) console.log(chalk.red('Error executing script'));
//     //   else console.log(chalk.green('exec complete'));
//     // });
//   }
// });