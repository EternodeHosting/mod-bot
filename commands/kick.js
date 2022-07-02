class commandkick {
    constructor() {
        this.name = "kick"
        this.description = "Kick a member."
        this.options = [
            { type: 'USER', name: "user", description: "The user to kick", required: true },
            { type: 'STRING', name: "reason", description: "The reason to kick this member", required: false }
        ]
    }

    async execute(interaction) {

        const user = interaction.options.getMember('user');
        const reason = interaction.options.getString('reason');
        
        if(!user) return interaction.reply({content: `Can't find this user.`, ephemeral: true});
        
        const userRoleRawPos = user.roles.highest.rawPosition;
        const memberRoleRawPos = interaction.member.roles.highest.rawPosition;

        if(!interaction.member.permissions.has("KICK_MEMBERS")) return interaction.reply({content: `You don't have the permission \`KICK_MEMBERS\` to do this command.`, ephemeral: true});

        if(user.user.id === interaction.user.id) return interaction.reply({content: `You can't kick yourself !`, ephemeral: true});

        if(userRoleRawPos >= memberRoleRawPos) return interaction.reply({content: `You can't kick this user.`, ephemeral: true});

        if(!user.kickable) return interaction.reply({content: `This user can't be kicked. It is either because they are a moderator/admin, or their role is higher than the bot role.`, ephemeral: true});

        await user.kick({reason: reason !== null ? `${reason}` : 'No reason specified'});
        await interaction.reply(`Successfully kicked **${user.user.username}** \`[${user.user.id}]\` for the reason: **${reason !== null ? `${reason}` : 'No reason specified'}**`);
      
    }


}

module.exports = commandkick