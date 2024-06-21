const Discord = require("discord.js")
const { executeQuery } = require("../Fonctions/databaseConnect")
const { claimingticketpermissions, panelrole } = require("../Config/TicketConfig")

module.exports = async (bot, message) => {

    if(message.author.bot || message.channel.type === Discord.ChannelType.DM) return;

    const messageSendUserPermissions = message.member.permissions

    if(messageSendUserPermissions.has(claimingticketpermissions)) {

        const messageSendChannel = message.channel.id
        const messageSendChannelSearch = `SELECT * FROM tickets WHERE channelID = '${messageSendChannel}'`
        const messageSendChannelResults = await executeQuery(messageSendChannelSearch)
    
        if(messageSendChannelResults.length >= 1) {
    
            const messageSendUser = message.author.id
            const messageSendUserSearch = `SELECT * FROM tickets WHERE channelID = '${messageSendChannel}' AND userID = '${messageSendUser}'`
            const messageSendUserResults = await executeQuery(messageSendUserSearch)

            if(messageSendUserResults.length == 0) {
                
                const TicketClaimedSearch = `SELECT * FROM tickets WHERE channelID = '${messageSendChannel}' AND Claimed = '1'`
                const TicketClaimedResults = await executeQuery(TicketClaimedSearch)

                if(TicketClaimedResults == 0) {
                    
                    await message.guild.channel.edit({

                        permissionOverwrites: [
                            {
                                id: message.guild.roles.cache.get(panelrole).id,
                                deny: [
                                    Discord.PermissionFlagsBits.ViewChannel,
                                    Discord.PermissionFlagsBits.SendMessages,
                                    Discord.PermissionFlagsBits.ReadMessageHistory,
                                    Discord.PermissionFlagsBits.EmbedLinks,
                                    Discord.PermissionFlagsBits.AttachFiles,
                                    Discord.PermissionFlagsBits.UseExternalEmojis,
                                    Discord.PermissionFlagsBits.AddReactions,
                                    Discord.PermissionFlagsBits.ManageMessages,
                                    Discord.PermissionFlagsBits.ManageGuildExpressions,
                                ]
                            },
                            {
                                id: message.author.id,
                                allow: [
                                    Discord.PermissionFlagsBits.ViewChannel,
                                    Discord.PermissionFlagsBits.SendMessages,
                                    Discord.PermissionFlagsBits.ReadMessageHistory,
                                    Discord.PermissionFlagsBits.EmbedLinks,
                                    Discord.PermissionFlagsBits.AttachFiles,
                                    Discord.PermissionFlagsBits.UseExternalEmojis,
                                    Discord.PermissionFlagsBits.AddReactions,
                                    Discord.PermissionFlagsBits.ManageMessages,
                                    Discord.PermissionFlagsBits.ManageGuildExpressions,
                                ]
                            }
                        ],
                    });

                    const TicketClaimed = `UPDATE tickets SET Claimed = '1' WHERE channelID = '${messageSendChannel}' AND userID = '${messageSendUser}'`
                    await executeQuery(TicketClaimed)
                }
            }
        }
    }  
    return;
}