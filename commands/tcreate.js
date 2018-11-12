const Discord = require(`discord.js`);
const db = require(`quick.db`)
module.exports.run = async (bot, message, args, prefix) => {

const reason = message.content.split(" ").slice(1).join(" ");
    if (!message.guild.roles.find(r => r.name === "Support Team")) return message.channel.send("This Server Doesn't Have `Support Team` Role");

          if (message.guild.channels.find(channel => channel.name === `ticket-${message.author.id}`)) {
      return message.channel.send(`You already have a ticket open.`);
    }
await message.guild.createChannel('Support', 'category', [{
  id: message.guild.id,
  deny: ['MANAGE_MESSAGES'],
  allow: ['SEND_MESSAGES']
}]);
    message.guild.createChannel(`ticket-${message.author.id}`, "text").then(c => {

    c.setParent(message.guild.channels.find(channel => channel.name === "Support"));
        let role = message.guild.roles.find(r => r.name === "Support Team");

        let role2 = message.guild.roles.find(r => r.name === "@everyone");

        c.overwritePermissions(role, {

            SEND_MESSAGES: true,

            READ_MESSAGES: true

        });

        c.overwritePermissions(role2, {

            SEND_MESSAGES: false,

            READ_MESSAGES: false

        });

        c.overwritePermissions(message.author, {

            SEND_MESSAGES: true,

            READ_MESSAGES: true

        });
  
        message.channel.send(`:white_check_mark: Your ticket has been created, #${c.name}.`);

        const embed = new Discord.RichEmbed()

        .setColor(0xCF40FA)

        .addField(`Hey ${message.author.username}!`, `Hey :slight_smile: ${message.author.username} Wait For **Support Team** Until They See Your Message`)

        .setTimestamp();

        c.send({ embed: embed });

        c.send(`@here`);

    }).catch(console.error);
  
  

};
exports.conf = {
aliases: [""]
}