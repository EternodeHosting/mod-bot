class commandrenamebot {
    constructor() {
        this.name = "renamebot"
        this.description = "Rename the bot on this server."
        this.options = [
            { type: 'STRING', name: "nick", description: "How do you want to name me ?", required: true },

        ]
    }

    async execute(interaction) {
        const nick = interaction.options.getString("nick")

        if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({content: `You don't have the permission \`ADMINISTRATOR\` to do this command.`, ephemeral: true});

        interaction.guild.me.setNickname(nick);

        await interaction.reply(`Successfully renamed the bot to: ${nick}`);
        
    }
}

module.exports = commandrenamebot
