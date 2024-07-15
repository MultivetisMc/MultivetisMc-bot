const Discord = require('discord.js');
const { executeQuery } = require("../../Fonctions/databaseConnect.js")

module.exports = {
    
    name: "removemember",
    description: "Retirer un membre au ticket",
    permission: Discord.PermissionFlagsBits.ManageMessages,
    dm: false,
    category: "🔖・Tickets",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre a retirée du ticket",
            required: true,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {

        const channelMessageSend = message.channel.id
        const channelIsTicketSearch = `SELECT * FROM tickets WHERE channelID = '${channelMessageSend}'`
        const ChannelIsTicketResults = await executeQuery(channelIsTicketSearch)

        if(ChannelIsTicketResults < 1) return message.reply({content: "Ce salon n'est pas un ticket", ephemeral: true})
        let user = args.getUser("membre")
        if(!user) return message.reply("Aucun utilisateur sélectionnée!")

        const RetraitMembreEnCours = new Discord.EmbedBuilder()
        .setTitle('Système de ticket')
        .setDescription('Retrait du membre en cours')
        .setColor(bot.color)
        .setTimestamp()

        const msg = await message.reply({ embeds: [RetraitMembreEnCours], ephemeral: true });

        setTimeout(async() => {
            msg.delete();

            await message.channel.permissionOverwrites.delete(user.id, {
                SendMessages: false,
                ReadMessageHistory: false,
                ViewChannel: false
            })

            const RemoveMemberSucces = new Discord.EmbedBuilder()
            .setTitle("Retrait d'un utilisateur au ticket")
            .setDescription(`${user} a bien été retiré au ticket.`)
            .setColor(bot.color)
            .setTimestamp();
            
            message.channel.send({embeds: [RemoveMemberSucces]})
        }, 2000);
    }
}