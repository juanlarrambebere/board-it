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
