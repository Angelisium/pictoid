import fs from 'fs';
import http from 'http';
import https from 'https';
import dotenv from 'dotenv';
import express, { ErrorRequestHandler } from 'express';
import nunjucks from 'nunjucks';
import { MongoClient, Db } from 'mongodb';
import { route as HomeController } from './route/Home';
import TwinoidRouter from './route/Twinoid';
import session from 'express-session';

declare global {
	var mongo: Db
}

declare module "express-session" {
	interface SessionData {
		twinoidId?: number;
		twinoidToken?: string;
		username?: string;
		avatarUrl?: string;
	}
}

async function run(port: number) {
	dotenv.config();
	if (!process.env.MONGO_URL || !process.env.MONGO_DBN) {
		return console.error("Unknown mongo information");
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
	global.mongo = mongo.db(process.env.MONGO_DBN);

	nunjucks.configure('source/view', {
		autoescape: true,
		trimBlocks: true,
		lstripBlocks: true,
		express: exprs,
		watch: process.env.NODE_ENV === "development"
	});

	exprs.use(
		session({
			secret: "pioupouet",
			cookie: {
				secure: process.env.NODE_ENV !== "development",
				maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
			},
			saveUninitialized: true,
			resave: false,
		})
	);

	exprs.use(express.static('public'));
	exprs.get('/', HomeController);
	exprs.get('/:locale', HomeController);

	exprs.use('/oauth', TwinoidRouter);

	exprs.use((function (err, req, res, next) {
		console.error(err.stack);
		res.status(500).send('Something broke!');
	}) as ErrorRequestHandler);

	const ser1 = http.createServer(exprs);
	ser1.listen(parseInt(process.env.HTTP_PORT || '8080'));
	console.log(`HTTP server listening on port ${process.env.HTTP_PORT || '8080'}`);

	if (process.env.ENABLE_HTTPS === "true") {
		const ser2 = https.createServer({
			key: fs.readFileSync(process.env.SSL_KEY || 'temp/server.key', 'utf8'),
			cert: fs.readFileSync(process.env.SSL_CRT || 'temp/server.crt', 'utf8'),
		}, exprs);
		ser2.listen(parseInt(process.env.HTTPS_PORT || '8443'));
		console.log(`HTTPS server listening on port ${process.env.HTTPS_PORT || '8443'}`);
	}
}

run(parseInt(process.argv?.[2] || '3000'));