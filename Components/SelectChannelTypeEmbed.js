const Discord = require("discord.js")

const SelectChannelTypeEmbed = new Discord.EmbedBuilder()
.setTitle('Ticket')
.addFields(
    { name: 'Catégorie', value: ':x:', inline: true },
    { name: 'Salon', value: ':x:', inline: true },
)
.setColor(bot.color)
.setTimestamp();

module.exports = { SelectChannelTypeEmbed }