# regard-website

Website for regard

## Requirements

1. Install [Node.js](http://nodejs.org)
2. Install [gulp](http://gulpjs.com/)
```
npm install -g gulp
```

3. Install dependencies
```
npm install
```
4. Run gulp to start the development server
```
gulp
```
5. Configure local dev values
```
GITHUB_APP_ID:
GITHUB_APP_SECRET:
```
You can get these values from the GitHub account settings for Regard

## Organization

Everything is in one repository for the moment (to make authentication simpler).

The project page at [withregard.io](http://withregard.io) lives in the `website` folder.
The developer portal lives in the `portal` folder.
The api for the developer portal lives in the `api` folder. 

Each of these exports an express app which is loaded by `server.js` in the root. 

## Deployment

Anything that gets pushed to master will be deployed. Azure runs `gulp build` which outputs to the *dist* directory. Make sure that the gulp build task exits and doesn't watch any files or start any servers.
