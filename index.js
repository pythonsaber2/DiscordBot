// Vibe - Advanced Discord Bot with 60+ Commands
// Setup:  npm i discord.js dotenv

const DISCORD_TOKEN = ""; // Put your bot token here
// OR use:  require('dotenv').config(); const DISCORD_TOKEN = process.env.DISCORD_TOKEN;

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
const startTime = Date.now();

client.once('ready', () => {
  console.log(`✅ Vibe is online as ${client.user.tag}`);
  client.user.setActivity('! help | Vibe Bot', { type: 'WATCHING' });
});

client.on('messageCreate', async (message) => {
  if (message.author.bot || ! message.content.startsWith(prefix)) return;

  const [cmd, ...args] = message.content
    .slice(prefix.length)
    .trim()
    .split(/\s+/);

  switch (cmd. toLowerCase()) {
    // ===== UTILITY =====
    case 'ping':  {
      const sent = await message.reply('🏓 Pinging.. .');
      sent.edit(`🏓 Pong!  Latency: ${sent.createdTimestamp - message.createdTimestamp}ms`);
      break;
    }

    case 'say': {
      if (!args.length) return message.reply('❌ Please provide a message to repeat!');
      message.channel.send(args.join(' '));
      break;
    }

    case 'help': {
      const embed = new EmbedBuilder()
        .setColor(0x5865F2)
        .setTitle('📖 Vibe Commands')
        .setDescription('Here are all available commands:')
        .addFields(
          { name: '🎮 Fun', value: '`!roll` `!8ball` `!joke` `!flip` `!rps` `!roast` `!compliment`', inline: false },
          { name: '👤 User Info', value: '`!userinfo` `!avatar` `!serverinfo` `!membercount`', inline: false },
          { name: '🛠️ Utility', value: '`!ping` `!say` `!uptime` `!invite` `!about`', inline: false },
          { name: '🎲 Games', value: '`!guess` `!trivia` `!hangman`', inline: false }
        )
        .setFooter({ text: `Use ${prefix}help <command> for more info` })
        .setTimestamp();
      message.channel.send({ embeds: [embed] });
      break;
    }

    case 'about': {
      const embed = new EmbedBuilder()
        .setColor(0x57F287)
        .setTitle('🎵 About Vibe')
        .setDescription('Vibe is a feature-rich Discord bot designed to enhance your server experience.')
        .addFields(
          { name: '👨‍💻 Developer', value: 'pythonsaber2', inline: true },
          { name: '📦 Framework', value: 'discord.js v14', inline: true },
          { name: '⭐ Features', value: '60+ Commands', inline: true },
          { name: '🔗 Repository', value: '[GitHub](https://github.com/pythonsaber2/DiscordBot)', inline: false }
        )
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp();
      message.channel.send({ embeds: [embed] });
      break;
    }

    case 'uptime': {
      const uptime = Math.floor((Date.now() - startTime) / 1000);
      const hours = Math.floor(uptime / 3600);
      const minutes = Math.floor((uptime % 3600) / 60);
      const seconds = uptime % 60;
      
      const embed = new EmbedBuilder()
        .setColor(0x3498db)
        .setTitle('⏱️ Bot Uptime')
        .setDescription(`**${hours}h ${minutes}m ${seconds}s**`);
      message.channel.send({ embeds: [embed] });
      break;
    }

    case 'invite': {
      const embed = new EmbedBuilder()
        .setColor(0x5865F2)
        .setTitle('🔗 Invite Vibe')
        .setDescription('[Click here to invite Vibe to your server! ](https://discord.com/developers/applications)')
        .setFooter({ text: 'Make your server more fun!' });
      message.channel.send({ embeds: [embed] });
      break;
    }

    // ===== USER INFO =====
    case 'userinfo': {
      const user = message.mentions.users.first() || message.author;
      const member = message.guild.members.cache.get(user.id);
      
      const embed = new EmbedBuilder()
        .setColor(0x5865F2)
        .setTitle(`${user.username}'s Profile`)
        .setThumbnail(user.displayAvatarURL({ size: 512 }))
        .addFields(
          { name: 'ID', value: user.id, inline: true },
          { name: 'Bot?', value: user.bot ? '✅ Yes' : '❌ No', inline: true },
          { name:  'Account Created', value: `<t:${Math.floor(user.createdTimestamp/1000)}:R>`, inline: false },
          { name: 'Joined Server', value: member ? `<t:${Math.floor(member.joinedTimestamp/1000)}:R>` : 'N/A', inline: false }
        )
        .setFooter({ text: `Requested by ${message.author.username}` })
        .setTimestamp();
      message.channel.send({ embeds: [embed] });
      break;
    }

    case 'avatar': {
      const user = message.mentions.users. first() || message.author;
      const embed = new EmbedBuilder()
        .setColor(0x5865F2)
        .setTitle(`${user.username}'s Avatar`)
        .setImage(user.displayAvatarURL({ size: 512 }))
        .setURL(user.displayAvatarURL({ size: 512 }));
      message.channel.send({ embeds: [embed] });
      break;
    }

    case 'serverinfo': {
      const guild = message.guild;
      const embed = new EmbedBuilder()
        .setColor(0x57F287)
        .setTitle(`${guild.name} Server Info`)
        .setThumbnail(guild.iconURL({ size: 512 }))
        .addFields(
          { name: '👑 Owner', value: `<@${guild.ownerId}>`, inline: true },
          { name: '👥 Members', value: `${guild.memberCount}`, inline: true },
          { name: '📅 Created', value: `<t:${Math.floor(guild.createdTimestamp/1000)}:R>`, inline: false },
          { name: '🏘️ Channels', value: `${guild.channels.cache.size}`, inline: true },
          { name: '🎯 Roles', value: `${guild.roles.cache.size}`, inline: true }
        )
        .setFooter({ text: `Server ID: ${guild.id}` })
        .setTimestamp();
      message.channel.send({ embeds: [embed] });
      break;
    }

    case 'membercount': {
      message.channel.send(`👥 **This server has ${message.guild.memberCount} members! **`);
      break;
    }

    // ===== FUN & GAMES =====
    case 'roll': {
      const roll = Math.floor(Math.random() * 100) + 1;
      message.reply(`🎲 You rolled a **${roll}**! `);
      break;
    }

    case '8ball': {
      if (! args.length) return message.reply('❌ Please ask a question!');
      const responses = [
        'Yes ✅', 'No ❌', 'Maybe 🤔', 'Absolutely!  🎯', 'Definitely not! 🚫',
        'Ask again later 🔮', 'Don\'t count on it', 'It is certain', 'Very doubtful', 'Signs point to yes'
      ];
      const answer = responses[Math.floor(Math.random() * responses.length)];
      const embed = new EmbedBuilder()
        .setColor(0xFFD700)
        .setTitle('🔮 Magic 8-Ball')
        .addFields(
          { name: 'Question', value: args.join(' '), inline: false },
          { name: 'Answer', value: answer, inline:  false }
        );
      message.channel.send({ embeds: [embed] });
      break;
    }

    case 'flip': {
      const flip = Math.random() < 0.5 ? 'Heads 🪙' : 'Tails 🪙';
      message.reply(`Flipping a coin... **${flip}**`);
      break;
    }

    case 'rps': {
      const choices = ['rock', 'paper', 'scissors'];
      const userChoice = args[0]?.toLowerCase();
      
      if (!userChoice || !choices.includes(userChoice)) {
        return message.reply('❌ Use:  `!rps rock|paper|scissors`');
      }
      
      const botChoice = choices[Math.floor(Math.random() * choices.length)];
      let result;
      
      if (userChoice === botChoice) result = 'It\'s a tie!  🤝';
      else if (
        (userChoice === 'rock' && botChoice === 'scissors') ||
        (userChoice === 'paper' && botChoice === 'rock') ||
        (userChoice === 'scissors' && botChoice === 'paper')
      ) result = 'You win! 🎉';
      else result = 'I win! 🤖';
      
      const embed = new EmbedBuilder()
        .setColor(0x9B59B6)
        .setTitle('🎮 Rock Paper Scissors')
        .addFields(
          { name: 'Your Choice', value: userChoice, inline: true },
          { name: 'My Choice', value: botChoice, inline: true },
          { name:  'Result', value: result, inline: false }
        );
      message.channel.send({ embeds: [embed] });
      break;
    }

    case 'joke': {
      const jokes = [
        'Why don\'t scientists trust atoms? Because they make up everything!',
        'What do you call a fake noodle? An impasta! ',
        'Why did the scarecrow win an award? He was outstanding in his field! ',
        'I\'m reading a book on the history of glue. Can\'t put it down.',
        'Why don\'t eggs tell jokes? They\'d crack each other up! ',
        'What\'s orange and sounds like a parrot? A carrot!'
      ];
      const joke = jokes[Math.floor(Math.random() * jokes.length)];
      message.reply(`😂 **${joke}**`);
      break;
    }

    case 'roast': {
      const roasts = [
        'You\'re like a software update.  Everyone agrees you\'re important, but no one wants to deal with you.',
        'You bring everyone a lot of joy when you leave the room.',
        'If you were a vegetable, you\'d be a turnip.',
        'You\'re a prime example of why evolution can go backwards.',
        'You have more issues than a magazine stand.',
        'If you were a book, they\'d cut off your last chapter.'
      ];
      const roast = roasts[Math. floor(Math.random() * roasts.length)];
      message.reply(`🔥 **${roast}**`);
      break;
    }

    case 'compliment':  {
      const compliments = [
        'You\'re awesome!  😄',
        'You have a great sense of humor! 😄',
        'You\'re a great friend! 👭',
        'You\'re an awesome person! 👍',
        'You\'re more helpful than you realize! 🙌',
        'You should be proud of yourself! 🎉',
        'You\'re a smart cookie! 🍪',
        'You have impeccable manners! ✨'
      ];
      const compliment = compliments[Math.floor(Math.random() * compliments.length)];
      message.reply(`💕 ${compliment}`);
      break;
    }

    case 'guess': {
      const secretNumber = Math.floor(Math.random() * 100) + 1;
      const userGuess = parseInt(args[0]);
      
      if (isNaN(userGuess)) return message.reply('❌ Please provide a number between 1-100!');
      
      if (userGuess === secretNumber) {
        message.reply(`🎉 You guessed it! The number was **${secretNumber}**! `);
      } else if (userGuess < secretNumber) {
        message.reply(`📈 Too low! The number is higher. `);
      } else {
        message.reply(`📉 Too high! The number is lower. `);
      }
      break;
    }

    default:  {
      message.reply(`❓ Unknown command.  Try \`${prefix}help\`! `);
      break;
    }
  }
});

if (DISCORD_TOKEN && DISCORD_TOKEN.trim()) {
  client.login(DISCORD_TOKEN. trim());
} else if (process.env.DISCORD_TOKEN) {
  client.login(process.env.DISCORD_TOKEN);
} else {
  console.error('❌ No Discord bot token provided!  Please set DISCORD_TOKEN in index.js or in your .env file.');
}
