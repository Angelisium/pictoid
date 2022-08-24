import 'dotenv/config';
import express from 'express';
import nunjucks from 'nunjucks';
import { MongoClient } from 'mongodb';
import { route as HomeController } from './route/home';

(async function (port: number) {
	if (!process.env.MONGO_URL) {
		return console.error("unknown mongo url");
	}
	const exprs = express();
	const mongo = new MongoClient(process.env.MONGO_URL);
	try {
		await mongo.connect();
		console.log("Connected correctly to server");
	} catch (e) {
		if(typeof e === "string") {
			return console.error(e);
		} else if(e instanceof Error) {
			return console.error(e.message);
		}
	}

	nunjucks.configure('source/view', {
		autoescape: true,
		express: exprs
	});

	exprs.get('/', HomeController);
	exprs.use(express.static('public'));

	exprs.listen(port, () => {
		console.log('listen 127.0.0.1:' + port);
	});
})(parseInt(process.argv?.[2] || '3000'));