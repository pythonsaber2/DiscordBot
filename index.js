// Vibe - A cool Discord bot using discord.js v14+
// Setup: npm i discord.js dotenv

// ==== Configuration ====
// Option 1: Use Discord token directly as a string.
const DISCORD_TOKEN = ""; // <-- Put your bot token between the quotes

// Option 2: Use environment variable (recommended for security).
// require('dotenv').config();
// const DISCORD_TOKEN = process.env.DISCORD_TOKEN;

// =======================

const { Client, GatewayIntentBits, Partials, EmbedBuilder } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Channel]
});

const prefix = '!';

client.once('ready', () => {
  console.log(`✅ Vibe is online as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot || !message.content.startsWith(prefix)) return;

  const [cmd, ...args] = message.content
    .slice(prefix.length)
    .trim()
    .split(/\s+/);

  switch (cmd.toLowerCase()) {
    case 'ping': {
      const sent = await message.reply('Pinging...');
      sent.edit(`🏓 Pong! Latency: ${sent.createdTimestamp - message.createdTimestamp}ms`);
      break;
    }
    case 'say':
      if (!args.length) return message.reply('Please provide a message to repeat!');
      message.channel.send(args.join(' '));
      break;
    case 'userinfo': {
      const user = message.mentions.users.first() || message.author;
      const embed = new EmbedBuilder()
        .setColor(0x5865F2)
        .setTitle(`${user.username}'s Info`)
        .setThumbnail(user.displayAvatarURL())
        .addFields(
          { name: 'ID', value: user.id, inline: true },
          { name: 'Is Bot?', value: user.bot ? 'Yes' : 'No', inline: true },
          { name: 'Created', value: `<t:${Math.floor(user.createdTimestamp/1000)}:R>`, inline: false }
        );
      message.channel.send({ embeds: [embed] });
      break;
    }
    case 'serverinfo': {
      const guild = message.guild;
      const embed = new EmbedBuilder()
        .setColor(0x57F287)
        .setTitle(`${guild.name} Info`)
        .setThumbnail(guild.iconURL())
        .addFields(
          { name: 'Owner', value: `<@${guild.ownerId}>`, inline: true },
          { name: 'Members', value: `${guild.memberCount}`, inline: true },
          { name: 'Created', value: `<t:${Math.floor(guild.createdTimestamp/1000)}:R>`, inline: false }
        );
      message.channel.send({ embeds: [embed] });
      break;
    }
    case 'roll': {
      const roll = Math.floor(Math.random() * 100) + 1;
      message.reply(`🎲 You rolled a ${roll}!`);
      break;
    }
    case 'help':
      message.channel.send(
        "**Vibe Commands:**\n" +
        "`!ping` - Pong latency\n" +
        "`!say <message>` - Repeat your message\n" +
        "`!userinfo [@user]` - Get user info\n" +
        "`!serverinfo` - Info about the server\n" +
        "`!roll` - Roll a dice\n" +
        "`!help` - Show commands"
      );
      break;
    default:
      message.reply(`Unknown command. Try \`${prefix}help\`!`);
      break;
  }
});

// Use provided token if present, otherwise try env variable for backwards compatibility.
if (DISCORD_TOKEN && DISCORD_TOKEN.trim()) {
  client.login(DISCORD_TOKEN.trim());
} else if (process.env.DISCORD_TOKEN) {
  client.login(process.env.DISCORD_TOKEN);
} else {
  console.error("❌ No Discord bot token provided! Please set DISCORD_TOKEN in index.js or in your environment.");
}
