# Meetapp

Node, ReactJS and React Native App for Meetup organizers.

## Steps

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

Once you clone the repository, go into the /backend folder, create a file named '.env' and copy the contents of the .env.example file to it and replace the credentials with your own.

Then run the following command:

```
yarn
```

Wait for the packages installation to finish, then run:

```
docker-compose up
```

Once your containers are set up you are ready to create the database and tables:

```
yarn sequelize db:create
yarn sequelize db:migrate
```

This should get the backend running.

### Run the frontend/web version (ReactJS)

Go to the /frontend directory and install the dependencies needed:

```
yarn
```

Once installation is over run:

```
yarn start
```

### Run the Mobile Version (React Native)

Go to the /mobile directory and install the dependencies needed by running:

```
yarn
```

Wait for the installations to finish.
Regardless of the platform you want to use, you should start by running the followinig command:

```
yarn start --reset-cache
```

Then...

- For iOS:

First time users should run the 'pod install' command:

```
cd ios
pod install
```

Run:

```
react-native run-ios
```

- and for Android run:

```
react-native run-android
```

Have fun! :)
