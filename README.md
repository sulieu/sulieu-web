# suviet-web

> Application toolset suviet-web - based on Devebot

## Installation

Clone source code from repository:

```
$ git clone https://your_repository.com/your_account/suviet-web.git
```

Change working directory to `suviet-web` folder:

```
$ cd suviet-web
```

Install nodejs module using `npm`:

```
$ npm install
```

Run `suviet-web` application:

```
$ NODE_DEVEBOT_PROFILE=console NODE_DEVEBOT_SANDBOX=demo node app.js
```

Run `suviet-web` integration tests:

```
$ npm test
```

or run specific tests:

```
$ node_modules/.bin/cucumber.js test/it/features/<specific-test>.feature
```
