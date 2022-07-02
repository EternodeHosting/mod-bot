const Discord = require("discord.js")
const fs = require('fs');

class commandhelp {
    constructor() {
        this.name = "help"
        this.description = "All my commands"
    }

    async execute(interaction) {
        const commands = fs.readdirSync('./commands/');

		interaction.reply({embeds: [
            new Discord.MessageEmbed()
            .setDescription(` __**Moderation Commands:**__\n\n ${commands.map(x => `\`${x}\``).join(', ')}`)
            .setColor(`BLUE`)
        ]});
        
    }
}

module.exports = commandhelp
