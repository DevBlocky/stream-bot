# stream-bot

Hello! And welcome to stream-bot. This is a bot made by BlockBa5her, using the [discord.js](http://discord.js.org/) library, the node.js library, and ffmpeg library. I can be used for streaming your favorite music, from the web, right to your discord!

## What I do

It's a simple answer: I stream music. I can do a little more than that though, I have special commands that can basically just stop/start me, change my nickname, and change the game I'm playing.

There is also a permissions system setup so that only specific people with the IDs can use commands.

## Installation

### Windows

* Install 8.9.1 version of node.js along side of Node Package Manager from the website: [node.js](https://nodejs.org/en/)
* Install the latest version of [Python](https://www.python.org/)
* Follow [this](https://www.wikihow.com/Install-FFmpeg-on-Windows) tutorial up to step 4 to install FFmpeg for windows
* Restart computer
* Download the repo using the `download` button above
* In the folder that you extracted the ZIP to, open a command prompt
* Type `npm install` inside of the command prompt.

### Ubuntu

* Download some items by running the following commands
  * `wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash` Downloads and runs Node Version Manager
  * `nvm install 8.9.1` Installs the latest version of node.js
  * `apt-get install npm ffmpeg` Installs all of the other bits n bobs you need
* You prob should restart your Linux machine, but it's not required
* Goto the `/home` using cd
* Use the following command to download the repo `git clone https://github.com/blockba5her/stream-bot.git streambot`
* Navigate inside the new folder `streambot`
* Use the command `npm install` to install everything you need

## Running

You can easily just run the package by using `node index.js`
