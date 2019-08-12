# 10000

Track the 10000 hours (or less) to expertise in a skill. Based on [10000 hour rule](https://en.wikipedia.org/wiki/Outliers_(book)) by  Malcolm Gladwell.

Demo application is running live [here](https://project-10000-hours.firebaseapp.com/).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites

* Yarn v1.3.2 - Installation instructions [here](https://yarnpkg.com/lang/en/docs/install/)
* Node v10.16.0 - Installation instructions [here](https://nodejs.org/en/download/package-manager/)
* Firebase project - Helpful if you are familiar with using firebase. 

### Setting up the project

Clone the repository and cd to it

```
$ git clone https://github.com/Dhiraj072/10000
$ cd 10000
```

Install packages

```
$ yarn install
```

Set up a Firebase project for your application. Read [setting up firebase for your project](https://firebase.google.com/docs/web/setup). Note that the project supports login via Google/Facebook, though for it to work correctly, you will need to enable the the sign-in methods for those in your Firebase Authentication console. See the instructions for [Google](https://firebase.google.com/docs/auth/web/google-signin) and [Facebook](https://firebase.google.com/docs/auth/web/facebook-login).


Create firebase properties file. This contains the credentials/settings used to connect to firebase for your dev server / tests. For production, I use firebase hosting, which allows me to automatically retrieve these for firebase server.

```
$ vi .env.development
$ vi .env.test
```

And fill up following firebase account properties in the file

```
FIREBASE_API_KEY=<>
FIREBASE_AUTH_DOMAIN=<>
FIREBASE_DATABASE_URL=<>
FIREBASE_PROJECT_ID=<>
FIREBASE_STORAGE_BUCKET=<>
FIREBASE_MESSAGING_SENDER_ID=<>
```

Run development server

```
$ yarn start
```


Finally, access the application at http://localhost:3000/


## Deploying the project to firebase hosting

I use firebase hosting to deploy the app. It's completely free and easy to use. 

Replace the default project name in .firebaserc with your Firebase project's name
```
{
  "projects": {
    "default": "<your_project_here>",
  }
}

```

Initialize firebase deployment
```
$ yarn firebase init
```

Create a production build
```
$ yarn build
```

Deploy to firebase
```
$ yarn deploy
```

Firebase should come back with a url with which you will be able to access the app.


## Built With

* [React](https://reactjs.org/) - The web framework used
* [Yarn](https://yarnpkg.com/en/) - Dependency Management
* [Webpack](https://webpack.js.org/) - Module bundler
* [Jest](https://jestjs.io/) - Testing framework
* [Firebase](https://firebase.google.com/) - Database

## Authors

* [Dhiraj](https://github.com/dhiraj072)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

