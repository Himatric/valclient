class IUserSearch {
    constructor(data, client) {
        this.gameName = data.alias.game_name
        this.tagLine = data.alias.tag_line
        this.tag = `${this.gameName}#${this.tagLine}`
        this.puuid = data.puuid
        this.__client = client
    }
    async addFriend() {
        this.__client.addFriend(this.gameName, this.tagLine)
    }
}

module.exports = {
    IUserSearch
}