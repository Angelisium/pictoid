# <img width="100%" src="./public/source/img/logo2.svg" alt="Pictoid">
A new version of pictoid ❤
Pictoid is a [Twinoid](https://twinoid.com) external application to collect and list the list of rewards available on Twinoid's games. This application also provides tools to allow users to better determine the rewards they have left to earn.

`<insert some screenshot here>`

## Quick start
Currently, the project is configured to run in a docker container with a traefik proxy (e.g. [adws](https://github.com/Angelisium/adws)).
But you can start it natively with [Redis:6.0.x+](https://redis.io), [MongoDB](https://mongodb.com) and [Node.js:18.7.x+](https://nodejs.org) (and npm:8.15.x+ but it's included by default in Node.js) :
 - setup global, mongodb, redis and twinoid configurations in your .env (see .env.example)
 - run `npm install`
 - run `npm run start`
 - go to https://localhost:8080/ (according to your .env configuration)

> **Note**    
> If you want to use the lock files for the dependencies installation, you can get them in the `.lock` folder.

**Starting sample:**
 - [lazy with docker](#soon).
 - [classic with node.js](#soon)
 - [custom with yarn](#soon)
 - [technovorous with bun](#soon)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](./LICENSE)

## soon
 - write examples of native / yarn start, docker start and bun start.
 - choose a better license ?
 - fine-tune website details
 - ???