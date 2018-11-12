const Discord = require(`discord.js`);

module.exports.run = async (bot, msg, args) => {
  
  if(!msg.member.hasPermission("ADMINISTRATOR")) {
    let noperm = new Discord.RichEmbed()
    .setDescription("You Don't Have `ADMINISTRATOR` Permission To Use This Command")
    .setColor(`#d604cf`);
    return msg.channel.send(noperm);
  }
  if(!msg.guild.me.hasPermission("MANAGE_CHANNELS")) {
  let noperm = new Discord.RichEmbed()
  .setDescription("I Don't Have `MANAGE_CHANNELS` Permission To Create Channels")
  .setColor(`#d604cf`);
  return msg.channel.send(noperm);
}

  
await msg.guild.createChannel('Information', 'category', [{
  id: msg.guild.id,
  deny: ['MANAGE_MESSAGES'],
  allow: ['SEND_MESSAGES']
}]);

await msg.guild.createChannel('welcome', 'text')
.then(channel =>
 channel.setParent(msg.guild.channels.find(channel => channel.name === "Information")));

await msg.guild.createChannel('rules', 'text')
.then(channel =>
 channel.setParent(msg.guild.channels.find(channel => channel.name === "Information")));

await msg.guild.createChannel('Announcements', 'text')
.then(channel =>
 channel.setParent(msg.guild.channels.find(channel => channel.name === "Information")));

await msg.guild.createChannel('giveaway', 'text')
.then(channel =>
 channel.setParent(msg.guild.channels.find(channel => channel.name === "Information")));

await msg.guild.createChannel('general', 'category', [{
  id: msg.guild.id,
  deny: ['MANAGE_MESSAGES'],
  allow: ['SEND_MESSAGES']
}]);

await msg.guild.createChannel('chat', 'text')
.then(channel =>
 channel.setParent(msg.guild.channels.find(channel => channel.name === "general")));

await msg.guild.createChannel('bot-cmds', 'text')
.then(channel =>
 channel.setParent(msg.guild.channels.find(channel => channel.name === "general")));

await msg.guild.createChannel('General-VC', 'voice')
.then(channel =>
 channel.setParent(msg.guild.channels.find(channel => channel.name === "general")));

await msg.guild.createChannel('Music', 'voice')
.then(channel =>
 channel.setParent(msg.guild.channels.find(channel => channel.name === "general")));

let message = msg;
await message.guild.createChannel('Fortnite', 'category', [{
  id: message.guild.id,
  deny: ['MANAGE_MESSAGES'],
  allow: ['SEND_MESSAGES']
}]);

await message.guild.createChannel('fortnite-chat', 'text')
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "Fortnite")));

await message.guild.createChannel('Squad 1', 'voice')
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "Fortnite")));
 
  
await message.guild.createChannel('Squad 2', 'voice')
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "Fortnite")));

await message.guild.createChannel('Duo 1', 'voice')
.then(channel => 
 channel.setParent(message.guild.channels.find(channel => channel.name === "Fortnite")));    
  
await message.guild.createChannel('Duo 2', 'voice')
.then(channel => 
 channel.setParent(message.guild.channels.find(channel => channel.name === "Fortnite")));    
     
  
await message.guild.createChannel('PUBG', 'category', [{
  id: message.guild.id,
  deny: ['MANAGE_MESSAGES'],
  allow: ['SEND_MESSAGES']
}]);

await message.guild.createChannel('pubg-chat', 'text')
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "PUBG")));

await message.guild.createChannel('PUBG Squad 1', 'voice')
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "PUBG")));


await message.guild.createChannel('PUBG Squad 2', 'voice')
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "PUBG")));

  
await message.guild.createChannel('PUBG Duo 1', 'voice')
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "PUBG")));


await message.guild.createChannel('PUBG Duo 2', 'voice')
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "PUBG")));

await message.guild.createChannel('Pokémon', 'category', [{
  id: message.guild.id,
  deny: ['MANAGE_MESSAGES'],
  allow: ['SEND_MESSAGES']
}]);
  
await message.guild.createChannel('Pokémon-catching', 'text')
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "Pokémon")));


await message.guild.createChannel('Pokémon-dueling', 'text-')
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "Pokémon")));

  
message.channel.send(`Channel Setup Complete!`);

}
exports.conf = {
aliases: [""]
}