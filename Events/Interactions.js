const Discord = require("discord.js")
const transticket = require('discord-html-transcripts')
const { backButton } = require('../Components/BackButton')
//const { SelectChannelTypeButton } = require('../Components/SelectChannelTypeButton')
//const { SelectChannelTypeEmbed } = require('../Components/SelectChannelTypeEmbed')

module.exports = async(interaction, bot) => {

        if (interaction.isButton()) {
            //await interaction.deferUpdate();
            let channelTicket = [];
            const req = await interaction.bot.db.selectone('tickets', 'guildId', interaction.guild.id);
            let category;
            if(req.length < 1) {
                category = interaction.channel.parent.id;
            } else {
                if(req[0].category === 'false') {
                    category = interaction.channel.parent.id;
                } else {
                    category = req[0].category;
                }
            }

            if(interaction.customId === 'openTicket') {

                const openTicketEmbed = new Discord.EmbedBuilder()
                .setTitle('Ticket')
                .setDescription(`Veuillez patienter...`)
                .setColor(bot.color)
                .setTimestamp()

                const msg = await interaction.reply({ embeds: [openTicketEmbed], ephemeral: true });
                setTimeout(async() => {
                    const channel = await interaction.guild.channels.create({
                        name: `ticket-${interaction.user.username}`,
                        type: 0,
                        parent: category,

                        permissionOverwrites: [
                            {
                                id: interaction.user.id,
                                allow: [
                                    Discord.PermissionFlagsBits.ViewChannel,
                                    Discord.PermissionFlagsBits.SendMessages,
                                    Discord.PermissionFlagsBits.ReadMessageHistory,
                                    Discord.PermissionFlagsBits.EmbedLinks,
                                    Discord.PermissionFlagsBits.AttachFiles,
                                    Discord.PermissionFlagsBits.UseExternalEmojis,
                                    Discord.PermissionFlagsBits.AddReactions,
                                ],
                            },
                            {
                                id: interaction.guild.roles.everyone.id,
                                deny: [
                                    Discord.PermissionFlagsBits.ViewChannel,
                                    Discord.PermissionFlagsBits.SendMessages,
                                    Discord.PermissionFlagsBits.ReadMessageHistory,
                                    Discord.PermissionFlagsBits.EmbedLinks,
                                    Discord.PermissionFlagsBits.AttachFiles,
                                    Discord.PermissionFlagsBits.UseExternalEmojis,
                                    Discord.PermissionFlagsBits.AddReactions,
                                ],
                            },
                        ],
                    });
                    channelTicket.push({
                        channelId: channel.id,
                        guildId: interaction.guild.id,
                        userId: interaction.user.id,
                        parentId: category,
                    });
                    openTicketEmbed.setDescription(`Création du ticket...`);
                    msg.edit({ embeds: [openTicketEmbed], ephemeral: true });
                }, 2000);

                setTimeout(() => {
                    const storedChannelInfo = channelTicket[0];
                    const { channelId, parentId, userId, guildId } = storedChannelInfo;
                    const channel = interaction.bot.channels.cache.get(channelId);
                    const embedTicketOpen = new Discord.EmbedBuilder()
                    .setTitle("Votre ticket est ouvert!")
                    .setDescription(`Merci d'avoir ouvert ce ticket !\nPour avoir de l'aide, merci de patientez le temps qu'un membre du staff arrive !`)
                    .setColor(bot.color)
                    .setTimestamp()

                    const closeTicket = new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.ButtonBuilder()
                            .setCustomId('closeTicket')
                            .setLabel('Fermer le Ticket')
                            .setStyle('Danger')
                            .setEmoji('🔒'),
                    )
                    
                    channel.send({ embeds: [embedTicketOpen], components: [closeTicket] });
                    openTicketEmbed.setDescription(`Envoie de l'embed dans le ticket...`);
                    msg.edit({ embeds: [openTicketEmbed], ephemeral: true });
                }, 4000);

                setTimeout(() => {
                    const storedChannelInfo = channelTicket[0];
                    const { channelId, parentId, userId, guildId } = storedChannelInfo;
                    const channel = interaction.bot.channels.cache.get(channelId);
                    channel.setTopic(`${userId}`)
                    openTicketEmbed.setDescription(`Votre ticket est prêt !\n<#${channelId}>`);
                    msg.edit({ embeds: [openTicketEmbed], ephemeral: true });
                    channel.send({ content: `<@${userId}>` }).then(msg => {
                        msg.delete();
                    });
                }, 6000);
            };

            if(interaction.customId === 'closeTicket') {
                interaction.deferUpdate();

                const yesnoClose = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId('yesopenticket')
                        .setLabel('Oui')
                        .setStyle('Success'),
                    new Discord.ButtonBuilder()
                        .setCustomId('nocloseticket')
                        .setLabel('Non')
                        .setStyle('Danger'),
                )

                return interaction.message.edit({ components: [yesnoClose] });
            };
            if(interaction.customId === 'yesopenticket') {
                const user = await interaction.bot.users.fetch(interaction.channel.topic);
                interaction.deferUpdate();
                await interaction.message.edit({ components: [] });

                const yesopenTicketEmbed = new Discord.EmbedBuilder()
                .setTitle('Ticket')
                .setDescription(`Veuillez patienter...`)
                .setColor(bot.color)
                .setTimestamp()

                const msg = await interaction.channel.send({embeds: [yesopenTicketEmbed]});
                setTimeout(async() => {
                    yesopenTicketEmbed.setDescription(`Création du transcript...`);
                    msg.edit({ embeds: [yesopenTicketEmbed], ephemeral: true });
                }, 2000);
                setTimeout(() => {
                    yesopenTicketEmbed.setDescription(`Fermeture du ticket...`);
                    msg.edit({ embeds: [yesopenTicketEmbed], ephemeral: true });
                }, 4000);
                setTimeout(async () => {
                    const transcript = await transticket.createTranscript(interaction.channel, { limit: 1000000, reason: `Ticket ferme par ${interaction.user.tag}` });
                    interaction.channel.delete();
                    yesopenTicketEmbed.setDescription(`Votre ticket a été fermé sur le serveur \`${interaction.guild.name}\``);
                    user.send({ embeds: [yesopenTicketEmbed], files: [transcript]});
                }, 8000);
            }
            if(interaction.customId === 'nocloseticket') {
                interaction.deferUpdate();

                const closeTicket = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId('closeTicket')
                        .setLabel('Fermer le Ticket')
                        .setStyle('Danger')
                        .setEmoji('🔒'),
                )

                return interaction.message.edit({ components: [closeTicket] });
            }

            if (interaction.customId === 'category') {

                const rowCategory = new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.ChannelSelectMenuBuilder()
                        .setCustomId('selectCategory')
                        .setMinValues(1)
                        .setMaxValues(1)
                        .addChannelTypes(Discord.ChannelType.GuildCategory)
                        .setPlaceholder('Categorie')
                )

                return interaction.message.edit({ embeds: [SelectChannelTypeEmbed], components: [rowCategory, backButton] });
            };
            if(interaction.customId === 'channel') {

                const rowChannel = new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.ChannelSelectMenuBuilder()
                        .setCustomId('selectChannel')
                        .setMinValues(1)
                        .setMaxValues(1)
                        .addChannelTypes(Discord.ChannelType.GuildText)
                        .setPlaceholder('Salon')
                )

                return interaction.message.edit({ embeds: [SelectChannelTypeEmbed], components: [rowChannel, backButton] });
            };
            if(interaction.customId === 'back') {

                return interaction.message.edit({ embeds: [SelectChannelTypeEmbed], components: [SelectChannelTypeButton] });
            };
            if(interaction.customId === 'valid') {
                let category = interaction.bot.channels.cache.find(channel => channel.name === SelectChannelTypeEmbed.data.fields[0].value);
                if(category === ':x:' || category === 'undefined' || category === undefined) category = 'false';
                let channel = interaction.bot.channels.cache.find(channel => channel.name === SelectChannelTypeEmbed.data.fields[1].value);
                if(channel === ':x:' || channel === 'undefined' || channel === undefined) channel = 'false';
                const req = await interaction.bot.db.selectone('tickets', 'guildId', interaction.guild.id);
                try {
                    if(req.length < 1) {
                        await interaction.bot.db.insert('tickets', ['guildId', 'category', 'channel'], [interaction.guild.id, category.id, channel.id]);
                        return interaction.message.edit({components: [] });
                    } else {
                        await interaction.bot.db.update('tickets', 'category', category.id, 'guildId', interaction.guild.id);
                        await interaction.bot.db.update('tickets', 'channel', channel.id, 'guildId', interaction.guild.id);
                        return interaction.message.edit({components: [] });
                    }
                } catch (err) {
                    return interaction.reply({ content: 'Une erreur est survenue', ephemeral: true });
                }
            };
    }
}