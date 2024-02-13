const Discord = require('discord.js');

module.exports = {
    
    name: "setup",
    description: "Setup ticket !",
    permission: Discord.PermissionFlagsBits.ManageChannels,
    dm: false,
    category: "・Tickets",

    async run(message) {
        const SetupTicket = new Discord.EmbedBuilder()
            .setTitle('Ticket')
            .addFields(
                { name: 'Catégorie', value: ':x:', inline: true },
                { name: 'Salon', value: ':x:', inline: true },
            )
            .setColor('#0099ff')
            .setTimestamp();

        const row = new Discord.ActionRowBuilder()
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
        return message.reply({ embeds: [SetupTicket], components: [row] });
    }
}