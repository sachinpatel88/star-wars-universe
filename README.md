# Star Wars Universe Web App

Web client to explore star wars universe's characters. API provided by http://swapi.co/.

## GraphQL Server

You can find GraphQL server repository [here](https://github.com/sachinpatel88/star-wars-universe-server) which enables client to fetch API data from [swapi](http://swapi.io).

To run GraphQL server, follow steps provided in [star-wars-universe-server](https://github.com/sachinpatel88/star-wars-universe-server) description.

Once it's start, follow following steps to start star-wars-universe web app on local.

## Setup

```sh
clone https://github.com/sachinpatel88/star-wars-universe.git

cd ./star-wars-universe/
npm install
npm start
```

Web app will be running on [http://localhost:8080](http://localhost:8080).

## Build

To build project, run following command in terminal.

```sh
npm run build
```

It will create a `build` folder which can be deployed on server.

## To run locally,

If python is installed locally, type following command to run web app.

```sh
cd ./build
python -m SimpleHTTPServer
```

# Todo

-   Request btching
-   Deploy on heroku and make graphQL server URL dynamic
