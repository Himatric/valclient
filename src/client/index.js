const {
    Util
} = require("../util/index")
const { IFriend } = require("../interfaces/IFriend")
const { IFriendRequest } = require("../interfaces/IFriendRequest")
const https = require("https")
const axios = require("axios").default


class ValClient {
    constructor() {
        this.region = Util.getRegion()
        this.lockfile = Util.getLockfileData()

    }
    async getPresences() {
        const endpoint = "/chat/v4/presences"
        const res = await this.fetch(endpoint)
        console.log(res)
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
        const res = (await this.post(endpoint, {
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