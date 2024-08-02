const Discord = require("discord.js");
const { executeQuery } = require("../../Fonctions/databaseConnect");

module.exports = {
    name: "sanctions-list",
    description: "Affiche la liste de sanction d'un membre ou les dernières sanction sur le serveur.",
    permission: Discord.PermissionFlagsBits.ManageMessages,
    dm: false,
    category: "🛡・Modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre dont on veut voir les sanctions",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {
        let user = args.getUser("membre");
        if (!user) return message.reply("Aucun utilisateur sélectionné !");
        let member = message.guild.members.cache.get(user.id);
        if (!member) return message.reply("Aucun utilisateur sélectionné !");

        await message.deferReply();

        const querySanctionMember = `
            SELECT 'note' AS type, note AS id, author, reason, date, NULL AS time FROM note WHERE guild = '${message.guildId}' AND user = '${user.id}'
            UNION ALL
            SELECT 'warn' AS type, warn AS id, author, reason, date, NULL AS time FROM warn WHERE guild = '${message.guildId}' AND user = '${user.id}'
            UNION ALL
            SELECT 'mute' AS type, mute AS id, author, reason, date, time FROM mute WHERE guild = '${message.guildId}' AND user = '${user.id}'
            UNION ALL
            SELECT 'kick' AS type, kick AS id, author, reason, date, NULL AS time FROM kick WHERE guild = '${message.guildId}' AND user = '${user.id}'
            UNION ALL
            SELECT 'ban' AS type, ban AS id, author, reason, date, NULL AS time FROM ban WHERE guild = '${message.guildId}' AND user = '${user.id}'
        `;
        const resultsSanctionMember = await executeQuery(querySanctionMember);

        if (resultsSanctionMember.length < 1) return message.reply("Aucune sanction trouvée pour cet utilisateur.");

        resultsSanctionMember.sort((a, b) => parseInt(b.date) - parseInt(a.date));

        let embedSanctionMember = new Discord.EmbedBuilder()
            .setColor(bot.color)
            .setTitle(`Infractions de ${user.tag}`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setFooter({ text: "Infractions" });

        for (let i = 0; i < resultsSanctionMember.length; i++) {
            let result = resultsSanctionMember[i];
            let authorTag = (await bot.users.fetch(result.author)).tag;
            let fieldName = `${result.type.charAt(0).toUpperCase() + result.type.slice(1)} n°${i + 1}`;
            let fieldValue = `> **Auteur** : ${authorTag}\n> **ID** : \`${result.id}\`\n> **Raison** : \`${result.reason}\`\n> **Date** : <t:${Math.floor(parseInt(result.date) / 1000)}:f>`;
            if (result.type === 'mute') fieldValue += `\n> **Temps** : ${result.time}`;
            embedSanctionMember.addFields([{ name: fieldName, value: fieldValue }]);
        }

        await message.followUp({ embeds: [embedSanctionMember] });
    }
};