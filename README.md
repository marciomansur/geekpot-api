# geekpot-api
A simple API to list client permissions over geekpot methods

First, you need NodeJS installed on your computer.

To install the packages, type:

```
npm install
```

After everything is installed, you can run the application by typing:
```
npm run dev
```

To run tests, type:
```
npm test
```

There's no production or deploy rotine yet.

You'll first need to import the SQL in database folder.


## Endpoints

The API have secured endpoints (by authentication) and endpoints that doesn't need authentication.

All these endpoints need this configuration on headers:

```
Content-Type: application/json
```
### Endpoints without authentication

```
POST api/users/
{
    "name": string,
    "username": string,
    "password": string,
    "email": string,
    "admin": boolean (optional)
}
Creates a new user. If there's no admin flag as true, the user is a client.
```

```
POST api/users/auth
{
    "password": string,
    "email": string
}
Authenticates the user and gives a token that is used as authentication.
This endpoint gives you the user data and a token.
```

### Endpoints with authentication

These endpoints, you must put the token on headers to go on:

```
Content-Type: application/json
Authorization: Bearer <authentication token>
```

```
GET api/users
Search all the users on database (admins only)
```

```
PUT api/users/{id}
{
    "name": string (optional),
    "username": string (optional),
    "password": string (optional),
    "email": string (optional),
    "admin": boolean (optional)
}
Updates a user data (admins only)
```

```
DELETE api/users/{id}
Deletes a user from database (admins only)
```

## License
MIT
