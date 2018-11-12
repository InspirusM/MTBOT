const Discord = require('discord.js');
const { queue } = require('../index.js');
exports.run = async (client, msg, args) => {
    const serverQueue = queue.get(msg.guild.id);
  		if (!msg.member.voiceChannel) return msg.channel.send({ embed: { description: 'You Are Not Connected To A Voice Channel 🔇'}});
    if(serverQueue.voiceChannel.id !== msg.member.voiceChannel.id) return msg.channel.send({ embed: { color: 0xf91d1d, description: `You must be in **${serverQueue.voiceChannel.name}** to skip the song`}});
		if (!serverQueue) return msg.channel.send({ embed: { description: 'There Is Nothing Playing In The Server Right Now'}});
		serverQueue.connection.dispatcher.end();
		return msg.channel.send(`:fast_forward: Successfully Skipped The Song!`)
  
} 

exports.conf = {
   aliases: ['s']
}

exports.help = {
  name: 'skip' 
} 
