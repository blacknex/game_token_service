const REST = require("./rest.js");
const config = require("./config.json");
const TokenDB = require("./tokendb.js");
class TokenService {
    constructor() {
        this.init();
    }

    async init() {
        this.tokenDB = new TokenDB(config.tokenDB);
        this.rest = new REST({tokenDB: this.tokenDB}, config.rest);
    }
}

new TokenService();