# <h1 align="center">Scarlet Navigator</h1>

<div align="center">
  
 <a href="">[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)</a>
 <a href="">[![GitHub issues](https://img.shields.io/github/issues/kevinmonisit/Scarlet-Navigator)](https://github.com/kevinmonisit/Scarlet-Navigator/issues)</a>
  
</div>

![Jul-24-2022 23-25-51](https://user-images.githubusercontent.com/7038712/183774963-b091457b-9010-4d57-8a66-e46ace5b7c76.gif)

## About
Scarlet Navigator is a free and open source project designed to make planning your courses less confusing and more intuitive. By looking at the bigger picture, you'll be more confident about your path towards graduation. This project is not managed nor sponsored by Rutgers University, so any feedback or bug reports should either be posted here or emailed.

Check out the reddit post! @ [go.rutgers.edu/scarletnav](https://go.rutgers.edu/scarletnav).

Awarded [Best Fullstack Project](https://github.com/kevinmonisit/Scarlet-Navigator/assets/7038712/f52cd55d-d7ec-4096-ae14-19067639d780) by the [Rutgers Computer Science Department](https://www.cs.rutgers.edu/)!

### Testimonies

<img width="713" alt="image" src="https://github.com/kevinmonisit/Scarlet-Navigator/assets/7038712/99fad683-e1ae-432e-b553-ac6aaad78c3f">
<img width="693" alt="image" src="https://github.com/kevinmonisit/Scarlet-Navigator/assets/7038712/a3d1311e-9d7d-452a-8fa7-6fbf38717cae">
<img width="605" alt="image" src="https://github.com/kevinmonisit/Scarlet-Navigator/assets/7038712/1eb711be-ef4f-47eb-bd83-c1a51379815b">


[and more...](https://go.rutgers.edu/scarletnav)

## Tech Stack

**Frontend**
- [React 17](https://react.dev/), a popular JavaScript framework for frontend development
- [React Beautiful DnD](https://github.com/atlassian/react-beautiful-dnd), a React library that acts as a wrapper to [React DnD](https://react-dnd.github.io/react-dnd/about)
- [Redux](https://redux.js.org/), a state manager for managing complex React state throughout Scarlet Navigator
- [Tailwind CSS](https://tailwindcss.com/), an opinionated in-line CSS framework for quickly styling elements 
- [TypeScript](https://www.typescriptlang.org/) adds types to enforce type-safe JavaScript practices
- [MUI](https://mui.com/) used for a few components (would like to move away from this and focus on Tailwind CSS)

**Backend**

- [Firebase](https://firebase.google.com/) handles hosting, serverless functions, Algolia search integration, and provides a [NoSQL](https://en.wikipedia.org/wiki/NoSQL) database called [Cloud Firestore](https://firebase.google.com/docs/firestore)
- [Algolia](https://www.algolia.com/) allows for fuzzy search of courses because Cloud Firestore doesn't allow users to search courses unless there is an exact match
- [Python](https://www.python.org/) was used to create scripts that parse course data and uploads them to Cloud Firestore via Firebase Python SDKs

## Roadmap

- Add all courses

- Adding a linter and enforcing prettier

- Adding Github CI/CD

- Restructure Scarlet Navigator to be developer-friendly (adding a Getting Started section)

- Create a wiki??

- Decouple frontend from Firebase integration and instead opt for as much utilization of REST


## Development

This project is deployed using Firebase and stores user and course data on Firestore, which does not support any native
fuzzy search functionality. Instead, an SaaS like Algolia is used to search through the course documents.

To run this project locally, you are going to need to download Firebase CLI and setup a free account with Algolia.

### Tools
Download the Firebase CLI here: https://firebase.google.com/docs/cli

Setup an Aloglia account here: https://www.algolia.com/

### Setup


## Features


## Feedback

If you have any feedback, please click the "Feedback" button on the top right of Scarlet Navigator.

## License

[MIT](https://choosealicense.com/licenses/mit/)

