class commandclear {
    constructor() {
        this.name = "clear"
        this.description = "Clear a certain number of messages"
        this.options = [
            { type: 'NUMBER', name: "number", description: "The number of messages to clear", required: true },

        ]
    }

    async execute(interaction) {
        const num = interaction.options.getNumber("number")
        
        if(!interaction.member.permissions.has("DELETE_MESSAGES")) return interaction.reply({content: `You don't have the permission \`DELETE_MESSAGES\` to do this command.`, ephemeral: true});

        if (num > 100)
            return interaction.reply({content: `The number can't be more than \`100\`.`, ephemeral: true});

        if (num < 1)
            return interaction.reply({content: `Please Supply A Number More Than \`1\`.`, ephemeral: true});

        interaction.channel.bulkDelete(num).catch(() => null)

        await interaction.reply({content: `Succesfully deleted \`${num}\` messages`})
        
    }
}

module.exports = commandclear
