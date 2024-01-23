const fs = require("fs")
const local = process.env.localappdata


class Util {
    static getLockfileData() {
        const path = local + "\\Riot Games\\Riot Client\\Config\\lockfile"
        const data = fs.readFileSync(path, {
            "encoding": "utf-8"
        })
        const [name, pid, port, password, protocol] = data.split(":")
        return {
            name,
            pid,
            port,
            password,
            protocol
        }
    }
    static getRegion() {
        const path = local + "\\VALORANT\\Saved\\Logs\\ShooterGame.log"
        const data = fs.readFileSync(path, "utf-8").split("\n")
        let region
        data.forEach((line) => {
            if (line.includes(".a.pvp.net/account-xp/v1/")) {
                region = line.split(".a.pvp.net/account-xp/v1/")[0].split(".").slice(-1)[0]
            }
        })
        return region
    }
    static getShard() {
        const path = local + "\\VALORANT\\Saved\\Logs\\ShooterGame.log"
        const data = fs.readFileSync(path, "utf-8")
        const matches = data.match(/https:\/\/glz-(.+?)-1.(.+?).a.pvp.net/)
        const shard = matches[1]
        return shard
    }
}

module.exports = {
    Util
}