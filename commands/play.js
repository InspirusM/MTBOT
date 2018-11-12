const { handleVideo, youtube, prefix } = require('../index.js');
const { RichEmbed } = require('discord.js');

exports.run = async (client, msg, args) => {
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	
	const voiceChannel = msg.member.voiceChannel;
	if (!voiceChannel) return msg.channel.send({ embed: { description: 'Please Connect To A Voice Channel To Play Something!'}});
	if (!args[1]) return msg.channel.send({ embed: { color: 0x4286f4, description: `*Correct usage is*: **${prefix}play** ***[Song Name]/[Video URL]/[Playlist URL]***`}});
        //if(serverQueue.voiceChannel.id !== msg.member.voiceChannel.id) return msg.channel.send({ embed: { color: 0xf91d1d, description: `Woop I already playing in the other channel you must be in **${serverQueue.voiceChannel.name}** to request the song`}});	
	const permissions = voiceChannel.permissionsFor(msg.client.user);
	if (!permissions.has('CONNECT')) return msg.channel.send({ embed: { description: 'I Can\'t Connect To Your Voice Channel I Don\'t Have Proper Permission!'}});
	if (!permissions.has('SPEAK')) return msg.channel.send({ embed: { description: 'I Can\'t Speak In Your Voice Channel I Don\'t Have Proper Permission!'}});
	if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
		const playlist = await youtube.getPlaylist(url);
		const videos = await playlist.getVideos();
		for (const video of Object.values(videos)) {
			const video2 = await youtube.getVideoByID(video.id);
			await handleVideo(video2, msg, voiceChannel, true);
		}
		return msg.channel.send({ embed: { description: `✅ Playlist: **${playlist.title}** has been added to the queue!`}});
	} else {
		try {
			var video = await youtube.getVideo(url);
		} catch (error) {
			try {
				var videos = await youtube.searchVideos(searchString, 1);
				var video = await youtube.getVideoByID(videos[0].id);
			} catch (err) {
				return msg.channel.send('I Couldn\'t Find The Searched Result');
			}
		}
		return handleVideo(video, msg, voiceChannel);
	}
}

exports.conf = {
   aliases: ['p']
}

exports.help = {
  name: 'forceplay'
}
 
