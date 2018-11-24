const Discord = require(`discord.js`);
module.exports = (client, guild) => {

 const dd = client.channels.get("515803860707573781");
  let embed = new Discord.RichEmbed()
    .setColor(`#09F2B5`)
    .setTitle(`**${client.user.username} Monitor**`)
    .addField("Musical Tune Leave", guild.name) 
    .addField("Owner ID", guild.owner.id)
    .addField("Guild ID: ", guild.id)
    .addField("My Guild Size", client.guilds.size)
    
   dd.send(embed).then(r => r.react("508453505053491216"));
  };
