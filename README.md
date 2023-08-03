# flexml-sample
## Sample FlexML application for CarrierX
A pair of FlexML handlers that define the responses to a received phone call and possible caller DTMF.

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

# Proof of Concept
The purpose of the proof of concept is to show that FlexML can provide the platform for {_prospect_} to quickly build {_application_} in a secure, scalable manner.

## Resources
CarrierX will commit one full-time resource to work remotely or onsite, at {_prospect_}'s discretion, to assist the {_prospect_} team building a sample application integrating FlexML into the core of the application. CarrierX resource will be available to educate and assist other team members with questions.

{_prospect_} will provide one development team member to build the sample application and integrate FlexML. Other {_prospect_} team members are welcome to work on the application and familiarize themselves with FlexML.

Upon completion of the sample application, CarrierX's team and {_decision maker_}, {_manager_}, {_developer_} from {_prospect_} will meet to demonstrate the sample application, review the development process, and discuss the success of the proof of concept.  The application will be available for three days prior to the meeting for {_prospect_}'s team to evaluate.

## Success Criteria for this Proof of Concept
1. Demonstrate, in {_prospect_} environment, FlexML's ability to:
    - receive a phone call and programmatically generate a response
    - make available the calling phone number, demonstrated by reading the phone number to the caller
    - lookup phone number details including the name of a caller, demonstrated by telling the caller their own name.
    - accept caller DTMF input and respond to specific input, demonstrated by telling the caller a joke if they press '9' anytime during the call.

