# Meetapp

Node, ReactJS and React Native App for Meetup organizers.

## Getting Started

1. Clone the repository
2. Use yarn to install the dependencies.
3. Set up the backend environemnt by running Docker
4. Create the databases using Sequelize
5. Follow th instructions

### Prerequisites

Here's what you'll need to run this project:

- Docker
- Node.js
- Yarn
- ReactJS
- React Native

### Set up Environment and Backend

Once you clone the repository, go into the /backend folder and run the following commands:

```
docker-compose up
```

Then create the database and tables

```
yarn sequelize db:create
yarn sequelize db:migrate
```

This should set up your Postgres environment.

### Run the frontent (ReactJS)

Go to the /frontend directory and install the dependencies needed:

```
yarn
```

Then after installation is over run:

```
yarn start
```

### Run the Mobile Version (React Native)

Go to the /mobile directory and install the dependencies needed by running:

```
yarn
```

Then after installation is finished:

- For iOS run:

```
react-native run-ios
```

- and for Android run:

```
react-native run-android
```
