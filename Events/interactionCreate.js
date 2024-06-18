const Discord = require("discord.js")
const { executeQuery } = require("../Fonctions/databaseConnect.js") 
const { panelrole, ticketcategory } = require("../Config/TicketConfig.js")

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
    }

    if(interaction.customId === 'ticketpannel') {

        const openTicketEmbed = new Discord.EmbedBuilder()
            .setTitle('Ticket en cours de création.')
            .setDescription(`Veuillez patienter...`)
            .setColor(bot.color)
            .setTimestamp()

        const msg = await interaction.reply({ embeds: [openTicketEmbed], ephemeral: true });
        
        const channelTicket = await interaction.guild.channels.create({
            name: `ticket-${interaction.user.username}`,
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

            setTimeout(() => {
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
                        .setStyle(Discord.ButtonStyle.Danger)
                        .setEmoji('🔒')
                )
                    
                channelTicket.send({ embeds: [embedTicketOpen], components: [closeTicket] });
                openTicketEmbed.setDescription(`Envoie de l'embed dans le ticket...`);
                msg.edit({ embeds: [openTicketEmbed], ephemeral: true });
            }, 2000);

            setTimeout(() => {
                channelTicket.setTopic(`${interaction.user.id}`)
                openTicketEmbed.setDescription(`Votre ticket est prêt !\n${channelTicket}`);
                msg.edit({ embeds: [openTicketEmbed], ephemeral: true });
                channelTicket.send({ content: `<@${interaction.user.id}>` }).then(msg => {
                    msg.delete();
                });
            }, 4000);
    };


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