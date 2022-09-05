import './job';
import fs from 'fs';
import i18n from 'i18n';
import http from 'http';
import https from 'https';
import dotenv from 'dotenv';
import nunjucks from 'nunjucks';
import session from 'express-session';
import { MongoClient, Db } from 'mongodb';
import express, { ErrorRequestHandler } from 'express';

import path from 'path';

import { route as HomeController } from './route/Home';
import { route as GameController } from './route/Game';
import { route as OauthLoginController } from './route/oauth/Login';
import { route as OauthLogoutController } from './route/oauth/Logout';
import { route as OauthCallbackController } from './route/oauth/Callback';

import { connectToDatabase } from './mongo';

declare global {
	var __: any;
	var njk: any;
}
declare module "express-session" {
	interface SessionData {
		twinoidId?: number;
		twinoidToken?: string;
		username?: string;
		avatarUrl?: string;
		locale?: string;
	}
}

async function run() {
	dotenv.config();

	const exprs = express();
	if (!await connectToDatabase())
		return;

	i18n.configure({
		locales: ['de', 'en', 'es', 'fr'],
		directory: path.join(__dirname, 'i18n'),
		defaultLocale: 'fr',
		retryInDefaultLocale: true,
		objectNotation: true,
		register: global
	});

	const njk = nunjucks.configure('source/view', {
		autoescape: true,
		trimBlocks: true,
		lstripBlocks: true,
		express: exprs,
		watch: process.env.NODE_ENV === "development"
	});
	njk.addFilter('translate', __, false);
	njk.addFilter('randlist', function (arr: Array<any>) {
		let unsuffled = arr.map(value => ({ value, sort: Math.random() })),
			suffled = unsuffled.sort((a, b) => a.sort - b.sort);
		return suffled.map(({ value }) => value);
	}, false);
	njk.addFilter('ultratrim', function (str: string) {
		return str.replace(/(\s{2,}|\n)/g, ' ').trim();
	}, false);
	global.njk = njk;

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
	exprs.get('/:locale/game/:id', GameController);
	exprs.use('/oauth/login', OauthLoginController);
	exprs.use('/oauth/logout', OauthLogoutController);
	exprs.use('/oauth/callback', OauthCallbackController);

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

run();