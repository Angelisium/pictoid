# <img width="100%" src="./application/public/source/img/logo2.svg" alt="Pictoid">
A new version of pictoid ❤
Pictoid is a [Twinoid](https://twinoid.com) external application to collect and list of available rewards on Twinoid's games. This application also provides tools to allow users to better determine the rewards they have left to earn.

`<insert some screenshot here>`

## Quick start
Currently, the project is configured to run in a docker container with a traefik proxy (e.g. [adws](https://github.com/Angelisium/adws)).
But you can start it natively with [Redis:6.0.x+](https://redis.io), [MongoDB](https://mongodb.com) and [Node.js:18.7.x+](https://nodejs.org) (and npm:8.15.x+ if isn't included by default in your Node.js distribution) :
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

# bulk

```py
################################################################################
# Miscellaneous                                                                #
################################################################################
NODE_ENV="development"
# NODE_ENV="production"

ENABLE_HTTPS="true"
HTTP_PORT=8080

# Only used if ENABLE_HTTPS is true :
HTTPS_PORT=8443
SSL_KEY="temp/server.key"
SSL_CRT="temp/server.crt"

################################################################################
# MongoDB                                                                      #
################################################################################
MONGO_URL="mongodb://localhost:27017/"
MONGO_DBN="pictoid"

################################################################################
# Redis                                                                        #
################################################################################
REDIS_HOST=127.0.0.1
REDIS_PORT=6379

################################################################################
# Twinoid                                                                      #
################################################################################
APP_URL="http://localhost:8080"
CLIENT_ID=123
CLIENT_SECRET="h3r3.4.5m411.3x4mp13.0f.7w1n01d.53cr37"
QUOTA=500
```