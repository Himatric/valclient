const {
    Util
} = require("../util/index")
const { IFriend } = require("../interfaces/IFriend")
const { IFriendRequest } = require("../interfaces/IFriendRequest")
const { IUserPresence } = require("../interfaces/IUserPresence")
const { IUserSearch } = require("../interfaces/IUserSearch")
const { ClientSocket } =  require("./websocket/Websocket")
const https = require("https")
const axios = require("axios").default

class ValClient {
    constructor() {
        this.region = Util.getRegion()
        this.lockfile = Util.getLockfileData()
        this.shard = Util.getShard()
        this.tokens;
        // this.websocket = new ClientSocket(this)
        // this.websocket.init()
    }
    async checkTagAvailable(name, tag) {
        const endpoint = "/player-account/aliases/v1/validity"
        const res = await this.post(endpoint, {
            gameName: name,
            tagLine: tag
        })
        return res
    }
    async searchUsername(username, tag) {
        const query = `?gameName=${username}${tag ? `&tagLine=${tag}` : ""}`
        const endpoint = `/player-account/aliases/v1/lookup${query}`
        const res = await this.fetch(endpoint)
        let userArray = []
        res.forEach(user => {
            userArray.push(new IUserSearch(user, this))
        })
        return userArray
    }
    async getChatSession() {
        const party = await this.__getCurrentParty()
        const partyID = party.CurrentPartyID
        return (await this.postGLZ(`/parties/v1/parties/${partyID}/matchmaking/join`, null, {
           "X-Riot-Entitlements-JWT": this.tokens.entitlementToken,
           Authorization: "Bearer " + this.tokens.token
        }))
        
    }
    async joinMatchmaking() {
        const party = await this.__getCurrentParty()
        const partyID = party.CurrentPartyID
        return (await this.postGLZ(`/parties/v1/parties/${partyID}/matchmaking/join`, null, {
           "X-Riot-Entitlements-JWT": this.tokens.entitlementToken,
           Authorization: "Bearer " + this.tokens.token
        }))
    }
    async __getCurrentParty() {
        if(!this.tokens) this.tokens = await this.__get_entitlement_token()
        const puuid = await this.__getPUUID()
        const sessions = await this.__getSessions()
        const version = sessions[Object.keys(sessions)[0]].version
        const data = await this.fetchGLZ(`/parties/v1/players/${puuid}`, {
            "X-Riot-ClientVersion": version,
            "X-Riot-Entitlements-JWT": this.tokens.entitlementToken,
            Authorization: "Bearer " + this.tokens.token
        })
        return data

    }
    async __getSessions() {
        const endpoint = "/product-session/v1/external-sessions"
        return (await this.fetch(endpoint))
    }
    async __getPUUID() {
        const endpoint = "/chat/v1/session"
        const res = await this.fetch(endpoint)
        return res.puuid
    }
    async getPresences() {
        const endpoint = "/chat/v4/presences"
        const res = await this.fetch(endpoint)
        const presences = res.presences
        let presencesArray = []
        presences.forEach(presence => {
            presencesArray.push(new IUserPresence(presence, this))
        })
        return presencesArray
    }
    async getFriendRequests() {
        const endpoint = "/chat/v4/friendrequests"
        const res = await this.fetch(endpoint)
        const requests = res.requests
        let requestArray = []
        requests.forEach(request => {
            requestArray.push(new IFriendRequest(request, this))
        })
        return requestArray
    }
    async addFriend(name, tag) {
        const endpoint = "/chat/v4/friendrequests"
        (await this.post(endpoint, {
            game_name:name,
            game_tag:tag
        }))
        const requests = await this.getFriendRequests()
        return requests.filter(request => request.pending = "pending_out")
    }
    async getFriends() {
        const endpoint = "/chat/v4/friends"
        const friends = (await this.fetch(endpoint)).friends
        let friendArray = []
        friends.forEach(friend => {
            friendArray.push(new IFriend(friend, this))
        })
        return friendArray
    }
    async __get_entitlement_token() {
        const endpoint = "/entitlements/v1/token"
        const res = await this.fetch(endpoint)
        return {entitlementToken:res.token, token:res.accessToken}
    }
    async postGLZ(endpoint, data, headers) {
        const agent = new https.Agent({
            rejectUnauthorized:false
        })
        const res = await axios({
            method: "post",
            url: `https://glz-${this.region}-1.${this.shard}.a.pvp.net${endpoint}`,
            headers,
            httpsAgent:agent,
            data
        })
        return res.data
    }
    async fetchGLZ(endpoint, headers) {
        const agent = new https.Agent({
            rejectUnauthorized:false
        })
        const res = await axios({
            method: "get",
            url: `https://glz-${this.region}-1.${this.shard}.a.pvp.net${endpoint}`,
            headers,
            httpsAgent:agent
        })
        return res.data
    }
    async fetchPD(endpoint, headers) {
        const agent = new https.Agent({
            rejectUnauthorized:false
        })
        const res = await axios({
            method:"get",
            url: `https://pd.${this.shard}.a.pvp.net${endpoint}`,
            headers,
            httpsAgent: agent
        })
        return res.data
    }
    async fetch(endpoint) {
        const agent = new https.Agent({  
            rejectUnauthorized: false
        })
        const res = await axios({
            url: `https://127.0.0.1:${this.lockfile.port}${endpoint}`,
            method:"get",
            headers: {
                Authorization: "Basic " + btoa("riot:" + this.lockfile.password)
            },
            httpsAgent: agent
        })
        return res.data
    }
    async delete(endpoint, data) {
        const agent = new https.Agent({  
            rejectUnauthorized: false
        })
        const res = await axios({
            method: "delete",
            "url": `https://127.0.0.1:${this.lockfile.port}${endpoint}`,
            headers: {
                Authorization: "Basic " + btoa("riot:" + this.lockfile.password)
            },
            data,
            httpsAgent: agent
        })
        return res.data
    }
    async post(endpoint, data) {
        const agent = new https.Agent({  
            rejectUnauthorized: false
        })
        const res = await axios({
            method: "post",
            url: `https://127.0.0.1:${this.lockfile.port}${endpoint}`,
            headers: {
                Authorization: "Basic " + btoa("riot:" + this.lockfile.password)
            },
            data,
            httpsAgent: agent
        })
        return res.data
    }
}

module.exports = {
    ValClient
}