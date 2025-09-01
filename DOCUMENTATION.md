# Documentation

## Backend

The backend implements an Open API with Node.js + Express. It has a layered architecture with the following layers(from the highest to the lowest level):
    - Routers, check the requests that came, verifying their prerequisites;
    - Controllers, handle the verified requests, building the proper responses;
    - Services, handle the business logic of the application;
    - Repositories, handle the access to permanent data, exposing their CRUDs;
    - Models, handle directly the database consistence throght Sequlize.
The projects uses the following dependencies:
    - bcrypt, for password hashing;
    - jsonwebtoken, for the session handling;
    - sequelize, as ORM;
    - sqlite3, as dev database;
    - swagger-jsdoc, for the automatized generation of OpenAPI documentation;
    - swagger-ui-express, to expose the API via web;
    - dotenv, to manage environment variables.
