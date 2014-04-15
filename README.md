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

## Environment variables

You will need to configure the following environment variables:
```
GITHUB_APP_ID
GITHUB_APP_SECRET
MONGODB_CONNECTION_STRING
```

## Deployment

Anything that gets pushed to master will be deployed. Azure runs `gulp build` which outputs to the *dist* directory. Make sure that the gulp build task exits and doesn't watch any files or start any servers.