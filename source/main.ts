import express from 'express';
import nunjucks from 'nunjucks';
import { route as HomeController } from './route/home';

const app = express();
nunjucks.configure('source/view', {
	autoescape: true,
	express: app
});

app.get('/', HomeController);
app.use(express.static('public'));

app.listen(3000, () => {
	console.log('The application is listening on port 3000!');
});

// soon add https + 'yarn prod <port>' or 'yarn start <port>'