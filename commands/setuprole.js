const Discord = require('discord.js')
 //const moment = require("moment");

exports.run = async (bot, msg, args) => {
  let message = msg;
  
 if(!msg.member.hasPermission("ADMINISTRATOR")) {
    let noperm = new Discord.RichEmbed()
    .setDescription("You Don't Have `ADMINISTRATOR` Permission To Use This Command")
    .setColor(`#d604cf`);
    return msg.channel.send(noperm);
  }
  if(!msg.guild.me.hasPermission("MANAGE_ROLES")) {
  let noperm = new Discord.RichEmbed()
  .setDescription("I Don't Have `MANAGE_ROLES` Permission To Create Roles")
  .setColor(`#d604cf`);
  return msg.channel.send(noperm);
}

message.guild.createRole({
name: 'Owner',
color: '#66b3ff',
permissions: ['ADMINISTRATOR', 'KICK_MEMBERS', 'BAN_MEMBERS']
	})
.catch(console.error);

message.guild.createRole({
name: 'Moderator',
color: '#FF0000',
permissions: ['MANAGE_CHANNELS', 'KICK_MEMBERS', 'BAN_MEMBERS','MANAGE_ROLES']

	})
.catch(console.error);


message.guild.createRole({
name: 'Senior Moderator',
color: '#0000FF',
permissions: ['KICK_MEMBERS','MANAGE_CHANNELS']
	})
.catch(console.error);

message.guild.createRole({
name: 'Junior Moderator',
color: '#00FF00',
permissions: ['MANAGE_MESSAGES']
	})
message.guild.createRole({
name: "Members",
color: "#FFFFF",
permissions: ["SEND_MESSAGES"]
})
.then(role => message.channel.send(`Role Setup Complete!`))
    }
