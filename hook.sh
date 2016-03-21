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

    # Delete current directory
    rm -rf ~/rehash-spotify-jukebox

    # Replace with new files
    mv rehash-spotify-jukebox ~/

    # Perhaps call any other scripts you need to rebuild assets here
    # or set owner/permissions
    # or confirm that the old site was replaced correctly
fi