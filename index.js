const Discord = require("discord.js")
const { readdirSync } = require("fs")
const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'GUILD_VOICE_STATES', 'DIRECT_MESSAGES', 'GUILD_PRESENCES', 'GUILD_BANS'], partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

const config = require("./config")
const commands = new Collection()

const files = readdirSync("./commands")
const filesName = files.map(file => file.replace(".js", ""))
for(const fileName of filesName) {
    const command = require(`./commands/${fileName}`)
    const data = new command()
    commands.set(data.name, data)
}

client.on("ready", () => {
    client.application.commands.set(commands.map(({ execute, ...data }) => data))
    console.log("----------------------")
    console.log("ready with " + client.user.tag)
    console.log("----------------------")
    client.user.setPresence({ activities: [{ name: '/help | EcoBot' }], status: 'WATCHING' });
})




client.on("interactionCreate", (interaction) => {
    if(!interaction.isCommand()) return
    if(!commands.has(interaction.commandName)) return
    try {
        commands.get(interaction.commandName).execute(interaction, client)
    } catch (error) {
        console.error(error)
    }
})

client.login(config.token)
