const Discord = require(`discord.js`);
const { queue } = require(`../index.js`);
const ms = require("ms");
let cpuStat = require("cpu-stat");
let os = require('os');

function convertMS(ms) {
    var d, h, m, s;
    s = Math.floor(ms / 1000);
    m = Math.floor(s / 60);
    s = s % 60;
    h = Math.floor(m / 60);
    m = m % 60;
    d = Math.floor(h / 24);
    h = h % 24;
    return {
        d: d
        , h: h
        , m: m
        , s: s
    };
};
  

exports.run = async(client, msg, args) => {
  let u = convertMS(client.uptime);
 let uptime = u.d + " days : " + u.h + " hours : " + u.m + " minutes : " + u.s + " seconds";
  
let cpuLol;
  cpuStat.usagePercent(function(err, percent, seconds) {
    if (err) {
      return console.log(err);
    }
    let gif = 'https://cdn.discordapp.com/attachments/477030812529983489/477451129660243968/456196249700401153.gif'
const embed = new Discord.RichEmbed()
.setColor(0x06238B)
.setAuthor(client.user.username,gif)
.setDescription(`Ping: ${client.ping.toFixed(2)}ms`)
.addField(`Server Count`, `${client.guilds.size}`)
.addField(`Total Members`, `${client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`)
.addField(`Total Channels`, `${client.channels.size}`)
.addField(`Playing Music In`, `${queue.size} Server`)
.addField(":stopwatch: Bot Uptime", `${uptime}`, true)
.addField(":control_knobs: CPU Usage", `${percent.toFixed(2)}%`)
 .addField("Mem Usage", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, true)
msg.channel.send(embed);
  }) 
}
                       
exports.conf = {
   aliases: ['v']
}


  exports.help = {
    name: 'volume' 
  } 