# Frontmen Applicant Boilerplate
This Boilerplate is used as a base for Frontmen Applicants to build awesome Frontend Cases to demonstrate their awesome skills!

The Boilerplate consist of a MySQL Database that is managed via Sequelize and an API-Gateway built with NodeJS and Express. The API-Gateway has some standard functionality like:
- Database Connector
- JWT Authentication
- Daily rotating log files
- Healtcheck
- Caching

*Version 0.2.0 - MySQL
Released Febuary 2nd, 2018*

## Install Guide
To get this Boilerplate up & running you need to have some components installed first.

### Dependencies
1. NodeJS (preferably the version recommended for most users)
1. MySQL (e.g. via a package like XAMPP or WAMP or you can use Docker - https://dzone.com/articles/docker-for-mac-mysql-setup)
1. NPM packages (also see package.json for versions);
    1. Sequelize installed globally (https://www.npmjs.com/package/sequelize)
    2. Sequelize-cli installed globally (https://www.npmjs.com/package/sequelize-cli)
    3. MySQL2 installed globally (https://www.npmjs.com/package/mysql2)
    4. Optional: Nodemon installed globally (https://www.npmjs.com/package/nodemon)

### Installation
1. Install the dependencies
1. Run `$ npm install`
1. Make sure the MySQL Server is running
1. Alter the database settings in the config-folder for your environment. This Boilerplate uses environment variables (NODE_ENV). When no NODE_ENV is set, the environment variable 'dev' is used.
1. Create a Database named: frontmen_boilerplate_v1 or be lazy and let Sequelize-CLI do it for you. Run `$ sequelize db:create frontmen_boilerplate_v1 --env=autodetect` in your terminal. Make sure the database user in the config has sufficient rights for this database.
1. To create the Database schema, simply run `$ sequelize db:migrate --env=autodetect`.
1. Let's add some data in the Database by running `$sequelize db:seed:all --env=autodetect`.
1. Start the server by running `$ node index.js` from the root of the project or use nodemon to use features like livereload.
1. Or run `$ nodemon` from the root of the project to enable this feature.

*Note: A default admin user (as specified in the config) is created if it doesn`t exist in the database table Users.*

## Functionalities
The API-Gateway offers the following default functionalities & API's
- Authentication based on JWT (JSON Web Tokens) with PassportJS
- MySQL Interaction via SequelizeJS
- Database Schema & Models via code
- Protected Endpoints & Interceptor managed in config/config.js
- Healthcheck API
- Login & Verify Login API
- Caching Engine & Cache Clear API
- Myprofile API based on JWT-Token from loggedin User

## Postman
We have included both an Environment and Collection for you to use in the _postman folder. You need to import both the environment and Collection.
After a login, the JWT-Token is stored in an environment variable called `TOKEN`. This variable is automatically updated for the API Requests to protected endpoints.
The `HOST` variable is used to define the URL where your server is running

## API's
The API-Gateway has a number of default API's that can be used:

#### Healtcheck
**Description:** An API that can be used to determine if the Gateway is operational.<br />
**Accessibility:** Public<br />
**URL:** localhost:3000/healthcheck<br />
**Method:** GET<br />
**Request headers:** none<br />
**Example result success:**<br />
```javascript
{
    "status": "OK",
    "timestamp": 1517426412808
}
```
#### Authentication
For authenticating a user and verifying a JWT-Token there are 2 API's:

------------
##### Login
**Description:** An API that can be used to log a user in.<br />
**Accessibility:** Public<br />
**URL:** localhost:3000/login<br />
**Method:** POST<br />
**Request headers:** <br />
Content-Type: application-json<br />
**Body:**<br />
```javascript
{
    "username" : "your_username or your_email",
    "password" : "your_password"
}
```
**Example result success:** <br />
```javascript
{
    "token": "eyJhbGciOiJIUzI1NiIsInwefwefMSwiZ3VpZCI6IjQ0MDdmOTNjLWRjMDEtNDQ2My1hMzhmwefwefLWUxZmJiMWQzMTRmOCIsImV4cCI6MTUxNzU3ODM2NCwiZW1haWwiOiJuaWVrLmhlZXplbWFuc0Bmcm9udG1lbi5ubCIsImlhdCI6MTUxNzUwefwef3Mjk2NH0.Ykirzr4b7GdsIPGV6PDjCpFHOAqohKazJl5pWJFw",
    "user": {
        "id": 1,
        "guid": "4407xxxx-dc01-xxxx-a38f-e1fbb1xxxxxx",
        "firstname": "Frontmen",
        "lastname": "Eindhoven",
        "username": "admin",
        "email": "niek.heezemans@frontmen.nl",
        "status": "active",
        "createdAt": "2018-02-02T11:46:39.000Z",
        "updatedAt": "2018-02-02T11:46:39.000Z",
        "Roles": [
            {
                "id": 2,
                "name": "Administrator",
                "isAdmin": true,
                "createdAt": "2018-02-02T11:46:37.000Z",
                "updatedAt": "2018-02-02T11:46:37.000Z",
                "UserRoles": {
                    "RoleId": 2,
                    "UserId": 1,
                    "createdAt": "2018-02-02T11:46:39.000Z",
                    "updatedAt": "2018-02-02T11:46:39.000Z"
                }
            }
        ],
        "Branches": [
            {
                "id": 3,
                "name": "Frontmen - Eindhoven",
                "city": "Eindhoven",
                "createdAt": "2018-02-02T11:46:37.000Z",
                "updatedAt": "2018-02-02T11:46:37.000Z",
                "UserBranches": {
                    "BranchId": 3,
                    "UserId": 1,
                    "createdAt": "2018-02-02T11:46:39.000Z",
                    "updatedAt": "2018-02-02T11:46:39.000Z"
                }
            }
        ]
    }
}
```
**Example result error wrong no username and/or password:** <br />
```javascript
{
    "err": "Please provide a username and password"
}
```
**Example result error wrong username:** <br />
```javascript
{
    "err": "User not found"
}
```
**Example result error wrong password:** <br />
```javascript
{
    "err": "Wrong password"
}
```
------------

##### Verify Login
**Description:** An API that can be used to verify if a JWT-Token is valid.<br />
**Accessibility:** Public but it would be better if this was private (hint ;))<br />
**URL:** localhost:3000/login/verify<br />
**Method:** GET<br />
**Request headers:**<br />
Content-Type: application-json<br />
Authorization: Bearer *[JWT-Token_From_Login]*<br />
**Example result success:**<br />
```javascript
{
    "msg": "Authorized"
}
```
**Example result error:**<br />
```javascript
{
    "err": "Unauthorized"
}
```
#### Clear Cache

**Description:** An API that can be used to clear the cache of the Gateway.<br />
**Accessibility:** Private and needs admin-rights<br />
**URL:** localhost:3000/cache/clear<br />
**Method:** GET <br />
**Request headers:**<br />
Content-Type: application-json<br />
Authorization: Bearer *[JWT-Token_From_Login]*<br />
**Example result success:**<br />
```javascript
{
    "status": "OK",
    "msg": "Cache cleared"
}
```
**Example result error unauthorized:**<br />
```javascript
{
    "err": "Unauthorized"
}
```
**Example result error no admin rights:**<br />
```javascript
{
    "err": "Insufficient rights"
}
```
#### User Profiles

##### My Profile
**Description:** Get the Profile of the loggedin User<br />
**Accessibility:** Private<br />
**URL:** localhost:3000/api/v1/users/myprofile<br />
**Method:** GET<br />
**Request headers:**<br />
Content-Type: application-json<br />
Authorization: Bearer *[JWT-Token_From_Login]*<br />
**Example result success:**<br />
```javascript
{
    "user": {
        "firstname": "Frontmen",
        "lastname": "Eindhoven",
        "email": "niek.heezemans@frontmen.nl",
        "username": "admin",
        "status": "active",
        "Roles": [
            {
                "id": 2,
                "name": "Administrator",
                "isAdmin": true,
                "createdAt": "2018-02-02T11:39:54.554Z",
                "updatedAt": "2018-02-02T11:39:54.554Z",
                "UserRoles": {
                    "RoleId": 2,
                    "UserId": 1,
                    "createdAt": "2018-02-02T11:39:55.000Z",
                    "updatedAt": "2018-02-02T11:39:55.000Z"
                }
            }
        ],
        "Branches": [
            {
                "id": 3,
                "name": "Frontmen - Eindhoven",
                "city": "Eindhoven",
                "createdAt": "2018-02-02T11:39:54.564Z",
                "updatedAt": "2018-02-02T11:39:54.564Z",
                "UserBranches": {
                    "BranchId": 3,
                    "UserId": 1,
                    "createdAt": "2018-02-02T11:39:55.000Z",
                    "updatedAt": "2018-02-02T11:39:55.000Z"
                }
            }
        ]
    }
}
```
**Example result error unauthorized:**<br />
```javascript
{
    "err": "Unauthorized"
}