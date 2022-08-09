# Scarlet-Navigator

Add image here.

## About
Scarlet Navigator is a free and open source project designed to make planning your courses less confusing and more intuitive. By looking at the bigger picture, you'll be more confident about your path towards graduation. This project is not managed nor sponsored by Rutgers University, so any feedback or bug reports should either be posted here or emailed to me.

To contribute, you'll need to know mainly Redux Toolkit, Typescript, React, and tailwindcss.

## Getting started
Scarlet Navigator has been designed to be de-coupled from the backend. Therefore, you will
find that the majority of the business logic is placed in the frontend. Originally, Scarlet
Navigator was built with Node.js/Express in mind but, due to logistical constraints, it transitioned to Firebase.

In both cases you will need:

- npm
- node
- git

To get started:
 'git clone scarlet-nav....'

Check out the wiki for more information about development setup.

### Prerequisites
Please make sure you have the following tools installed.

- npm
- node
- git


### Firebase Setup
This is the preferred method of development and setup, but it requires a bit of configuration.
If your contribution does not require changes to document schema or any other interaction with the database, you can simply skip to the Express setup section.

Requirements:

- Firebase CLI
- Algolia Account

Firebase's NoSQL database solution does not have a built-in document search
(e.g. fuzzy searching by course title). Algolia is a widely used pay-as-you-go search API and it is used by Scarlet Navigator.
Thankfully, Algolia allows you to make a free tier account without inputting a credit card.

1. Install Firebase CLI

2. Initialize Firebase

3. Add data to Firestore

./import_courses_to_firestore.sh

4. Create an Algolia Account

5. Setup Algolia Extension

6. Replace Algolia API keys

7. Begin Firebase Emulator


### Express Setup
Scarlet Navigator doesn't use Express/Node.js for the backend. However, if you want to quickly
setup the project and make contributions to the frontend application on your local machine, you can do so. This includes new frontend features and bug fixes.

1. Install node modules

cd ./frontend && npm i && cd .. && cd ./backend && npm i


ADD TABLE that shows what type of contributions can be made.




All other content is in the Wiki.

Look at the wiki of lichess for reference





## Frontend

## Overview
The frontend is made in React, Typescript, and has state managed by Redux Toolkit. The
drag-and-drop system is handled by React Beautiful DnD. As of writing, React Beautiful DnD
development is paused until further notice. Consequently, the version of React must
stay at version 17 until the drag and drop framework supports newer versions of React (despite React 18 being available).




## Firebase Hosting


## Maintenance









## Maintanence

How to add next year's course data into firestore.

### Updating Course Data to Current Year
Rutgers has an endpoint that will respond back with a large JSON file
containing course data. In the url, there is a query parameter where
you can specify what year to retrieve course data.

The courses folder in the repo contains metadata Firebase emulator needs
to import into Firestore emulator. It will not simply take a JSON file.

1. Create a Google Cloud Account
2. Install Google Cloud CLI
3. Run these commands
4.


## Overview
As of now, Scarlet Navigator is hosted on Firebase, leveraging its
micro-services such as CDN hosting, serverless functions, and its NoSQL
database, Firestore. However, you will find files referencing Express and MongoDB. Originally, Scarlet Navigator was built with those technologies in mind, but I switched to Firebase later in development.

Frontend:
React 17
React Beautiful DnD (for drag and drop functionality)

Backend (defunct):
Expressjs / Node.js
MongoDB

The bulk of this project is the frontend and I've done a lot to make sure the frontend is de-coupled from Firebase as much as possible. In the event that hosting should change, it shouldn't be too much of a pain. I have dedicated a section to changing hosting services.

## Getting Started

1. git clone repo
2. Install firebase CLI
3. cd ScarletNavigator
4. ./emulator_dev_start.sh

The sh file will start the Firebase Emulator, which will emulate Firestore, Cloud Functions, and Authentication.
