// import ValClient from "../src/client/index.js"
export interface IFriend {
    active: string | null
    gameName: string
    gameTag: string
    tag: string
    name: string
    note: string
    PID: string
    puuid: string
    region: string
    lastOnline: Date
    /**
     * Deletes the friend from your friendlist
     * @example ```js
     * const Client = new ValClient()
     * client.getFriends().forEach(friend => {
     *      friend.delete() // DELETES EVERY FRIEND
     * })
     * ```
     */
    async delete(): null
}
export type PresenceState = "mobile" | "dnd" | "away" | "chat";
export type GameInformation = {
    isValid: boolean;
    sessionLoopState: string;
    partyOwnerSessionLoopState: string;
    customGameName: string;
    customGameTeam: string;
    partyOwnerMatchMap: string;
    partyOwnerMatchCurrentTeam: string;
    partyOwnerMatchScoreAllyTeam: number;
    partyOwnerMatchScoreEnemyTeam: number;
    partyOwnerProvisioningFlow: string;
    provisioningFlow: string;
    matchMap: string;
    partyId: string;
    isPartyOwner: boolean;
    partyState: string;
    partyAccessibility: string;
    maxPartySize: number;
    queueId: string;
    partyLFM: boolean;
    partyClientVersion: string;
    partySize: number;
    tournamentId: string;
    rosterId: string;
    partyVersion: number;
    queueEntryTime: string;
    playerCardId: string;
    playerTitleId: string;
    preferredLevelBorderId: string;
    accountLevel: number;
    competitiveTier: number;
    leaderboardPosition: number;
    isIdle: boolean;
};
export interface IUserPresence {
    gameName: string;
    gameTag: string;
    tag: string;
    msg: string;
    name: string;
    parties: any[] /* Replace with the correct type once you know what it returns */;
    pid: string;
    platform: string;
    gameInformation: GameInformation; // replace this once i know what it returns
    game: string;
    puuid: string;
    region: string;
    state: PresenceState
}
export interface IFriendRequest {
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
    async delete(): null
}
  
export type NameAvailability = {
    alias: string | null
    errorCode:  'no_error' | 'invalid_product_id_or_wallet_location' | 'insufficient_balance' | 'name_change_forbidden' | 'name_not_available' | 'rate_limited'
    errorMessage:string
    isSuccess: boolean
}
export type EnterMatchmakingQueueResponse = {
    /** Party ID */
    ID: string;
    MUCName: string;
    VoiceRoomID: string;
    Version: number;
    ClientVersion: string;
    Members: {
        /** Player UUID */
        Subject: string;
        CompetitiveTier: number;
        PlayerIdentity: {
            /** Player UUID */
            Subject: string;
            /** Card ID */
            PlayerCardID: string;
            /** Title ID */
            PlayerTitleID: string;
            AccountLevel: number;
            /** Preferred Level Border ID */
            PreferredLevelBorderID: string | "";
            Incognito: boolean;
            HideAccountLevel: boolean;
        };
        SeasonalBadgeInfo: null;
        IsOwner?: boolean | undefined;
        QueueEligibleRemainingAccountLevels: number;
        Pings: {
            Ping: number;
            GamePodID: string;
        }[];
        IsReady: boolean;
        IsModerator: boolean;
        UseBroadcastHUD: boolean;
        PlatformType: "PC";
    }[];
    State: string;
    PreviousState: string;
    StateTransitionReason: string;
    Accessibility: "OPEN" | "CLOSED";
    CustomGameData: {
        Settings: {
            /** Map ID */
            Map: string;
            /** Game Mode */
            Mode: string;
            UseBots: boolean;
            GamePod: string;
            GameRules: {
                AllowGameModifiers?: string | undefined;
                IsOvertimeWinByTwo?: string | undefined;
                PlayOutAllRounds?: string | undefined;
                SkipMatchHistory?: string | undefined;
                TournamentMode?: string | undefined;
            } | null;
        };
        Membership: {
            teamOne: {
                /** Player UUID */
                Subject: string;
            }[] | null;
            teamTwo: {
                /** Player UUID */
                Subject: string;
            }[] | null;
            teamSpectate: {
                /** Player UUID */
                Subject: string;
            }[] | null;
            teamOneCoaches: {
                /** Player UUID */
                Subject: string;
            }[] | null;
            teamTwoCoaches: {
                /** Player UUID */
                Subject: string;
            }[] | null;
        };
        MaxPartySize: number;
        AutobalanceEnabled: boolean;
        AutobalanceMinPlayers: number;
        HasRecoveryData: boolean;
    };
    MatchmakingData: {
        /** Queue ID */
        QueueID: string;
        PreferredGamePods: string[];
        SkillDisparityRRPenalty: number;
    };
    Invites: null;
    Requests: unknown[];
    /** Date in ISO 8601 format */
    QueueEntryTime: string;
    ErrorNotification: {
        ErrorType: string;
        ErroredPlayers: {
            /** Player UUID */
            Subject: string;
        }[] | null;
    };
    RestrictedSeconds: number;
    EligibleQueues: string[];
    QueueIneligibilities: string[];
    CheatData: {
        GamePodOverride: string;
        ForcePostGameProcessing: boolean;
    };
    XPBonuses: unknown[];
    InviteCode: string;
};
interface IUserSearch {
    gameName: string;
    tagLine: string;
    tag: string;
    puuid: string;
    /**
     * Sends the user a friend request
     * @example ```js
     * const users = client.searchUsername("Hima", "XANNY")
     * users[0].addFriend() // sends a friend request
     * 
     * ```
     */
    addFriend(): Promise<void>;
  }
