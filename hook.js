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
    // Exec a shell script
    execFile('./hook.sh', execOptions, function(error, stdout, stderr) {
      // Log success in some manner
      console.log( 'exec complete' );
    });
  }
});