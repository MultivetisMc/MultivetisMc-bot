const loadSlashCommand = require("../Loaders/loadSlashCommands")
const { ActivityType } = require("discord.js")

module.exports = async bot => {

    await loadSlashCommand(bot)

    bot.user.setPresence({activities: [{name: "La version 1.0.0 en développement",type: ActivityType.Watching}],status:"online"})

    console.log(`Je suis connecté à ${bot.user.tag}!`)
}