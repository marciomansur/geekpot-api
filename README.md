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

You'll first need to import the SQL in database folder.


## Endpoint


`POST api/users/
{
    "name": string,
    "username": string,
    "password": string,
    "email": string,
    "admin": boolean (optional)
}
`

`POST api/users/auth
{
    "password": string,
    "email": string
}
`

`GET api/users`

`PUT api/users/{id}
{
    "name": string (optional),
    "username": string (optional),
    "password": string (optional),
    "email": string (optional),
    "admin": boolean (optional)
}
`

`DELETE api/users/{id}`
