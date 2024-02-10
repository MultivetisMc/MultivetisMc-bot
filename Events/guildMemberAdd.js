const Discord = require("discord.js");

module.exports = async (bot, member) => {

    if(member.guild.id !== ("849364107978604544")) {

        const logsChannel = "1108450199241756744"

        bot.channels.cache.get("849371267626434610").send(`Bienvenue à <@${member.id}>, il vient d'arrivée sur le serveur!`)

        const logsNewMember = new Discord.EmbedBuilder()
        .setColor(bot.color)
        .setTitle("Nouveau membre sur le serveur")
        .setDescription(`${member.user.tag} a rejoint le serveur.`)
        .setFooter({ text: "Gérée par l'instance de Peperehobbits01's Bot", iconURL: bot.user.displayAvatarURL({ dynamic: true }) })
    
        logsChannel.send({ embeds: [logsNewMember] })

    } else if(member.guild.id === ("1199749157569695755")) {

        const logsChannel = "1203773209523134525"

        const logsNewMember = new Discord.EmbedBuilder()
        .setColor(bot.color)
        .setTitle("Nouveau membre sur le serveur")
        .setDescription(`${member.user.tag} a rejoint le serveur.`)
        .setFooter({ text: "Gérée par l'instance de Peperehobbits01's Bot", iconURL: bot.user.displayAvatarURL({ dynamic: true }) })
    
        logsChannel.send({ embeds: [logsNewMember] })

    }
}