const Discord = require("discord.js")
const { executeQuery } = require("../../Fonctions/databaseConnect.js")
 
module.exports = {
 
    name: "warn",
    description: "Warn un membre ",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    category: "🛡・Modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre a avertir",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "raison",
            description: "La raison de l'avertisement",
            required: false,
            autocomplete: false
        }
    ],
 
    async run(bot, message, args) {
 
        let user = args.getUser("membre")
        if(!user) return message.reply("Aucun utilisateur sélectionnée!")
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply("Aucun utilisateur sélectionnée!")
 
        let reason = args.getString("raison")
        if (!reason) reason = "Pas de raison fournie !"
 
        if(message.user.id === user.id) return message.reply("Essaie pas de te warn ! ")

        try{
            const Warn1 = new Discord.EmbedBuilder()
            .setTitle(`Vous avez été avertie ! `)
            .setDescription(`${message.user.tag} vous a averti sur le serveur ${message.guild.name} pour la raison : \`${reason}\` ! `)
            .setColor(bot.color)
            .setFooter({ text: "Gérée par l'instance de Peperehobbits01's Bot", iconURL: bot.user.displayAvatarURL({ dynamic: true }) })

            await user.send({embeds: [Warn1]})
        }catch(err) {}

        let ID = await bot.function.createId("WARN")
 
        const queryWarnAdd = `INSERT INTO warn (guild, user, author, warn, reason, date) VALUES ('${message.guild.id}', '${user.id}', '${message.user.id}', '${ID}', '${reason.replace(/'/g, "\\'")}', '${Date.now()}')`
        await executeQuery(queryWarnAdd)

        await message.deferReply()

        const unwarn = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId("unwarn")
                    .setLabel("Retirée l'avertisement")
                    .setStyle(Discord.ButtonStyle.Danger)
            )
 
        const Warn2 = new Discord.EmbedBuilder()
        .setTitle("Informations du warn")
        .setDescription(`Vous avez warn ${user.tag} pour la raison : \`${reason}\` avec succès !`)
        .setColor(bot.color)
        .setFooter({ text: "Gérée par l'instance de Peperehobbits01's Bot", iconURL: bot.user.displayAvatarURL({ dynamic: true }) })

        await message.followUp({embeds: [Warn2], components: [unwarn], ephemeral : false})

    }       
}