const Discord = require("discord.js")

module.exports = {

    name: "claimticket",
    description: "Claim le ticket",
    permission: Discord.PermissionFlagsBits.ManageMessages,
    dm: false,
    category: "・Tickets",
    
    async run(message) {
        setTimeout(async() => {
            await message.channel.permissionOverwrites.edit(message.guild.id, {
                SendMessages: false,
                ReadMessageHistory: true,
            }),
            await message.channel.permissionOverwrites.edit(message.guild.members.cache.get(message.channel.topic).id, {
                SendMessages: true,
                ReadMessageHistory: true,
                ViewChannel: true
            })

            const ClaimTicket = new Discord.EmbedBuilder()
            .setTitle('Ticket')
            .setDescription(`Le ticket a bien été claim par ${message.user}`)
            .setColor(bot.color)
            .setTimestamp();
            
            message.channel.send({embeds: [ClaimTicket]})
        }, 2000);

        const ClaimTicket = new Discord.EmbedBuilder()
        .setTitle('Ticket')
        .setDescription('Vous avez bien recupére le ticket !')
        .setColor(bot.color)
        .setTimestamp();

        await message.reply({embeds: [ClaimTicket], ephemeral: true});
    }
}