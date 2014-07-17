# regard-website

Website for regard

![build status](https://api.travis-ci.org/with-regard/regard-website.svg)

## Requirements

1. Install [Node.js](http://nodejs.org)
2. Install [ember cli](http://iamstef.net/ember-cli/)
```
npm install -g ember-cli
```

3. Install dependencies
```
npm install
bower install
```
4. Run gulp to start the development server
```
ember serve
```
5. Configure local dev values

Copy sample-config.json to development-config.json. You can find the values for the Github application [here](https://github.com/organizations/with-regard/settings/applications/).

## Organization

The marketing page at [withregard.io](http://withregard.io) lives in the `website` folder.
The ember app lives in the `app` folder.
Assets live in the public folder.

## Deployment

Anything that gets pushed to master will be built by travis and deployed to Azure websites.
