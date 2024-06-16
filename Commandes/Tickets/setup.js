const Discord = require('discord.js')
const { SelectChannelTypeButton } = require('../../Components/SelectChannelTypeButton')
const { SelectChannelTypeEmbed } = require('../../Components/SelectChannelTypeEmbed')

module.exports = {
    
    name: "setup",
    description: "Setup ticket !",
    permission: Discord.PermissionFlagsBits.ManageChannels,
    dm: false,
    category: "・Tickets",

    async run(interaction) {

        return interaction.reply({ embeds: [SelectChannelTypeEmbed], components: [SelectChannelTypeButton] });
    }
}