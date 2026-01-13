# Vibe

A feature-packed Discord bot using **discord.js v14**  
Fun, fast, and packed with smart utility commands!

![Bot Welcome GIF](https://media.giphy.com/media/GeimqsH0TLDt4tScGw/giphy.gif)

---

## Features

✨ **Feature List:**
- `!ping` – Pong latency check  
- `!say <message>` – Bot repeats your message  
- `!userinfo [@user]` – Get info for yourself or another user  
- `!serverinfo` – Info about the server  
- `!roll` – Roll a dice (1-100)  
- `!help` – Show commands list  

---

<div align="center">
  <img src="https://media.giphy.com/media/13CoXDiaCcCoyk/giphy.gif" width="350" alt="Cool Discord Bot">
</div>

---

## Responses with Embeds

Vibe uses stylish Discord embeds for its info commands.
Below is an example of how Vibe formats its responses:

```js
const embed = new EmbedBuilder()
  .setColor(0x5865F2)
  .setTitle(`Username's Info`)
  .setThumbnail('UserAvatarURL')
  .addFields(
    { name: 'ID', value: 'UserID', inline: true },
    { name: 'Is Bot?', value: 'Yes/No', inline: true },
    { name: 'Created', value: 'Account Age', inline: false }
  );
message.channel.send({ embeds: [embed] });
```
Other commands like `!serverinfo` return similarly rich embeds with server information.

---

## Quick Start

1. **Clone this repo** and enter the folder.
2. Install dependencies:
   ```bash
   npm install discord.js dotenv
   ```
3. Copy your Discord Bot Token.  
   - Open `index.js` and place your token here:
     ```js
     const DISCORD_TOKEN = "YOUR_DISCORD_BOT_TOKEN";
     ```
   - OR create a `.env` file and add:
     ```
     DISCORD_TOKEN=YOUR_DISCORD_BOT_TOKEN
     ```
4. Start the bot:
   ```bash
   node index.js
   ```

---

## Invite Vibe to your Server

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications), create an app, add a bot, then copy the token into `index.js` or your `.env`.
2. Use the OAuth2 URL Generator in the portal:
    - Scopes: `bot`, `applications.commands`
    - Bot Permissions: `Send Messages`, `Embed Links`, `Read Messages/View Channels`
3. Paste the link in your browser, then authorize Vibe to join.

---

## Customization

- Edit or add new commands in the `switch` statement in `index.js`.
- For advanced bots, consider splitting commands into files/folders.

---

## Requirements

- Node.js v16.9.0 or higher
- discord.js v14+

---

## License

MIT

---

Enjoy **Vibe**, your cool multi-command Discord bot! 🚀  
Happy vibing!  
