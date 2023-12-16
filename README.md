# TalentPalette

TalentPalette is a platform designed to bridge the gap between professional networking and social interaction, tailored for creative professionals. It blends the formal aspects of LinkedIn with the engaging social experience of Instagram.

## Table of Contents

- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)

## Overview

The platform offers a unique mix of features from job listings and gig postings to social media-like user interactions with posts and profiles, all geared towards talent discovery and professional networking in the creative field.

## Technology Stack

- *MongoDB*: A document-based open source database.
- *Express.js*: A web application framework for Node.js.
- *React*: A JavaScript library for building user interfaces.
- *Node.js*: A JavaScript runtime built on Chrome's V8 JavaScript engine.

## Project Structure

The project follows a MVC-like structure divided into client and server sides:

### Client-Side

- src/
  - components/: Contains all React components.
  - pages/: React components that represent pages.
  - App.js: The root React component that contains the main application logic.
  - index.js: The entry point that renders the React application.

### Server-Side

- models/: Schemas for the database models.
- controllers/: Logic for handling requests for each model.
- routes/: Definitions of RESTful endpoints.
- server.js: The main entry point of the server application.

### Key Components

- Admin: For managing users, posts, and job listings.
- Home: Displays user lists, posts, and profiles.
- Jobs: Lists available jobs and gigs.
- UserProfile: Shows specific user profiles with posts and gigs.
- Login/Signup: Handle user authentication and registration.

## Getting Started

To get a local copy up and running, follow these simple steps.

1. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Project-Name.git


Install NPM packages

npm install

Start the server

npm run start


Start the client

cd client


npm start


Run: http://3.134.245.199
