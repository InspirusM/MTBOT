const Discord = require('discord.js');
const snekfetch = require('node-superfetch');
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const cpuStat = require('cpu-stat');

module.exports.run = async (client, message, args) => {
 var bot = client;
 var msg = message;
    if (!['465119467228364805', '437525938582847489',''].includes(message.author.id)) {
        return;
    }
    function clean(text) {
        if (typeof (text) === 'string') {
            return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
        }
        return text;
    }
        function clean(text) {
      if (typeof(text) === "string")
        return text.replace(/'/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
      else
          return text;
    }
  
  console.log(`\n${message.author.username}#${message.author.discriminator} Used Eval Command On ${message.guild.name}`)
  
      try {
        let codein = args.join(" ");
        let code = eval(codein);
        
        if (typeof code !== 'string')
            code = require('util').inspect(code, { depth: 0 });
        let embed = new Discord.RichEmbed()
        .setAuthor('Evaluate')
        .setColor('#2A99EE  ')
        .addField(':inbox_tray: Input', `\`\`\`js\n${codein}\`\`\``)
        .addField(':outbox_tray: Output', `\`\`\`js\n${code}\n\`\`\``)
        message.channel.send(embed)
    } catch(e) {
        let eer = new Discord.RichEmbed()
        .setTitle(`Eval Error ❌`)
        .setColor("#F20909")
        .addField(`Error`,`\`\`\`js\n${e}\n\`\`\``)
        message.channel.send(eer);
    }
}

exports.conf = {
   aliases: ["eval"]
}

