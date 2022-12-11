require("dotenv").config()
// Load discord.js
const {
  Client,
  Intents
} = require('discord.js')
// Create Discord intentions, required in v13
const intents = new Intents(['GUILDS', 'GUILD_MESSAGES'])
// Create Discord client
const client = new Client({
  intents
})

let channel = process.env.channel

// Load mineflayer
const mineflayer = require('mineflayer')
const bot = mineflayer.createBot({ //change these parts if needed
  host: "localhost",
  port: 25565,
  username: 'DiscordBridge'
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
  // Only handle messages in specified channel
  if(message.channel.id !== channel.id){
	  return
  } if(message.author.id === client.user.id) {
	  return
  } if(message.channel.id === channel.id) {
   console.log(`Discord: ${message.author.username}: ${message.content}`);
   bot.chat(`${message.author.username}: ${message.content}`);
	}
})

// In-game messages -> Discord channel
bot.on('chat', (username, message) => {
  // Ignore messages from the bot itself
  if (username === bot.username){
	  return
  } if (username !== bot.username){
  console.log(`Minecraft: ${username}: ${message}`)
  channel.send(`\`${username}\`: ${message}`)
  }
})
client.login(process.env.TOKEN);
