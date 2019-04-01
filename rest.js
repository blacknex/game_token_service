const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

class REST {
	constructor(components, config) {
		this.tokenDB = components.tokenDB;
		this.tokenService = components.tokenService;
		this.api = express();
		this.api.use(bodyParser.json());
		this.api.use(cors());
		this.api.post("/create", (req, res) => this.create(req, res));
		this.api.post("/check", (req, res) => this.check(req, res));
		this.api.listen(config.port);
		console.log(`Listening on ${config.port}`);
	}

	async create(req, res) {
		console.log("jee");
		try { 
			if(!req.body.userId) throw new Error("userId not set");
			let token = await this.tokenDB.create(req.body.userId);
			res.send(token);
		} catch (err) {
			res.status(400).send(err.message);
		}
	}

	async check(req, res) {
		try {
			if(!req.body.token) throw new Error("Token not set");
			let token = await this.tokenDB.check(req.body.token);
			res.send({userId: token.userId});
		} catch (err) {
			res.status(400).send(err.message);
		}
	}
}

module.exports = REST;