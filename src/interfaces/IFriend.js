class IFriend {
    constructor(data, client) {
        const lastOnlineTime = new Date()
        lastOnlineTime.setTime(data.last_online_ts)
        this.__client = client
        this.active = data.activePlatform
        this.gameName = data.game_name
        this.gameTag = data.game_tag
        this.tag = `${this.gameName}#${this.gameTag}`
        this.name = data.name
        this.note = data.note
        this.PID = data.pid
        this.puuid = data.puuid
        this.region = data.region
        this.lastOnline = lastOnlineTime

    }
    async unfriend() {
        const endpoint = "/chat/v4/friends"
        const data = {
            puuid: this.puuid
        }
        this.__client.delete(endpoint, data)
    }
}

module.exports = {
    IFriend
}