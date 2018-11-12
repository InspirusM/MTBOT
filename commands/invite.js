const Discord = require("discord.js");

module.exports.run = async (client, msg, args) => {

  let inviteembed = new Discord.RichEmbed()
      .setTitle('You Want Me In Your Server?')
      .setDescription('Hello Buddies! You Want A Amazing Bot For Your Server ! Click Below To Invite Me!')
      .setColor('#22B0FA')
      .addField("Invite", `[Click Here](https://discordapp.com/api/oauth2/authorize?client_id=489076647727857685&permissions=2146958839&scope=bot)`)
      .setTimestamp()
  msg.channel.send(inviteembed)

  }
exports.conf = {
aliases: ["invme"]
}
module.exports.help = {
  name: "invite"
}