const Discord = require("discord.js")
const { executeQuery } = require("../Fonctions/databaseConnect")
const { claimingticketpermissions } = require("../Config/TicketConfig")

module.exports = async (bot, message) => {

    const messageSendChannel = message.channel
    const messageSendChannelSearch = `SELECT * FROM tickets WHERE channelID = '${messageSendChannel}'`
    const messageSendCHannelResults = await executeQuery(messageSendChannelSearch)

    if(messageSendCHannelResults.length == 0) return;
    if(messageSendCHannelResults.length >= 1) {

        const messageSendUser = message.user
        const messageSendUserSearch = `SELECT * FROM tickets WHERE userID = '${messageSendUser}'`
        const messageSendUserResults = await executeQuery(messageSendUserSearch)

        if(messageSendUserResults.length == 0) return;
        if(messageSendUserResults.length >= 1) {
            
            
        }
    }
    
}