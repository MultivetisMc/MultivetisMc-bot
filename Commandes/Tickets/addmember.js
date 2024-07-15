const Discord = require("discord.js")
const { executeQuery } = require("../../Fonctions/databaseConnect.js")

module.exports = {

    name: "addmember",
    description: "Ajouter un membre au ticket",
    permission: Discord.PermissionFlagsBits.ManageMessages,
    dm: false,
    category: "🔖・Tickets",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre a ajoutée au ticket.",
            required: true,
            autocomplete: false
        },
        {
            type: "string",
            name: "enlever",
            description: "Si vous voulez être retirée.",
            required: false,
            autocomplete: true
        }
    ],

    async run(bot, message, args) {

        const channelMessageSend = message.channel.id
        const channelIsTicketSearch = `SELECT * FROM tickets WHERE channelID = '${channelMessageSend}'`
        const ChannelIsTicketResults = await executeQuery(channelIsTicketSearch)

        if(ChannelIsTicketResults < 1) return message.reply({content: "Ce salon n'est pas un ticket", ephemeral: true})
        let user = args.getUser("membre")
        if(!user) return message.reply("Aucun utilisateur sélectionnée!")

        let choiceremove = args.getString("enlever")
        if(!choiceremove) return choiceremove = "Non"

        const AjoutMembreEnCours = new Discord.EmbedBuilder()
        .setTitle('Système de ticket')
        .setDescription('Ajout du membre en cours')
        .setColor(bot.color)
        .setTimestamp()

        const msg = await message.reply({ embeds: [AjoutMembreEnCours], ephemeral: true });
    
        setTimeout(async () => {
            msg.delete();

            await message.channel.permissionOverwrites.create(message.options.getUser('membre').id, {
                SendMessages: true,
                ReadMessageHistory: true,
                ViewChannel: true
            })

            const AjoutMembreSuccess = new Discord.EmbedBuilder()
            .setTitle("Ajout d'un utilisateur au ticket")
            .setDescription(`${user} a bien été ajouter au ticket.`)
            .setColor(bot.color)
            .setTimestamp();
    
            message.channel.send({embeds: [AjoutMembreSuccess]})
        }, 1000);

        if(choiceremove == "Non") return;
        if(choiceremove == "Oui") {

            await message.channel.permissionOverwrites.delete(message.user.id, {
                SendMessages: false,
                ReadMessageHistory: false,
                ViewChannel: false
            })
        }
    }
}