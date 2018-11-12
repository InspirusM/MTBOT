const { RichEmbed } = require('discord.js');

exports.run = async (client, msg, args) => {
  const serverQueue = require('../index.js').queue.get(msg.guild.id);
	    if(serverQueue.voiceChannel.id !== msg.member.voiceChannel.id) return msg.channel.send({ embed: { color: 0xf91d1d, description: `You must Be In **${serverQueue.voiceChannel.name}** To Resume The Song`}});	
	
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return msg.channel.send({ embed: { description: ':play_pause: Successfully Resumed!'}});
		}
	return msg.channel.send({ embed: { description: 'There is nothing playing.'}});
	};

exports.help = {
  name: 'resume'
} 
