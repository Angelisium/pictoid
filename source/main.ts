import fs from 'fs';
import http from 'http';
import https from 'https';
import dotenv from 'dotenv';
import express from 'express';
import nunjucks from 'nunjucks';
import { MongoClient } from 'mongodb';
import { route as HomeController } from './route/home';

(async function (port: number) {
	dotenv.config();
	if (!process.env.MONGO_URL) {
		return console.error("unknown mongo url");
	}
	const exprs = express();
	const mongo = new MongoClient(process.env.MONGO_URL);
	try {
		await mongo.connect();
		console.log("Connected correctly to MongoDB server");
	} catch (e) {
		if (typeof e === "string") {
			return console.error(e);
		} else if (e instanceof Error) {
			return console.error(e.message);
		}
	}

	nunjucks.configure('source/view', {
		autoescape: true,
		express: exprs
	});

	exprs.get('/', HomeController);
	exprs.use(express.static('public'));

	const ser1 = http.createServer(exprs);
	const ser2 = https.createServer({
		key: fs.readFileSync(process.env.SSL_KEY || 'temp/server.key', 'utf8'),
		cert: fs.readFileSync(process.env.SSL_CRT || 'temp/server.crt', 'utf8'),
	}, exprs);

	ser1.listen(parseInt(process.env.HTTP_PORT || '8080'));
	ser2.listen(parseInt(process.env.HTTPS_PORT || '8443'));
})(parseInt(process.argv?.[2] || '3000'));