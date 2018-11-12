const Discord = require('discord.js');
module.exports.run = async (client, msg, args) => { 
    let message = msg;
    if(msg.author.id !== "465119467228364805" && msg.author.id !== '437525938582847489' && msg.author.id !== '436184825423069194') return msg.channel.send("You Cannot Use This Command Because, You Are Not A Developer.")

           let embed = new Discord.RichEmbed()
  .setColor("#BE11E9")
  .setTitle("Bot is Restarting..")
     
  await message.channel.send(embed).then(c => c.react("509205851311964161"))
  
    client.destroy();
    process.exit(1)
        .then(() => client.login(process.env.BOT_TOKEN))

    }
exports.conf = {
aliases: ["restart","rebot"]
}
module.exports.help = {
    name: "reboot"
}