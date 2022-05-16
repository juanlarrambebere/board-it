# Board it App

Board-it is an application to manage projects.

## Disclaimer:

An application to manage projects is much more complex than Board-it. This is an MVP with a minimal feature set.

# What is possible to do?

1. View existing tasks.
2. Create new tasks with `name`, `description` and `status`.
3. Edit a task (the status can be edited either in-line or via drag&drop)
4. Delete a task.

# Out of scope

1. Users. It would be desirable to know which user created which task as well as who is assigned to a task.
2. Projects. It would be nice to be able to create projects that group tasks and have members.
3. Attributes. At the moment Board-it knows only one "status" attribute. Ideally, users should be able to create custom attributes at the project level and be able to use them to filter / create special views etc.
4. Authentication and Authorization. Users would have to authenticate themselves in order to access their projects/tasks.

# Architecture

Board-it es una aplicación cliente servidor. El siguiente diagrama ilustra la arquitectura.
<img width="608" alt="architecture" src="https://user-images.githubusercontent.com/18520314/168510916-33351580-a4f5-4b85-97b0-c8c4b17e1daf.png">

## Front-end

The frontend is a React app made with Nextjs.

## Backend

The backend exposes a GraphQL API using [Hasura](https://hasura.io/). Why not REST? I have nothing against REST, in fact I have much more experience with rest APIs, but for this MVP it seemed reasonable to expose a quick GraphQL API and focus on the web-app.

# Deploying to production

## The app is up and running, you should be able to play around with it at [Board-it](https://board-it-phi.vercel.app/)

## CI

No CI tools were configured for simplicity. In the future it'd be a must.

## CD

Deploying to production is as simple as merging a PR to master.

The frontend is deployed to [Vercel](https://vercel.com/) and is configured to deploy the `frontend` folder every time something is merged into master.

The backend is deployed to the [Hasura Cloud](https://cloud.hasura.io/), and likewise, it is configured to deploy the `backend` port every time something is merged to master.

# Development

You'll need to run both projects in two different terminal windows/tabs.

1. Fetch the latest changes from git

```
git checkout master && git pull origin master
```

## Backend

<b>Pre-requisites:</b>

1. Docker. To run hasura you'll need docker up & running in your compouter.
2. Port 8080 available. Hasura runs in the port 8080, so make sure the port is available.

<b>Start:</b>

1. Navigate to the backends folder

```
cd backend
```

2. Set up the required environment variables for Hasura. To do so, you'll need to create an `.env` file and paste the content of `.env.sample` into it.

```
touch .env && cp .env.sample .env
```

3. Run hasura vía docker-compose.

```
docker-compose up -d
```

Hasura's engine should start and you should be able to entre it's console at http://localhost:8080

Note: The first time you access, Hasura will ask for the admin secret. You'll find it in the `.env.sample` under the `HASURA_ADMIN_SECRET` variable

# Frontend

<b>Pre-requisites:</b>

1. npm & node installed. I have npm version `8.5.5` and node version `v16.14.0`
2. The app starts in the port 3000, so make sure it's available.

<b>Start:</b>

1. Navigate to the frontend

```
cd frontend
```

2. Install its dependencies

```
npm i
```

3. Run the project

```
npm run dev
```

4. (Alternative to 3.) If you want to create a productive build and run it, just run

```
npm build && npm start
```

After a few seconds, you should be able to access the webapp at http://localhost:3000/

# Note:

Since the app uses web sockets, you should be able to opeen the same app in two different browser tabs, do things like creating tasks, editing/deleting them and see the changes in both tabs!
