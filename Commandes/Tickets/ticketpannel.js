const { panelchannel, panelembedtitle, panelembeddescription } = require('../../Config/TicketConfig');
const { botembedfooter } = require("../../Config/GeneralConfig")
const Discord = require('discord.js')

module.exports = {
    
    name: "ticketpannel",
    description: "Envois du pannel de ticket!",
    permission: Discord.PermissionFlagsBits.ManageChannels,
    dm: false,
    category: "🔖・Tickets",

    async run(bot, message) {

        const TicketPanel = new Discord.EmbedBuilder()
        .setTitle(panelembedtitle)
        .setDescription(panelembeddescription)
        .setColor(bot.color)
        .setFooter({ text: botembedfooter, iconURL: bot.user.displayAvatarURL({ dynamic: true }) })

        const TicketPanelButton = new Discord.ActionRowBuilder()
        .addComponents(
            new Discord.ButtonBuilder()
           .setCustomId('ticketpannel')
           .setLabel("Créer un ticket support")
           .setStyle(Discord.ButtonStyle.Success)
           .setEmoji("📩")
        )

        bot.channels.cache.get(panelchannel).send({embeds: [TicketPanel], components: [TicketPanelButton]})

        const TicketPanelSendReply = new Discord.EmbedBuilder()
        .setTitle("Ticket support de DoomCraft envoyée")
        .setDescription(`Le panel du ticket support de DoomCraft a bien été envoyée dans le salon <#${panelchannel}>`)
        .setColor(bot.color)
        .setFooter({ text: botembedfooter, iconURL: bot.user.displayAvatarURL({ dynamic: true }) })
        
        message.reply({embeds: [TicketPanelSendReply]})
    }
}