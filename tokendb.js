class TokenDB {
	constructor(config) {
		this.tokens = [];
	}

	async create(userId) {
		//TODO: remember to nullify earlier tokens
		if(!userId) throw new Error("userId not set!");
		let token = {
			userId,
			token: parseInt(Math.random()*100000) //TODO: more random
		}
		this.tokens.push(token);
		return token;
	}

	async check(token) {
		if(!token) throw new Error("Token not set!")
		let found = this.tokens.filter(t => t.token === token);
		if(found.length < 1) throw new Error("Token not found");
		return found[0];
	}
}
module.exports = TokenDB;