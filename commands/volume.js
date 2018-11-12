
exports.run = async(client, msg, args) => {

    const serverQueue = require('../index.js').queue.get(msg.guild.id);
if (!msg.member.voiceChannel) return msg.channel.send({ embed: { description: 'You Are Not Connected To A Voice Channel'}});
    if(serverQueue.voiceChannel.id !== msg.member.voiceChannel.id) return msg.channel.send({ embed: { color: 0xf91d1d, description: `You must be in **${serverQueue.voiceChannel.name}** to change the current volume`}});	
		if (!serverQueue) return msg.channel.send({ embed: { description: 'There Is Nothing Playing In The Server Right Now!'}});
    var botRoleColorSync = msg.guild.member(client.user).highestRole.color;
		if (!args[1]) return msg.channel.send({embed: { color: 0x32ffe7,  description: `The current volume is: **${serverQueue.volume}**%`}});
		serverQueue.volume = args[1];
    if (args[1] > 100) return msg.channel.send({ embed: { description: `${msg.author} Volume limit is 100%!`}});
    serverQueue.volume = args[1];
    if (args[1] > 100) return !serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 100) +
    msg.channel.send({ embed: { description: `${msg.author} Volume limit is 100%!`}});
 
    if (args[1] < 101) return serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 100) + msg.channel.send({ embed: { description: `I set the volume to: __**${args[1]}**%__`}});
    
}

exports.conf = {
   aliases: ['v']
}


  exports.help = {
    name: 'volume' 
  } 
