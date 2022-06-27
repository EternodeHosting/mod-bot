const { Client, Intents, Collection } = require("discord.js")
const { readdirSync } = require("fs")

const client = new Client({

    intents: [

        'GUILDS', 

        'GUILD_MEMBERS', 

        'GUILD_MESSAGES', 

        'GUILD_MESSAGE_REACTIONS', 

        'DIRECT_MESSAGES', 

        'DIRECT_MESSAGE_REACTIONS', 

        'DIRECT_MESSAGE_TYPING', 

        'GUILD_BANS', 

        'GUILD_INTEGRATIONS', 

        'GUILD_INVITES', 

        'GUILD_PRESENCES'

    ]

})
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

let y = process.openStdin()
y.addListener("data", res => {

let x = res.toString().trim().split(/ +/g)
client.guilds.cache.get("947114184825532476").channels.cache.get("947179962656489523").send(x.join(" "));
console.log(x.join(" ") + " a été envoyer")
});


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