const Discord = require('discord.js');

const backButton = new Discord.ActionRowBuilder()
    .addComponents(
        new Discord.ButtonBuilder()
            .setCustomId('back')
            .setLabel('Retour')
            .setStyle('Secondary')
            .setEmoji('⬅️'),
    );

module.exports = { backButton }