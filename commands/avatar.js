const Discord = require("discord.js")

class commandavatar {
    constructor() {
        this.name = "avatar"
        this.description = "Show the Avatar of a person."
        this.options = [
            { type: 'USER', name: "target", description: "The person to show the avatar.", required: true },

        ]
    }

    async execute(interaction) {
        const member = interaction.options.getUser("target")
        
        const embed = new Discord.MessageEmbed()
            .setFooter(`EterMod`)
            .setColor(`RANDOM`)
            .setTimestamp()
            .setTitle(`${member.username}'s Profile Picture`)
            .setDescription(`[View Avatar Here](${member.displayAvatarURL({ dynamic: true, size: 4096 })})`)
            .setImage(member.displayAvatarURL({ dynamic: true, size: 2048 }))
        interaction.reply({ embeds: [embed] }) 
        
    }
}

module.exports = commandavatar