export class ClientSocket extends WebSocket {
    
}
export class ValClient {
    /**
     * @description returns all friends on your friend list
     * @example ```js
     * const { valClient } = require("valclient")
     * const client = new ValClient()
     * console.log((await client.getFriends()))
     * ```
     */
    public async getFriends(): IFriend[]
    /**
     * @description send a friend request to user
     * @example ```js
     * const { ValCLient } = require("valclient")
     * const client = new ValClient()
     * console.log((await client.addFriend("Hima", "XANNY"))) // logs all outgoing friend requests
     * ```
     */
    public async addFriend(name: string, tag: string): IFriendRequest[]
    /**
     * @description returns a list of outgoing and incoming friend requests
     * @example ```js
     * const { ValClient } = require("valclient")
     * const client = new ValClient()
     * const friendRequests = await client.getFriendRequests()
     * friendRequests.forEach(fr => {
     *      fr.delete() // deletes friend request
     * })
     * ```
     */
    public async getFriendRequests(): IFriendRequest[]
    /**
     * @description returns your friend lists presences
     * @example ```js
     * const { ValClient } = require("valclient")
     * const client = new ValClient()
     * const presences = await getPresences()
     * console.log(presences[0].gameInformation)
     * ```
     */
    public async getPresences(): IUserPresence[]
    /**
     * @description checks if tag is available
     * @example ```js
     * const { ValClient } = require("valclient")
     * const client = new ValClient()
     * const response = await client.checkTagAvailable("Hima", "XANNY")
     * console.log(response)
     * ```
     */
    public async checkTagAvailable(name:string, tag:string): NameAvailability
    /**
     * @description search all the people with the username or optionally username and tag (username is required)
     * @example ```js
     * const { ValClient } = require("valclient")
     * const client = new ValClient()
     * (await client.searchUsername("Hima", "XANNY"))[0].addFriend()
     * ```
     */
    public async searchUsername(username:string, tag?:string):IUserSearch[]
    /**
     * @description Join the current matchmaking in the valorant client
     * @example ```js
     * const { ValClient } = require("valclient")
     * const client = new ValClient()
     * client.joinMatchmaking()
     * ```
     */
    public async joinMatchmaking():EnterMatchmakingQueueResponse
    public region:string
    public websocket:ClientSocket
}
declare module "valclient" {
    module.exports = {
        ValClient: ValClient
    }
}