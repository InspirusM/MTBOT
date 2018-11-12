const { queue } = require('../index.js');

this.run = (client, msg ,args) => {
  const serverQueue = queue.get(msg.guild.id);
 	if (!msg.member.voiceChannel) return msg.channel.send({ embed: { description: 'Please Connect To A Voice Channel To Loop The Song!'}});
    if(serverQueue.voiceChannel.id !== msg.member.voiceChannel.id) return msg.channel.send({ embed: { color: 0xf91d1d, description: `You must be in **${serverQueue.voiceChannel.name}** to skip the song`}});
		if (!serverQueue) return msg.channel.send({ embed: { description: 'There Is Nothing Playing In The Server Right Now'}});
  serverQueue.loop = !serverQueue.loop;
  queue.set(msg.guild.id, serverQueue);
  if(serverQueue.loop) return msg.channel.send({ embed: { description: '🔁 Looping Current Song.'}});
  return msg.channel.send({ embed: { description: 'Loop off'}});
}

exports.conf = {
   aliases: ["repeat"]
}
exports.help = {
name: "loop"
}
