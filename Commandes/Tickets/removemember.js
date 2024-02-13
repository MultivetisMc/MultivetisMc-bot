const Discord = require('discord.js');

module.exports = {
    
    name: "removemember",
    description: "Retirer un membre au ticket",
    permission: Discord.PermissionFlagsBits.ManageMessages,
    dm: false,
    category: "・Tickets",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre a retirée du ticket",
            required: true,
            autocomplete: false
        }
    ],

    async run(message) {

        let user = args.getUser("membre")
        if(!user) return message.reply("Aucun utilisateur sélectionnée!")

        const RetraitMembreEnCours = new Discord.EmbedBuilder()
        .setTitle('Ticket')
        .setDescription('Retrait du membre en cours')
        .setColor(bot.color)
        .setTimestamp()

        const msg = await message.reply({ embeds: [RetraitMembreEnCours], ephemeral: true });
        setTimeout(() => {
            RetraitMembreEnCours.setDescription('Retrait du membre en cours.');
            msg.edit({ embeds: [RetraitMembreEnCours], ephemeral: true });
        }, 1000);

        setTimeout(() => {
            RetraitMembreEnCours.setDescription('Retrait du membre en cours..');
            msg.edit({ embeds: [RetraitMembreEnCours], ephemeral: true });
        }, 2000);

        setTimeout(() => {
            RetraitMembreEnCours.setDescription('Retrait du membre en cours...');
            msg.edit({ embeds: [RetraitMembreEnCours], ephemeral: true });
        }, 3000);

        setTimeout(() => {
            msg.delete();
        }, 4000);

        setTimeout(async() => {
            await message.channel.permissionOverwrites.delete(message.user.id, {
                SendMessages: false,
                ReadMessageHistory: false,
                ViewChannel: false
            })

            const RemoveMemberSucces = new Discord.EmbedBuilder()
            .setTitle('Ticket')
            .setDescription(`${user.id} a bien été retiré au ticket.`)
            .setColor(bot.color)
            .setTimestamp();
            
            message.channel.send({embeds: [RemoveMemberSucces]})
        }, 5000)
    }
}