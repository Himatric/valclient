# Installation

```bash
npm i @himatric/valclient
```
# Disclaimer

This project is still under heavy development.

# Examples

Logging in with a bot token and checking how many guilds the bot is in!
```js
const { ValClient } = require("valclient")
const client = new ValClient()
await client.getFriends() // returns an array of your valorant friends
await client.addFriend(name:string, tag:string) // sends a friend request and returns all your outgoing friend requests
await client.getFriendRequests() // returns an array of outgoing and incoming friend requests
```

# Documentation

### THIS SECTION IS UNDER CONSTRUCTION

# Bugs

For reporting bugs you can either open an issue or (preferably) contact me on Discord (himaval)

