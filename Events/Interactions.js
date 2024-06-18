const Discord = require("discord.js")
const transticket = require('discord-html-transcripts')

module.exports = async(interaction, bot) => {

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
}