class IFriendRequest {
    constructor(data, client) {
        this.__client = client
        this.gameName = data.game_name
        this.gameTag = data.game_tag
        this.tag = `${this.gameName}#${this.gameTag}`
        this.name = data.name
        this.note = data.note
        this.PID = data.pid
        this.puuid = data.puuid
        this.region = data.region
        this.pending = data.subscription

    }
    async delete() {
        const endpoint = "/chat/v4/friendrequests"
        this.__client.delete(endpoint, {
            puuid: this.puuid
        })
    }
}

module.exports = {
    IFriendRequest
}