const Discord = require("discord.js")
const transticket = require('discord-html-transcripts')
const { executeQuery } = require("../Fonctions/databaseConnect.js") 
const { panelrole, ticketcategory, transcriptchannel, userticketlimit } = require("../Config/TicketConfig.js")

module.exports = async (bot, interaction, message) => {

    if(interaction.type === Discord.InteractionType.ApplicationCommand) {

        const command = bot.commands.get(interaction.commandName);
        command.run(bot, interaction, interaction.options, bot.db)

    }

    if(interaction.type === Discord.InteractionType.ApplicationCommandAutocomplete) {

        let entry = interaction.options.getFocused()

        if(interaction.commandName === "help") {

            let choices = bot.commands.filter(cmd => cmd.name.includes(entry))
            await interaction.respond(entry === "" ? bot.commands.map(cmd => ({name: cmd.name, value: cmd.name})) : choices.map(choices => ({name: choices.name, value: choices.name})))
        }

        if(interaction.commandName === "set-statut") {

            let choices = ["Listening", "Watching", "Playing", "Streaming", "Competing"]
            let sortie = choices.filter(c => c.includes(entry))
            await interaction.respond(entry === "" ? sortie.map(c => ({name: c, value: c})) : sortie.map(c => ({name: c, value: c})))
        }

        if(interaction.commandName === "addmember") {

            let choices = ["Oui", "Non"]
            let sortie = choices.filter(c => c.includes(entry))
            await interaction.respond(entry === "" ? sortie.map(c => ({name: c, value: c})) : sortie.map(c => ({name: c, value: c})))
        }
    }

    if(interaction.customId === 'ticketpannel') {

        const verifuserticketnumber = `SELECT * FROM tickets WHERE userID = '${interaction.user.id}'`
        const resultsverifuserticketnumber = await executeQuery(verifuserticketnumber)

        if(resultsverifuserticketnumber.length == userticketlimit) {

            const userticketlimitembed = new Discord.EmbedBuilder()
            .setColor(bot.color)
            .setTitle('Vous avez dépassée la limite de ticket ouvert!')
            .setDescription(`Vous avez déjà ${userticketlimit} tickets ouverts.`)
            .setTimestamp()
        
            await interaction.reply({ embeds: [userticketlimitembed], ephemeral: true });
        }

        if(resultsverifuserticketnumber.length >= userticketlimit) {

            const userticketlimitembed = new Discord.EmbedBuilder()
            .setColor(bot.color)
            .setTitle('Vous avez dépassée la limite de ticket ouvert!')
            .setDescription(`Vous avez déjà ${userticketlimit} tickets ouverts.`)
            .setTimestamp()
        
            await interaction.reply({ embeds: [userticketlimitembed], ephemeral: true });
        }

        const openTicketEmbed = new Discord.EmbedBuilder()
            .setTitle('Ticket en cours de création.')
            .setDescription(`Veuillez patienter...`)
            .setColor(bot.color)
            .setTimestamp()

        const msg = await interaction.reply({ embeds: [openTicketEmbed], ephemeral: true });
        
        const channelTicket = await interaction.guild.channels.create({
            name: `🔖・ticket-${interaction.user.username}`,
            type: 0,
            parent: ticketcategory,

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
                    id: interaction.guild.roles.cache.get(panelrole).id,
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
                
        openTicketEmbed.setDescription(`Création du ticket...`);
        msg.edit({ embeds: [openTicketEmbed], ephemeral: true });

            setTimeout(async () => {
                const embedTicketOpen = new Discord.EmbedBuilder()
                    .setDescription(`Le support vous répondra sous peu.\nPour fermer ce ticket, réagissez avec 🔒`)
                    .setColor(bot.color)
                    .setTimestamp()

                const closeTicket = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId('closeTicket')
                        .setLabel('Fermer le Ticket')
                        .setStyle(Discord.ButtonStyle.Danger)
                        .setEmoji('🔒')
                )
                    
                const ticketsupportmsg = await channelTicket.send({content: `Bienvenue dans ton ticket ${interaction.user}. Les <@&${panelrole}>s arrive bientôt!`, embeds: [embedTicketOpen], components: [closeTicket] });
                await ticketsupportmsg.pin();
                openTicketEmbed.setDescription(`Envoie de l'embed dans le ticket...`);
                await msg.edit({ embeds: [openTicketEmbed], ephemeral: true });

            }, 2000);

            setTimeout(() => {

                const userticketowner = `INSERT INTO tickets (channelID, userID, Claimed) VALUES ('${channelTicket.id}', '${interaction.user.id}', '0')`
                executeQuery(userticketowner)
                openTicketEmbed.setDescription(`Votre ticket est prêt !\n${channelTicket}`);
                msg.edit({ embeds: [openTicketEmbed], ephemeral: true });
                
            }, 4000);
    };

    if(interaction.customId === 'closeTicket') {
        interaction.deferUpdate();

        const yesnoClose = new Discord.ActionRowBuilder()
        .addComponents(
            new Discord.ButtonBuilder()
                .setCustomId('yescloseticket')
                .setLabel('Oui')
                .setStyle(Discord.ButtonStyle.Success),
            new Discord.ButtonBuilder()
                .setCustomId('nocloseticket')
                .setLabel('Non')
                .setStyle(Discord.ButtonStyle.Danger),
        )

        return interaction.message.edit({ components: [yesnoClose] });
    };

    if(interaction.customId === 'yescloseticket') {
        interaction.deferUpdate();

        const ticketOwnerSearch = `SELECT * FROM tickets WHERE channelID = '${interaction.channel.id}'`
        const ticketOwnerResults = await executeQuery(ticketOwnerSearch)
        const ticketOwnerArray1 = ticketOwnerResults.map(result => result.userID);

        for (const userID of ticketOwnerArray1) {
            await interaction.channel.permissionOverwrites.edit(userID, {
                SendMessages: false,
                ReadMessageHistory: false,
                ViewChannel: false,
            });
        }

        const yesnoClose = new Discord.ActionRowBuilder()
        .addComponents(
            new Discord.ButtonBuilder()
                .setCustomId('yescloseticketstaff')
                .setLabel('Oui')
                .setStyle(Discord.ButtonStyle.Success),
            new Discord.ButtonBuilder()
                .setCustomId('nocloseticketstaff')
                .setLabel('Non')
                .setStyle(Discord.ButtonStyle.Danger),
        )

        return interaction.message.edit({ components: [yesnoClose] });
    }
    
    if(interaction.customId === 'yescloseticketstaff') {
        interaction.deferUpdate()
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
            const userticketowner = `DELETE FROM tickets WHERE channelID = ${interaction.channel.id}`
            executeQuery(userticketowner)
            interaction.channel.delete();
            yesopenTicketEmbed.setDescription(`Votre ticket a été fermé sur le serveur \`${interaction.guild.name}\``);
            bot.channels.cache.get(transcriptchannel).send({files: [transcript]})

        }, 8000);
    }

    if(interaction.customId === 'nocloseticket') {
        interaction.deferUpdate();

        const closeTicket = new Discord.ActionRowBuilder()
        .addComponents(
            new Discord.ButtonBuilder()
                .setCustomId('closeTicket')
                .setLabel('Fermer le Ticket')
                .setStyle(Discord.ButtonStyle.Danger)
                .setEmoji('🔒'),
        )

        return interaction.message.edit({ components: [closeTicket] });
    }

    if(interaction.customId === 'nocloseticketstaff') {
        interaction.deferUpdate();

        const ticketOwnerSearch = `SELECT * FROM tickets WHERE channelID = '${interaction.channel.id}'`
        const ticketOwnerResults = await executeQuery(ticketOwnerSearch)
        const ticketOwnerArray1 = ticketOwnerResults.map(result => result.userID);

        for (const userID of ticketOwnerArray1) {
            await interaction.channel.permissionOverwrites.edit(userID, {
                SendMessages: true,
                ReadMessageHistory: true,
                ViewChannel: true,
            });
        }
                
        const closeTicket = new Discord.ActionRowBuilder()
        .addComponents(
            new Discord.ButtonBuilder()
                .setCustomId('closeTicket')
                .setLabel('Fermer le Ticket')
                .setStyle(Discord.ButtonStyle.Danger)
                .setEmoji('🔒'),
        )

        return interaction.message.edit({ components: [closeTicket] });
    }

    if (interaction.customId === "unwarn") {
        if(interaction.isButton()) {

            const queryUnwarnSearch = `SELECT * FROM warn WHERE guild = "${message.guild.id}" AND user = "${user.id}" AND warn = '${id}'`
            const ResultsUnwarn = await executeQuery(queryUnwarnSearch)
            if (ResultsUnwarn.length < 1) return message.reply('Aucune avertissements pour ce membre/ID du warn')

            const queryUnwarnDelete = `DELETE FROM warn WHERE guild = "${message.guild.id}" AND user = "${user.id}" AND warn = "${id}"`
            await executeQuery(queryUnwarnDelete)
            if(message.user.id !== message.user.id) return message.reply({content: `Vous ne pouvez pas utiliser ce boutton !`, ephemeral: true});
        }
    }

    if (interaction.customId === "help") {
        if(interaction.isSelectMenu()) {
            const collector = interaction.createMessageComponentCollector()

            collector.on('collect', async interaction => {

            if(interaction.user.id !== interaction.user.id) return interaction.reply({content: `Vous ne pouvez pas utiliser ce menu!`, ephemeral: true})
            const category = interaction.values[0];
            const categoryCommands = commands.filter(command => command.category.toLowerCase() === category)
            const commandString = categoryCommands.map(command => `**${command.name}** : \`${command.description}\``).join('\n')

            const nouvelEmbed = new Discord.EmbedBuilder()
                .setTitle(`Commandes de la catégorie ${category.toLowerCase()}`)
                .setDescription(`${commandString}`)
                .setColor(bot.color)
                .setFooter({ text: "Gérée par l'instance de Peperehobbits01's Bot", iconURL: bot.user.displayAvatarURL({ dynamic: true }) })
                .setTimestamp()
                .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
                
            interaction.update({ embeds: [nouvelEmbed], components: [menuRow] })
            })
        }
    }
}