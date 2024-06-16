const Discord = require("discord.js")

const SelectChannelTypeEmbed = new Discord.EmbedBuilder()
.setTitle('Ticket')
.addFields(
    { name: 'Catégorie', value: ':x:', inline: true },
    { name: 'Salon', value: ':x:', inline: true },
)
.setColor("#ac3015")
.setTimestamp();

module.exports = { SelectChannelTypeEmbed }