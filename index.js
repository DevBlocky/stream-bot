const Discord = require('discord.js');
const config = require('./config.json');
const bot = new Discord.Client();

/*
    CONFIG STUFF
*/

// bot items
const TOKEN = config.bot.token;
const NICK = config.bot.nickname;
const OWNERS = config.bot.owners;
const CHANNEL_ID = config.bot.music_channel;
const GAME = config.bot.game;
const CMD_PREFIX = config.bot.cmd_prefix;

// radio items
const STREAM_URL = config.radio.stream_url;
const VOL = config.radio.volume;

/*
    VARIABLES
*/
var channel;
var voice;
var dispatcher;

/*
    COMMAND STUFF
*/
const cmds = [
    {name: "play", exec: (msg, args) => {
        if (!dispatcher) // checking if a dispatcher exists
            return;

        if (dispatcher.paused) {
            dispatcher.resume(); // resuming playback of the stream
            msg ? msg.reply("Playback is at maximum power, general sir.") : console.log("Playback is at maximum power, general sir.");
        } else {
            msg ? msg.reply("The stream is already playing dingus") : console.log("The stream is already playing dingus");
        }
    }},
    {name: "pause", exec: (msg, args) => {
        if (!dispatcher) // checking if a dispatcher exists
            return;

        if (!dispatcher.paused) {
            dispatcher.pause(); // pausing the playback of the stream
            msg ? msg.reply("Paused starting rn.") : console.log("Paused starting rn.");
        } else {
            msg ? msg.reply("Duh, the stream is already paused") : console.log("Duh, the stream is already paused");
        }
    }},
    {name: "reset", exec: (msg, args) => {
        if (voice) // checking if a voice exists
            voice.disconnect(); // disconnection
        channel.join().then(voiceStart).catch(console.error); // starting a new playback from the voice channel
        msg ? msg.reply("Welcome back mr. bot") : console.log("Welcome back mr. bot");
    }},
    {name: "volume", exec: (msg, args) => {
        if (dispatcher) { // check for dispatcher
            dispatcher.setVolume(args[0]); // set vol
            msg ? msg.reply(`Mr. Einstien, ${args[0]} is the right ratio!`) : console.log(`Mr. Einstien, ${args[0]} is the right ratio!`);
        }
    }},
    {name: "nick", exec: (msg, args) => {
        if (channel) {
            channel.guild.members.get(bot.user.id).setNickname(args.join(" ")); // set of nickname, by joining the args
            msg ? msg.reply("Subscribed to new nickname") : console.log("Subscribed to new nickname");
        }
    }},
    {name: "game", exec: (msg, args) => {
        bot.user.setGame(args.join(" ")); // setting the game, by joining args
        msg ? msg.reply("Game is my middle name.") : console.log("Game is my middle name.");
    }}
]

// discord messages
bot.on('message', function(msg) {
    var split = msg.content.split(' ');

    var val = cmds.find(x => split[0] === CMD_PREFIX + x.name);

    if (val) {
        console.log(`Incoming command "${msg.content}" from ${msg.author.username}`);

        // checking if perms exists (checking for owner)
        if (!OWNERS.includes(msg.author.id)) { // check if msg sender is an owner
            console.log(`**FLAG**: ${msg.author.username} tried to invoke a command without permissions!`)
            msg.reply("You don't have permissions to do that!");
            return;
        }

        split.shift(); // shifting the split args
        val.exec(msg, split); // invokation
        console.log("Command successfully invoked!");
    } else if (split[0].startsWith(CMD_PREFIX)) {
        console.log(`Unknown command "${msg.content}" was invoked by ${msg.author.username}`);
        msg.reply("It seems that command doesn't exist!");
    }
});

// console commands
process.stdin.resume(); // setting up the chat
process.stdin.setEncoding('utf8');

process.stdin.on('data', function(text) {
    text = text.replace(/\n/g, ""); // getting rid of new line chars
    var split = text.split(" "); // split text by " "
    var cmd = split[0]; // finding the command
    split.shift(); // taking out the first element

    cmds.forEach(function(val, index, arr) {
        if (cmd === val.name) {
            val.exec(null, split);
        }
    });
});

/*
    MAIN BOT STUFF
*/
bot.on("ready", function() {
    console.log("The bot is now ready, lemme just do some stuff to get it setup");

    init(); // initialization of the bot's essentials
});

function init() {
    channel = bot.channels.get(CHANNEL_ID); // finding the channel
    if (!channel) // check if found channel
        throw "The bot couldn't find the channel with the specified ID";
    bot.user.setGame(GAME); // setting the game
    
    channel.guild.members.get(bot.user.id).setNickname(NICK); // setting the bot's nickname

    // connection to the voice channel n stuffs
    if (!channel.joinable)
        throw "The bot doesn't have permissions to join the voice channel";
    
    channel.join().then(voiceStart).catch(console.error);
}

function voiceStart(_voice) {
    voice = _voice;
    
    // starting the voice
    dispatcher = voice.playArbitraryInput(STREAM_URL); // playing the stream using ffmpeg
    dispatcher.setVolume(VOL); // setting the vol
    console.log("Playing audio stream");
}

bot.login(TOKEN);
console.log("The bot is now logged in!");
