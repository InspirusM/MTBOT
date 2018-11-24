exports.run = (client, error) => {
	console.log(error);
  client.channels.get("515870321711120385").send(error);
};
