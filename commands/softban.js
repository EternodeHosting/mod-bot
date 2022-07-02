class commandsoftban {
    constructor() {
        this.name = "softban"
        this.description = "Kick the user deleting all his messages"
        this.options = [
            { type: 'USER', name: "user", description: "The user to softban", required: true },
            { type: 'STRING', name: "reason", description: "The reason to softban this member", required: false }
        ]
    }

    async execute(interaction) {

        const user = interaction.options.getMember('user');
        const reason = interaction.options.getString('reason');
        
        if(!user) return interaction.reply({content: `Can't find this user.`, ephemeral: true});
        
        const userRoleRawPos = user.roles.highest.rawPosition;
        const memberRoleRawPos = interaction.member.roles.highest.rawPosition;

        if(!interaction.member.permissions.has("KICK_MEMBERS")) return interaction.reply({content: `You don't have the permission \`KICK_MEMBERS\` to do this command.`, ephemeral: true});

        if(user.user.id === interaction.user.id) return interaction.reply({content: `You can't softban yourself !`, ephemeral: true});

        if(userRoleRawPos >= memberRoleRawPos) return interaction.reply({content: `You can't softban this user.`, ephemeral: true});

        if(!user.bannable) return interaction.reply({content: `This user can't be softbanned. It is either because they are a moderator/admin, or their role is higher than the bot role.`, ephemeral: true});

        await user.ban({reason: reason !== null ? `${reason}` : 'No reason specified'});
        await interaction.guild.members.unban(user, reason);
        await interaction.reply(`Successfully softbanned **${user.user.username}** \`[${user.user.id}]\` for the reason: **${reason !== null ? `${reason}` : 'No reason specified'}**`);
      
    }

}

module.exports = commandsoftban
