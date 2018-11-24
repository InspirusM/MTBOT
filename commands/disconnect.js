exports.run = async (client, msg, args) => {
	const serverQueue = require('../index.js').queue.get(msg.guild.id);
	if (!msg.member.voiceChannel) return msg.channel.send({ embed: { description: 'Please Connect To A Voice Channel To Disconnect!'}});
    if(serverQueue.voiceChannel.id !== msg.member.voiceChannel.id) return msg.channel.send({ embed: { color: 0xf91d1d, description: `You must be in **${serverQueue.voiceChannel.name}** to skip the song`}});
		if (!serverQueue) return msg.channel.send({ embed: { description: 'There Is Nothing Playing In The Server Right Now'}});
	serverQueue.songs = [];
	serverQueue.connection.dispatcher.end();
	return msg.channel.send({ embed: { color: 0xef090, description: ':stop_button: Successfully Disconnected!'}});
}

exports.conf = {
   aliases: ['leave', 'dc','stop']
}
 
