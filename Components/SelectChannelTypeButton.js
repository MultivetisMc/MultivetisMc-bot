const Discord = require("discord.js")

const SelectChannelTypeButton = new Discord.ActionRowBuilder()
.addComponents(
    new Discord.ButtonBuilder()
    .setCustomId('category')
    .setLabel('Catégorie')
    .setStyle('Primary'),
    new Discord.ButtonBuilder()
    .setCustomId('channel')
    .setLabel('Salon')
    .setStyle('Primary'),
    new Discord.ButtonBuilder()
    .setCustomId('valid')
    .setLabel('Valider')
    .setStyle('Success'),
)

module.exports = { SelectChannelTypeButton }