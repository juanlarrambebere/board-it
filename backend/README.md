# Backend

## Development

<b>Pre-requisites:</b>

1. Docker. To run hasura you'll need docker up & running in your compouter.
2. Port 8080 available. Hasura runs in the port 8080, so make sure the port is available.

<b>Start:</b>
Assuming you are in the `/backend` folder

1. Set up the required environment variables for Hasura. To do so, you'll need to create an `.env` file and paste the content of `.env.sample` into it.

```
touch .env && cp .env.sample .env
```

2. Run hasura vía docker-compose.

```
docker-compose up
```

After ~10-20 seconds Hasura's engine should start and you should be able to entre its console at http://localhost:8080

<b>In production, metadata and migrations are applied automatically when the application starts, though in development they don't. This can be done but configuring it is not trivial so I decided to skip it for now. Here are the steps to make it work:</b>

3. If it's the first time you run the backend</b>, you'll need to attach the database to Hasura's engine. Don't worry, the docker-compose you already run starts a Postgres image, so attaching the database is pretty straightforward.

If it's not the first time, then you can skip this step and jump directly to 4.

- Access to http://localhost:8080/console/data/manage/connect and copy the setup from the image
  <img width="1225" alt="image" src="https://user-images.githubusercontent.com/18520314/168517793-b07cfd3a-1d00-421e-9b0c-29bb11537c09.png">

Basically you'll need to set:

- database name: defualt
- Connect Database Via > Environment Variable: PG_DATABASE_URL.

4. Apply all the migrations and metadata.

```
hasura migrate apply
```

You'll be asked for confirmation, just press enter.

```
hasura metadata apply
```

In [this loom](https://www.loom.com/share/356de55cf06844d0aac147547e639fe9) I'll walk you through the steps described before.

Note: The first time you access, Hasura will ask for the admin secret. You'll find it in the `.env.sample` under the `HASURA_GRAPHQL_ADMIN_SECRET` variable
