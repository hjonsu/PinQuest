PinQuest: Pinterest for learning resources!
=========

## Features

* users are able to create a pin with a title, description and body
* users are able to search for already-saved resources created by any user
* users are able to categorize any resource under a tag
* users are able to comment on any resource
* users are able to rate any resource
* users are able to like any resource
* users are able to view all their own resources on one page ("My pins")
* users are able to view all their favorited resources on one page ("Favorites")
* users are able to register, log in, log out and update their profile


## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Create a postgresql database locally
3. Update the .env file with your correct local information 
  - username: `your username` 
  - password: `your password` 
  - database: `your database`
4. Install dependencies: `npm i`
5. Fix to binaries for sass: `npm rebuild node-sass`
6. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`


!["Screenshot of log-in"](https://github.com/mrfinesse47/resource-wall/blob/master/public/images/login.png)
!["Screenshot of sign-up"](https://github.com/mrfinesse47/resource-wall/blob/master/public/images/sign%20up.png)
!["Screenshot of user-profile"](https://github.com/mrfinesse47/resource-wall/blob/master/public/images/user%20Profile.png)
!["Screenshot of pin creation"](https://github.com/mrfinesse47/resource-wall/blob/master/public/images/create%20pin.png)
!["Screenshot of Home"](https://github.com/mrfinesse47/resource-wall/blob/master/public/images/All%20pins.png)
!["Screenshot of favorited pins"](https://github.com/mrfinesse47/resource-wall/blob/master/public/images/favorited.png)
!["Screenshot of my pins"](https://github.com/mrfinesse47/resource-wall/blob/master/public/images/m%20pins.png)


## Warnings & Tips

- Do not edit the `layout.css` file directly, it is auto-generated by `layout.scss`
- Split database schema (table definitions) and seeds (inserts) into separate files, one per table. See `db` folder for pre-populated examples. 
- Use the `npm run db:reset` command each time there is a change to the database schema or seeds. 
  - It runs through each of the files, in order, and executes them against the database. 
  - Note: you will lose all newly created (test) data each time this is run, since the schema files will tend to `DROP` the tables and recreate them.

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- Cookie-session
- Express
