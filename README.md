To run existing builds of this and all surrounding microservices using Docker, please see the [ASC-All repository readme](https://xsc.visualstudio.com/ASC/_git/ASC-All?path=%2FREADME.md&version=GBmaster&_a=contents).

## How to run it

To run it simply do:

```bash
npm install
npm start
```

The app will run at [http://localhost:9000](http://localhost:9000).

## How to test it

```bash
npm run test
```

or you can run watch:

```bash
npm run test -- --watch
```

## How to build it

You need to build the project first before Cordova:

```
npm run build
```

## Build the mobile app with Cordova

- [Install Cordova](https://cordova.apache.org/docs/en/latest/guide/cli/index.html#installing-the-cordova-cli):

```bash
npm install -g cordova
```

Add a platform and then run it on a local emulator.

For Android:

```bash
cordova platform add android
cordova run android
```

For iOS:

```bash
cordova platform add ios
cordova run ios
```

## How to use validation for redux-form

```react
import { createValidator, required, email } from '../utils/validation';

const validate = createValidator({
  email: [required, email],
});

@reduxForm({
  form: 'ValidateForm',
  validate
})
```

## How to do Integration Tests

end to end tests are in 

```bash
cd tests/integration
```

use 
```bash
npm install 
```
to install the required node_modules
if npm fiber fails (it did for me on mac) then try the steps here:
https://github.com/laverdet/node-fibers
then just do 
```bash
npm install fibers --save-dev
```
on mac osx you might need to update xcode to the latest then reinstall command line tools:
http://railsapps.github.io/xcode-command-line-tools.html

if everything succeeds you should be able to start selenuim server
```bash
npm run start-web
```
once selenium is running you can do
```bash
npm run test:web
```
that will run all the test in src/features/web

test suites exist for various areas
```bash
npm run test:registration
npm run test:navigation
npm run test:contact
npm run test:login
```
## How to run App Integration Test

```bash
npm run start-app
```
that will start appuim then
```bash
npm run test:ios
```
this assumes you already built the apps with cordova


