const WebSocket = require("ws")
const fs = require("fs")
class ClientSocket extends WebSocket {
    constructor(client) {
        super(`wss://riot:${client.lockfile.password}@127.0.0.1:${client.lockfile.port}`, {rejectUnauthorized: false})
        this.__client = client
    }
    init() {
        this.onerror = (err) => {
            console.log(err)
        }
        this.onmessage = async ({data}) => {
            if(!this.__client.tokens) this.__client.tokens = await this.__client.__get_entitlement_token()
            if(!data) return
            if(data.toString().includes("ares-pregame/pregame/v1/players/")) {
                if(!this.__client.tokens) this.__client.tokens = await this.__client.__get_entitlement_token()
                console.log("a")
                const json = JSON.parse(data.toString())
                console.log(json)
                const gameID = data.toString().split("ares-pregame/pregame/v1/players/")[1].split('"')[0]
                console.log(gameID)
                setInterval(async() => {
                    try {
                    const res = await this.__client.fetchGLZ(`/pregame/v1/matches/${gameID}`, {
                        'X-Riot-Entitlements-JWT': this.__client.tokens.entitlementToken,
                        'Authorization': "Bearer " + this.__client.tokens.token
                    })
                
                    fs.appendFileSync("./matchInfo.txt", JSON.stringify(res))
                    console.log(res)
                } catch (err) {console.log(err)}
                }, 5000);
                
            }

        }
        this.onopen = () => {
            this.send(JSON.stringify([5, "OnJsonApiEvent"]))
        }
    }
}

module.exports = {
    ClientSocket
}