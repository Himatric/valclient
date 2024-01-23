# Installation

```bash
npm i @himatric/valclient
```
# Disclaimer

This project is still under heavy development.

# Examples

```js
const { ValClient } = require("valclient")
const client = new ValClient()
await client.getFriends(): IFriend[]

await client.addFriend(name: string, tag: string): IFriendRequest[]

await client.getFriendRequests(): IFriendRequest[]

await client.getPresences(): IUserPresence[]

await client.checkTagAvailable(name: string, tag: string): NameAvailability

await client.searchUsername(username: string, tag?: string): IUserSearch[]

await client.joinMatchmaking(): EnterMatchmakingQueueResponse
```

# Documentation

### THIS SECTION IS UNDER CONSTRUCTION

# Bugs

For reporting bugs you can either open an issue or (preferably) contact me on Discord (himaval)

