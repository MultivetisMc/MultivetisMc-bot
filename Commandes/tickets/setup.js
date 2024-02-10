const Discord = require('discord.js');
const row = require('../../TicketBot/src/configs/rows/rowTickets/row');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup')
        .setDescription('Setup ticket !')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
        .setNSFW(false),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('Ticket')
            .addFields(
                { name: 'Catégorie', value: ':x:', inline: true },
                { name: 'Salon', value: ':x:', inline: true },
            )
            .setColor('#0099ff')
            .setTimestamp();
        return interaction.reply({ embeds: [embed], components: [row] });
    }
}