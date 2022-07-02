class commandban {
    constructor() {
        this.name = "ban"
        this.description = "Ban a member."
        this.options = [
            { type: 'USER', name: "user", description: "The user to ban", required: true },
            { type: 'STRING', name: "reason", description: "The reason to ban this member", required: false }
        ]
    }

    async execute(interaction) {

        const user = interaction.options.getMember('user');
        const reason = interaction.options.getString('reason');
        
        if(!user) return interaction.reply({content: `Can't find this user.`, ephemeral: true});
        
        const userRoleRawPos = user.roles.highest.rawPosition;
        const memberRoleRawPos = interaction.member.roles.highest.rawPosition;

        if(!interaction.member.permissions.has("BAN_MEMBERS")) return interaction.reply({content: `You don't have the permission \`BAN_MEMBERS\` to do this command.`, ephemeral: true});

        if(user.user.id === interaction.user.id) return interaction.reply({content: `You can't ban yourself !`, ephemeral: true});

        if(userRoleRawPos >= memberRoleRawPos) return interaction.reply({content: `You can't ban this user.`, ephemeral: true});

        if(!user.bannable) return interaction.reply({content: `This user can't be banned. It is either because they are a moderator/admin, or their role is higher than the bot role.`, ephemeral: true});

        await user.ban({reason: reason !== null ? `${reason}` : 'No reason specified'});
        await interaction.reply(`Successfully banned **${user.user.username}** \`[${user.user.id}]\` for the reason: **${reason !== null ? `${reason}` : 'No reason specified'}**`);
      
    }


}

module.exports = commandban