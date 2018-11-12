
exports.run = async (client) => {
  console.log(`----Bot Name----${client.user.username}----\nChannels----${client.channels.size}----\nGuilds----${client.guilds.size}`)
    client.user.setActivity("m!help | Rich Quality Music", { "type": "STREAMING", url: "https://twitch.tv/twitch" }); 
 
}
