#must install unzip on ubuntu if not already there
#sudo apt-get install unzip

#!/bin/bash

# First, get the zip file
cd ~/temps/ && wget -O projectmaster.zip -q https://github.com/nickells/rehash-spotify-jukebox/archive/master.zip

# Second, unzip it, if the zip file exists
if [ -f ~/temps/projectmaster.zip ]; then
    # Unzip the zip file
    unzip -q ~/temps/projectmaster.zip

    # Delete zip file
    rm ~/temps/projectmaster.zip

    # Rename project directory to desired name
    mv Project-master rehash-spotify-jukebox

    #stop current process
    forever stop ~/rehash-spotify-jukebox/app.js

    # Delete current directory
    rm -rf ~/rehash-spotify-jukebox

    # Replace with new files
    mv rehash-spotify-jukebox ~/

    #change into new directory
    cd ~/rehash-spotify-jukebox

    #install node_modules and then start the application
    npm install && forever start app.js

fi