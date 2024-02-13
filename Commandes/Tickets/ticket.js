const Discord = require('discord.js');

module.exports = {

    name: "ticket",
    description: "Cree un ticket",
    permission: Discord.PermissionFlagsBits.ManageMessages,
    dm: false,
    category: "・Tickets",

    async run(message) {

        const req = await message.client.db.selectone('tickets', 'guildId', message.guild.id);
        const yesopenTicketEmbed = new Discord.EmbedBuilder()
        .setTitle('Ticket')
        .setDescription(`Envoie de l'embed du ticket...`)
        .setColor(bot.color)
        .setTimestamp()

        if (req.length < 1) {
            
            const msg = await message.reply({embeds: [yesopenTicketEmbed], ephemeral: true});
            setTimeout(async() => {
                yesopenTicketEmbed.setDescription(`Embed de ticket envoyé !`);
                await msg.edit({ embeds: [yesopenTicketEmbed]});
                await message.channel.send({ embeds: [embedTicketOpen], components: [openTicket] });
            }, 2000);
        } else {

            const channel = message.guild.channels.cache.get(req[0].channel);
            const embedTicketOpen = new Discord.EmbedBuilder()
            .setTitle('Ouverture de Ticket !')
            .setColor(bot.color)
            .setTimestamp();

            const openTicket = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId('openTicket')
                    .setLabel('Ouvrir un Ticket')
                    .setStyle('Primary')
                    .setEmoji('📩'),
            )
            await channel.send({ embeds: [embedTicketOpen], components: [openTicket] });
            return await message.reply({ content: `**Message envoyé dans ${channel}**`, ephemeral: true});
        }
    }
}