const Discord = require("discord.js");
class commandtest {
    constructor() {
        this.name = "test"
        this.description = "Just a test description"
        this.options = [
            { type: 'STRING', name: "msg", description: "Just a simple message to say.", required: true },

        ]
    }

    async execute(interaction, client) {
        const msg = interaction.options.getString("msg")
        
		interaction.reply({ content: 'Just a test !, here is your message !: `'+msg+'`' });
        
    }
}

module.exports = commandtest