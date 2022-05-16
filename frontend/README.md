# Frontend

<b>Pre-requisites:</b>

1. npm & node installed. I have npm version `8.5.5` and node version `v16.14.0`
2. The app starts in the port 3000, so make sure it's available.

<b>Start:</b>

Assuming you are in the `/frontend` folder

1. Set up the required environment variables. To do so, you'll need to create an `.env` file and paste the content of `.env.sample` into it.

```
touch .env && cp .env.sample .env
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
npm run build && npm start
```

After a few seconds, you should be able to access the webapp at http://localhost:3000/
