# <h1 align="center">Scarlet Navigator</h1>

<div align="center">
  
 <a href="">[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)</a>
 <a href="">[![GitHub issues](https://img.shields.io/github/issues/kevinmonisit/Scarlet-Navigator)](https://github.com/kevinmonisit/Scarlet-Navigator/issues)</a>
  
</div>

![Jul-24-2022 23-25-51](https://user-images.githubusercontent.com/7038712/183774963-b091457b-9010-4d57-8a66-e46ace5b7c76.gif)

## About
Scarlet Navigator is a free and open source project designed to make planning your courses less confusing and more intuitive. By looking at the bigger picture, you'll be more confident about your path towards graduation. This project is not managed nor sponsored by Rutgers University, so any feedback or bug reports should either be posted here or emailed.


## Roadmap

- Adding all

- Decouple frontend from Firebase integration and instead opt for as much utilization of REST


## Development

This project is deployed using Firebase and stores user and course data on Firestore, which does not support any native
fuzzy search functionality. Instead, an SaaS like Algolia is used to search through the course documents.

To run this project locally, you are going to need to download Firebase CLI and setup a free account with Algolia.

### Tools
Download the Firebase CLI here: https://firebase.google.com/docs/cli

Setup an Aloglia account here: https://www.algolia.com/

### Setup

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bashƒ
  npm install
```

Start the server

```bash
  npm run start
```


## Features

- Light/dark mode toggle
- Live previews
- Fullscreen mode
- Cross platform


## Feedback

If you have any feedback, please click the "Feedback" button on the top right of Scarlet Navigator.


## Tech Stack

**Client:** React, Redux, Tailwind CSS, TypeScript

**Hosting and Scripts:** Firebase, Firestore, Algolia, Python


## License

[MIT](https://choosealicense.com/licenses/mit/)

