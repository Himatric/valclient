// import ValClient from "../src/client/index.js"
export interface IFriend {
    active:string|null
    gameName:string
    gameTag:string
    tag:string
    name:string
    note:string
    PID:string
    puuid:string
    region:string
    lastOnline:Date
    /**
     * Deletes the friend from your friendlist
     * @example ```js
     * const Client = new ValClient()
     * client.getFriends().forEach(friend => {
     *      friend.delete() // DELETES EVERY FRIEND
     * })
     * ```
     */
    async delete():null
}
interface IFriendRequest {
    gameName: string;
    gameTag: string;
    tag: string;
    name: string;
    note: string;
    PID: string;
    puuid: string;
    region: string;
    pending: string;
    /**
     * Deletes the friend request
     * @example ```js
     * const client = new ValClient()
     * client.getFriendRequests().forEach(request => {
     *      request.delete() // DELETES EVERY FRIEND REQUEST
     * })
     * ```
     */
    async delete():null
  }
export class ValClient {
    public async getFriends():IFriend[]
    public async addFriend(name:string, tag:string):IFriendRequest[]
    public async getFriendRequests():IFriendRequest[]
}
declare module "valclient" {
    module.exports = {
        ValClient:ValClient
    }
}