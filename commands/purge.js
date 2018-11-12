const Discord = require('discord.js');

module.exports.run = async (bot, msg, args) => {
  if(`${args[1]}` == `help`) {
  return msg.cha
  }
  msg.delete();
  const user = msg.mentions.users.first();
  if(!msg.member.hasPermission("MANAGE_MESSAGES")) return msg.reply("You don't have the authority to do so.");
const amount = !!parseInt(msg.content.split(' ')[1]) ? parseInt(msg.content.split(' ')[1]) : parseInt(msg.content.split(' ')[2])
if (!amount) return msg.reply('Must specify an amount to delete!');
if (!amount && !user) return msg.reply('Must specify a user and amount, or just an amount, of messages to purge!');
msg.channel.fetchMessages({
 limit: amount,
}).then((messages) => {
 if (user) {
 const filterBy = user ? user.id : bot.user.id;
 messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
 }
 msg.channel.bulkDelete(messages).catch(error => console.log(error.stack));
});
}
exports.conf = {
aliases: ["clear"]
}
module.exports.help = {
  name: "purge"
}