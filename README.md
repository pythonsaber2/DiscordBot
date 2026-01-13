# 🎵 Vibe

> **Your ultimate Discord companion bot.**  
Vibe is a sleek, feature-rich Discord bot designed to supercharge your server with fun and utility commands. Built with **discord.js v14** and packed with features, Vibe guarantees your community stays engaged!

![discord.js](https://img.shields.io/badge/discord.js-v14-blue?logo=discord&logoColor=white)
![node.js](https://img.shields.io/badge/node.js-v16+-green?logo=node.js&logoColor=white)
![license](https://img.shields.io/badge/license-MIT-purple)

---

## ✨ Features

| **Command**    | **Description**                          | **Example**                          |
|----------------|------------------------------------------|--------------------------------------|
| `!ping`        | Check bot latency & responsiveness.      | `!ping` → 🏓 Pong! Latency: 45ms     |
| `!say`         | Have the bot repeat your message.         | `!say Hello, world!` → Hello, world! |
| `!userinfo`    | Get detailed info about a user.           | `!userinfo @user`                   |
| `!serverinfo`  | Display stats & information about server. | `!serverinfo`                       |
| `!roll`        | Roll a random dice (1-100).              | `!roll` → 🎲 You rolled a 73!        |
| `!help`        | View all available commands.             | `!help`                             |

> **Why choose Vibe?**
> Vibe comes with a modern and intuitive design using Discord embeds. It’s easy to use and highly customizable to fit your unique needs!

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** v16.9.0 or higher
- A **Discord Bot Token** from [Discord Developer Portal](https://discord.com/developers/applications)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/pythonsaber2/DiscordBot.git
   cd DiscordBot
   ```

2. **Install dependencies**:
   ```bash
   npm install discord.js dotenv
   ```

3. **Add your bot token**:
   - **Option A: Add directly in code**  
     Open `index.js` and replace YOUR_BOT_TOKEN with your token:
     ```js
     const DISCORD_TOKEN = "YOUR_BOT_TOKEN";
     ```
   - **Option B: Use environment variables**  
     Create a `.env` file:
     ```bash
     echo "DISCORD_TOKEN=YOUR_BOT_TOKEN" > .env
     ```

4. **Run the bot**:
   ```bash
   node index.js
   ```
   You should see:
   ```
   ✅ Vibe is online as YourBotName#1234
   ```

---

## 📨 Inviting Vibe to Your Server

1. Go to the **OAuth2 URL Generator** in the [Discord Developer Portal](https://discord.com/developers/applications).
2. Select the following OAuth2 scopes:
   - `bot`
   - `applications.commands`
3. Set the following permissions:
   - ✅ Send Messages  
   - ✅ Embed Links  
   - ✅ Read Messages/View Channels  
4. Copy the generated URL, paste it in your browser, and invite the bot to your server.

**Or use this template URL**:  
```
https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=19456&scope=bot%20applications.commands
```

---

## 🎨 Beautiful Embed Messages

Vibe uses Discord embeds to present clean, visually appealing response messages. Here's an example of the `!userinfo` command:

```js
const embed = new EmbedBuilder()
  .setColor(0x5865F2)
  .setTitle(`${user.username}'s Profile`)
  .setThumbnail(user.displayAvatarURL())
  .addFields(
    { name: 'ID', value: user.id, inline: true },
    { name: 'Bot User?', value: user.bot ? 'Yes' : 'No', inline: true },
    { name: 'Account Created', value: `<t:${parseInt(user.createdTimestamp / 1000)}:R>`, inline: false }
  );
```

Embeds make commands like `!userinfo` and `!serverinfo` look polished and professional.

---

## 🛠️ Customization

Want to add new commands? It’s simple:

1. **Open `index.js`**.
2. Locate the `switch` statement in the `messageCreate` listener.
3. Add a new `case` for your command:
   ```js
   case 'greet':
     message.reply('Hello, world!');
     break;
   ```

For larger bots, organize commands into separate files:
```
commands/
  ├── ping.js
  ├── userinfo.js
  └── greet.js
```

---

## 📂 Project Structure

```
DiscordBot/
├── index.js          # Main bot logic lives here
├── .env              # Store your bot token (optional)
├── package.json      # Project configuration
├── node_modules/     # Dependencies
└── README.md         # Detailed guide and information
```

---

## 🔐 Security Tips

⚠️ **Never share your bot token on GitHub or elsewhere!**

1. Add your `.env` file to `.gitignore`:
   ```bash
   echo ".env" >> .gitignore
   ```
2. Always use environment variables in production.
3. If your bot token leaks, reset it immediately using the [Developer Portal](https://discord.com/developers/applications).

---

## 📋 Requirements

```json
{
  "discord.js": ">=14.7.0",
  "node": ">=16.9.0"
}
```

---

## ✏️ Contributing

Have a fun idea for a new feature or want to improve Vibe? Contributions are always welcome! Feel free to fork the repository, make changes, and submit a pull request.

---

## 📄 License

Vibe is licensed under the **MIT License** — you’re free to use, modify, and distribute it. See the full [LICENSE](LICENSE) file for details.

---

## 🎉 Get Started with Vibe Today!

Start boosting your server with Vibe, your fun and user-friendly Discord companion bot. Whether you’re handling server management or just hanging out with friends, Vibe has something for everyone. 🚀

**Questions?** Open an issue, or check the code for detailed comments.  

Happy vibing! 🎵✨
