const Discord = require("discord.js");
const snekfetch = require('node-superfetch');
exports.run = async (client, message, args) => {
    try {
        const { body } = await snekfetch
        .get('https://liapi.glitch.me/memes')
        const embed = new Discord.RichEmbed()
        .setColor('#FF9301')
        .setImage(body.image)
        message.channel.send(embed)
    } catch (err) {
        return console.log(err);
    }
}
exports.conf = {
aliases: [""]
}