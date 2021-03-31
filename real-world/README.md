<h1 align="center">🚀 Twilio Liftoff: Real World 🚀</h1>

This directory has all the example code from the Twilio Liftoff Real World webinar.

## Security

The file `security.js` shows two different ways of protecting a webhook endpoint by validating the Twilio request signature.

You can run this application by changing into the `real-world` directory and installing the dependencies:

```bash
cd real-world
npm install
```

Then run the server with:

```bash
node security.js
```

The application will start on `localhost:3001` and you can make requests from Twilio to `/messages` or `/messages2`. The requests need to come from Twilio as they will need to be signed!

### Environment variables

Note that in `security.js` the `TWILIO_AUTH_TOKEN` is loaded from an environment variable. In development we use [dotenv](https://www.npmjs.com/package/dotenv) to load environment variables on a project by project basis. You can set your environment variables for this project by copying the `.env.example` file to `.env` and filling in the gaps.

```bash
cp .env.example .env
```

You will need the `TWILIO_AUTH_TOKEN` environment variable for `security.js` and the others for `lookup.js`.

## Dynamic responses to incoming requests

The file `lookup.js` shows different ways of taking user input and dynamically looking up information before building a response to the user.

Run this app with:

```bash
node lookup.js
```

Hook your Twilio number up to send webhook requests to the `/messages` endpoint and the application will look up your order in the database. The API that backs this is part of the `owl-shoes-api` project that is in this directory. See below for [running the `owl-shoes-api`](#running-owl-shoes-api).

Once you are running the `owl-shoes-api` project, set the `API_URL` environment variable to the URL where the project is running (e.g. `localhost:3000/shoes`).

## Triggering Notifications

This directory also includes a Twilio Functions project. Twilio Functions allows you to run JavaScript in Twilio's infrastructure and it is perfect for triggering things like scripts that send notifications. The Function that sends out the notifications is in `owl-shoes-api/functions/send-notifications.js`.

## Running `owl-shoes-api`

Change into the `owl-shoes-api` directory and install the dependencies.

```bash
cd owl-shoes-api
npm install
```

Copy the `.env.example` file to `.env` and fill in the variables.

Run the application with:

```bash
npm start
```

The `owl-shoes-api` will start on `localhost:3000` with two endpoints:

1. `/shoes` - This is a fake API to take the place of a database of orders. If you set the `MY_PHONE_NUMBER` environment variable in `.env` then you will be able to lookup orders based on your phone number.
2. `/send-notifications` - This is the function you can trigger to inspect the database and send notifications to your users.
