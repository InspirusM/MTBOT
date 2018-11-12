const Discord = require("discord.js");
const moment = require("moment");

module.exports.run = async (bot, message, args) => {
    let nop = args[0];
    let emjarg;
    if(args[0] = ('<:')) {
        emjarg = args[0].split(':').slice(-2)[0];
    } else {
        emjarg = args[0];
    }
    let emoji = message.guild.emojis.find(e => e.name  === `${args[1]}`) || message.guild.emojis.find(e => e.name === emjarg);
if(!nop) return message.channel.send(`**I Can't Find That Emoji.**`);
let anim;
if(emoji.animated == true) {
anim = 'Emoji Is Animated.'
} else {
anim = 'Emoji Isn\'t Animated.'
}
    let emojiembed = new Discord.RichEmbed()
      .setAuthor('Emoji Info', 'https://discordemoji.com/assets/emoji/7872_blob_hero.png')
      .setColor(0x80FF00)
      .setThumbnail(`${emoji.url}`)
      .addField(`» Emoji Name`, `**${emoji.name}**`)
      .addField(`» Emoji ID`, `\`${emoji.id}\``)
      .addField(`» Emoji Animated`,anim, true)
      .addField(`» Emoji Created`, `${moment.utc(emoji.createdAt).format("DD/MM/YYYY")} At ${moment.utc(emoji.createdAt).format("HH")}h${moment.utc(emoji.createdAt).format("mm")}`, true)
      .addField(`» Emoji Link`, `**[Emoji](${emoji.url})**`)
      .setFooter(`» Requested By ${message.author.username}`, `${message.author.displayAvatarURL}`)
      message.channel.send(emojiembed)
      };

    exports.conf = {
      aliases: [""]
    }