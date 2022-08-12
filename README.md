## Description

Backend application for use with a custom keyboard optimized for EEG signals. It is developed with the [Nest](https://github.com/nestjs/nest) framework with TypeScript.

The API contains two endpoints – GET /confirm and GET /next. After calling these endpoints, it sends messages via WebSockets to the [FE app](https://github.com/terez2/keyboard)

It runs on port 3000.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```
