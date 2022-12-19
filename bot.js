require("dotenv").config()

const Discord = require('discord.js');
// Create Discord intentions, required in v13
//const intents = new Intents(['GUILDS', 'GUILD_MESSAGES']);
// Create Discord client
const client = new Discord.Client();


let channel = process.env.channel

const mineflayer = require('mineflayer')
const bot = mineflayer.createBot({ //change these parts if needed
  host: "localhost",
  port: 25565,
  username: 'Bot'	
})

client.on('ready', () => {
  console.log(`The discord bot logged in! Username: ${client.user.username}!`)
  // Find the Discord channel messages will be sent to
  channel = client.channels.cache.get(channel)
  if (!channel) {
    console.log(`Cant find ${channel}. Are you sure this exist?`);
    process.exit(1)
  }
})

// Discord -> in-game chat
client.on('message', (message) => {
 //Todo: Rewrite whole shit in case
 //In-discord commands
 /* if(message.content[0] === "!") {
	  switch(message.content){
		  case "!help":
			  channel.send("Currently working on it..");
		  case "!status"
			  channel.send(`{message.author.username} What the fuck do you expect?`);
	  }
	} */
  if(message.channel.id !== channel.id) return;
  if(message.author.id === client.user.id) return;
  if(message.channel.id === channel.id && message.content[0] !== "!"){
	  console.log(`Discord: ${message.author.username}: ${message.content}`);
	  bot.chat(`${message.author.username}: ${message.content}`);
  	}
});

bot.on('playerJoined', (player) =>{
	bot.chat(`${player.username} joined`);
	if(player.username !== bot.username){
		console.log(`{player.username} joined the game.`);
		channel.send(`{player.username} joined the game.`);
		bot.chat(`Welcome to Cult Of Mental Retardation Minecraft Server ${
player.username}!, We hope you enjoy your stay here!`);
	  }
});

// In-game messages -> Discord channel
bot.on('chat', (username, message) => {
  if(username !== bot.username){
  console.log(`Minecraft: ${username}: ${message}`);
  channel.send(`\`${username}\`: ${message}`);
  }
});
client.login(process.env.TOKEN);
