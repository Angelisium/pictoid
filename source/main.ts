import express from 'express';
import nunjucks from 'nunjucks';
import { route as HomeController } from './route/home';

const port = process.argv?.[2] || 3000;
const app = express();
nunjucks.configure('source/view', {
	autoescape: true,
	express: app
});

app.get('/', HomeController);
app.use(express.static('public'));

app.listen(port, () => {
	console.log('listen 127.0.0.1:' + port);
});