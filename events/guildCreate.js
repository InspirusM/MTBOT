var Discord = require('discord.js')
module.exports = async (client, guild, message) => {
  const dd = client.channels.get("515803860707573781");
  let ae = client.guilds.get(guild.id);
 let a = ae.channels.random().createInvite().then(ab => dd.send(ab.toString()));
  let embed = new Discord.RichEmbed()
    .setColor(`RANDOM`)
    .addField("Music Tune Joined", guild.name) 
    .addField("Owner ID:", guild.owner.id)
    .addField("Guild ID: ", guild.id)
    .addField("My Guild Size",client.guilds.size)
    
   dd.send(embed).then(r => r.react("496564404884865036"))
};
