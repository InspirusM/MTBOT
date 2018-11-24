
const { Discord, Client , Util, RichEmbed } = require('discord.js');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const fs = require('fs')
const path = require('path');
const snek = require('node-superfetch');
var db = require(`quick.db`);

const client = new Client({
	disableEveryone:true,
	disabledEvents:[
		"TYPEING_START",
		"CHANNEL_PINS_UPDATE",
		"MESSAGE_UPDATE",
		"RELATIONSHIP_ADD",
		"RELATIONSHIP_REMOVE"
	],
});
client.pings = new Array(96).fill(0);
client.util = require('./util.js');
client.queue = this.queue;
client.commands = fs.readdirSync('./commands');
client.aliases = {};

const youtube = new YouTube(process.env.YOUTUBE_API_KEY);

const queue = new Map();

  // DBL post
const DBL = require("dblapi.js");
const dbl = new DBL(process.env.DBL_TOKEN, client);

dbl.on('posted', () => {
  console.log('Server count on DBL posted!');
});
 
dbl.on('error', e => {
 console.log(`Oops! ${e}`);
}); 

const DiscordBoats = require("dboats-api");
const boats = new DiscordBoats({token: "CwLQ6jedULP0mh444LLzjLydSe6Xzz"});

boats.postGuilds(client.guilds.size).then(() => console.log("Posted guild count on https://discordboats.club/bot/489076647727857685"));

// event handler 
fs.readdir("./events/", (err, files) => {
if (err) console.log(err);
files.forEach(file => {
let eventFunc = require(`./events/${file}`);
let eventName = file.split(".")[0];
client.on(eventName, (...args) => eventFunc.run(client, ...args));
	});
});

for(const cmd of client.commands){
const file = require(`./commands/${cmd}`);
if(!file.conf || !file.conf.aliases) continue;
if(file.conf.aliases instanceof Array){
for(const al of file.conf.aliases){
client.aliases[al] = cmd;
    }
  }else{
client.aliases[file.conf.aliases] = cmd;
  }
}

client.on('warn', console.warn);

client.on('error', error => console.log(error));

client.on('disconnect', () => console.log('I just disconnected, making sure you know, I will reconnect now...'));

client.on('reconnecting', () => console.log('I am reconnecting now!'));


client.on('message', async msg => { // eslint-disable-line

  //prefix 

var prefix = 'm!';
if(msg.content === prefix) return;
  if (!msg.guild) return;

	if (msg.author.bot) return undefined;
  
	if (!prefix || !msg.content.startsWith(prefix)) return undefined;

	const args = msg.content.slice(prefix.length).split(' ');
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(msg.guild.id);

	let command = msg.content.slice(prefix.length).split(' ')[0];
	command = command.toLowerCase();
  
    try {
      if(client.aliases[command]){
        delete require.cache[require.resolve(`./commands/${client.aliases[command]}`)];
        require(`./commands/${client.aliases[command]}`).run(client, msg, args, prefix);

      }else{

    delete require.cache[require.resolve(`./commands/${command}.js`)];

    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(client, msg, args, prefix);

      }

  } catch (e) {
    console.log(e.message)                                                                  
    client.channels.get('509187565182517250').send(`**ERROR**\n\`\`\`in\n${e}\`\`\``)
  } finally {
   console.log(`${msg.author.tag} Used
${command} In Guild ${msg.guild.name} ID (${msg.guild.id})`)
  }
});

exports.handleVideo = handleVideo;
exports.queue = queue;
exports.youtube = youtube;

async function handleVideo(video, msg, voiceChannel, playlist = false) {
	const serverQueue = queue.get(msg.guild.id);
	//console.log(video)
	const song = {
   		id: video.id,
		title: Util.escapeMarkdown(video.title),
		url: `https://www.youtube.com/watch?v=${video.id}`, 
		durationh: video.duration.hours,
		durationm: video.duration.minutes,
		durations: video.duration.seconds,
		duration: video.duration,   
		mamang: msg.member.voiceChannel.name, 
		meminta: msg.author,
		uploadedby: video.channel.title,
		channelurl: `https://www.youtube.com/channel/${video.channel.id}`,
};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 100,
			playing: true,
                        loop: false
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`I could not join the voice channel: ${error}`);
			queue.delete(msg.guild.id);
			return msg.channel.send({ embed: { color: 0xf91d1d, description: `I could not join the voice channel: ${error}`}});
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs) 
		if (playlist) return undefined;
  
var adedembed = new RichEmbed() 

  .setColor(`#009BFF`)
  .setAuthor(`Added to Queue`, `https://images-ext-1.discordapp.net/external/YwuJ9J-4k1AUUv7bj8OMqVQNz1XrJncu4j8q-o7Cw5M/http/icons.iconarchive.com/icons/dakirby309/simply-styled/256/YouTube-icon.png`)
  .setThumbnail(`https://i.ytimg.com/vi/${song.id}/default.jpg?width=80&height=60`)
  .addField('Title', `**[${song.title}](${song.url})**`, false)
  .addField("Video Uploader", `[${song.uploadedby}](${song.channelurl})`, true)
  .addField("Duration", `${song.durationh} Hours, ${song.durationm} Minutes, ${song.durations} Seconds`, true)
  .addField('Requested by', `${song.meminta}`)
  .setTimestamp();
		
 return msg.channel.send(adedembed);
	}
	return undefined;
}

function play(guild, song, msg) {
	const serverQueue = queue.get(guild.id);
	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs) 

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'Stream is not generating quickly enough.');
			else console.log(reason);
			const shifed = serverQueue.songs.shift();
      if(serverQueue.loop) serverQueue.songs.push(shifed);
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 200);

var pleyembed = new RichEmbed() 

  .setColor(`#009BFF`)
  .setAuthor(`Start Playing`, `https://images-ext-1.discordapp.net/external/YwuJ9J-4k1AUUv7bj8OMqVQNz1XrJncu4j8q-o7Cw5M/http/icons.iconarchive.com/icons/dakirby309/simply-styled/256/YouTube-icon.png`)
  .setThumbnail(`https://i.ytimg.com/vi/${song.id}/default.jpg?width=300&height=300`)
  .addField('Title', `**[${song.title}](${song.url})**`, false)
  .addField("Video Uploader", `[${song.uploadedby}](${song.channelurl})`, true)
  .addField('Requested by', `${song.meminta}`, true)
  .addField('Voice Channel', `**${song.mamang}**`, true)
  .addField("Volume", `${serverQueue.volume}%`, true)
  .addField("Duration", `${song.durationh} Hours, ${song.durationm} Minutes, ${song.durations} Seconds`, true)
  .setTimestamp();

	serverQueue.textChannel.send(pleyembed); //.then(() => {m.delete(); });

}

client.login(process.env.BOT_TOKEN);
