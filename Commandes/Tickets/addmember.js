const Discord = require('discord.js');

module.exports = {

        name: "addmember",
        description: "Ajouter un membre au ticket",
        permission: Discord.PermissionFlagsBits.ManageMessages,
        dm: false,
        category: "・Tickets",
        options: [
            {
                type: "user",
                name: "membre",
                description: "Le membre a ajoutée au ticket.",
                required: true,
                autocomplete: false
            }
        ],

        async run(message) {

            let user = args.getUser("membre")
            if(!user) return message.reply("Aucun utilisateur sélectionnée!")

            const AjoutMembreEnCours = new Discord.EmbedBuilder()
            .setTitle('Ticket')
            .setDescription('Ajout du membre en cours')
            .setColor(bot.color)
            .setTimestamp()

            const msg = await message.reply({ embeds: [AjoutMembreEnCours], ephemeral: true });
            setTimeout(() => {
                AjoutMembreEnCours.setDescription('Ajout du membre en cours.');
                msg.edit({ embeds: [AjoutMembreEnCours], ephemeral: true });
            }, 1000);
    
            setTimeout(() => {
                AjoutMembreEnCours.setDescription('Ajout du membre en cours..');
                msg.edit({ embeds: [AjoutMembreEnCours], ephemeral: true });
            }, 2000);
    
            setTimeout(() => {
                AjoutMembreEnCours.setDescription('Ajout du membre en cours...');
                msg.edit({ embeds: [AjoutMembreEnCours], ephemeral: true });
            }, 3000);
    
            setTimeout(() => {
                msg.delete();
            }, 4000);
    
            setTimeout(async() => {
                await message.channel.permissionOverwrites.create(message.options.getUser('membre').id, {
                    SendMessages: true,
                    ReadMessageHistory: true,
                    ViewChannel: true
                })

                const AjoutMembreSuccess = new Discord.EmbedBuilder()
                .setTitle('Ticket')
                .setDescription(`${user.id} a bien été ajouter au ticket.`)
                .setColor(bot.color)
                .setTimestamp();
                
                message.channel.send({embeds: [AjoutMembreSuccess]})
            }, 5000)
        }
}