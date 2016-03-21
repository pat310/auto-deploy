var fs = require('fs');
var Handlebars = require('handlebars');

// Listen on port 9001
var gith = require('gith').create(9001);

// Import execFile, to run our bash script
var execFile = require('child_process').execFile;

var execOptions = {
	maxBuffer: 1024 * 1024 * 15
};

gith({
  repo: 'nickells/rehash-spotify-jukebox'
}).on( 'all', function( payload ) {
  if( payload.branch === 'master' )
  {
  	var template = fs.readFileSync(__dirname + '/template.hbs');
  	var createTemplate = Handlebars.compile(template.toString());
  	var inputData = {
  		repositoryName: 'nickells/rehash-spotify-jukebox',
  		projectName: 'rehash-spotify-jukebox',
  		projectStartFilePath: 'rehash-spotify-jukebox/app.js'
  	};

  	fs.writeFileSync(__dirname + '/hook.sh', template(inputData));

    // Exec a shell script
    execFile(__dirname + '/hook.sh', execOptions, function(error, stdout, stderr) {
      // Log success in some manner
      console.log( 'exec complete' );
    });
  }
});