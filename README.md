# Full-stack Express + Prisma + PostgreSQL Template

## Create repo from template

Click “Use this template” on GitHub and create your new repository.

## Install dependencies

`npm install`

## Create PostgreSQL database

Open PostgreSQL shell:  
`psql`

Create database:  
`CREATE DATABASE mydatabase;`

Exit psql:  
`\q`

## Create `.env` file (project root)

Similar to:

```
DATABASE_URL="postgresql://username:password@localhost:5432/mydatabase"
COOKIE_SECRET="secret_cookie"
```

## Run Prisma migrations

`npx prisma migrate dev --name init`

## Generate Prisma client

`npx prisma generate`

## Open prisma studio

`npx prisma studio --config ./prisma.config.js`

## Update app configuration

- In `app.js`, set your app title:  
  `res.locals.appTitle = "appTitleGoesHere";`
- change source link to repo in views/partials/header.ejs

## Update package metadata

In `package.json`, update any placeholder with "express-prisma-psql-template" to the new repo name

## Update README

Replace this README with project-specific documentation.

##. Start development server

`npm run dev`
