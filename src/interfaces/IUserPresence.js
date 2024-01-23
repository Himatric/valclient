class IUserPresence {
    constructor(data, client) {
        this.__client = client
        this.gameName = data.game_name
        this.gameTag = data.game_tag
        this.tag = `${this.gameName}#${this.gameTag}`
        this.msg = data.msg
        this.name = data.name
        this.parties = data.parties // UPDATE THIS TO A NEW TYPE ONCE I KNOW WHAT IT RETURNS
        this.pid = data.pid
        this.platform = data.platform
        this.gameInformation;
        try {
            this.gameInformation = JSON.parse(data.private)
        } catch {
            this.gameInformation = JSON.parse(atob(data.private))
        }
        this.game = data.product
        this.puuid = data.puuid
        this.region = data.region
        this.state = data.state

    }
}

module.exports = {
    IUserPresence
}