# flexml-sample
## Sample FlexML application for CarrierX
A pair of FlexML handlers that defines the responses to a received phone call and possible caller DTMF.

One handler at `/api/flexml` will:
- welcome the caller
- read back the caller's phone number
- announce the name of the caller
- tell the caller they can press '9' to hear a joke

If the caller presses '9', the second handler at `/api/flexml/joke` is called and will:
- tell the caller a joke
- play a rimshot sound effect

## Installation
Clone the repository
```
git clone https://github.com/schlameel/flexml-sample.git
```
Install Node.js packages
```
cd flexml-sample
npm install
```
Create `.env` from sample file
```
cp dotenv.sample .env
```
Edit `.env` and set `ACCESS_TOKEN` to your CarrierX access token

Transpile TypeScript to Javascript
```npm run compile```

## Run the application
```npm run start```

## Test
Ensure the application is running.  In `.env`, ensure `TEST_PROTOCOL` and `TEST_DOMAIN` are set appropriately. For `TEST_PROTOCOL`, `https` for ngrok, `http` for localhost. For `TEST_DOMAIN`, set the FQDN or if testing locally, identify the appropriate port number if it is not 80, such as `localhost:3000`.
```npm test```
