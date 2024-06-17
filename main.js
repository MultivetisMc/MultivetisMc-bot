const Discord = require("discord.js")
const bot = new Discord.Client({intents:3276799})
const loadCommands = require("./Loaders/loadCommands")
const loadEvents = require("./Loaders/loadEvents")
const tokenconfig = require("./Config/Token.js")

bot.commands = new Discord.Collection()
bot.buttons = new Discord.Collection()
bot.color = "#ac3015";
bot.function = {
    createId: require("./Fonctions/createId.js"),
    levenshteinDistance: require("./Fonctions/levenshteinDistance.js"),
    databaseConnect : require("./Fonctions/databaseConnect.js")
}

bot.login(tokenconfig.token)
loadCommands(bot, process.cwd() + '/Commandes');
loadEvents(bot)

require(`./anti-crash.js`)();