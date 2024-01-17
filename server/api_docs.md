# IP-HCK 65 - The Cat Api

## Models

### User

```md
- username : string, required
- email : string, required, unique, isEmail
- password : string, required
```

### Cats

```md
- imageUrl : string, required,
- UserId : integer
```

## Endpoints

List of available endpoints:

- `POST /register`
- `POST /login`
- `POST /google-login`
- `PATCH /update-profile/:id`
- `DELETE /fav-cats/:id`
- `GET /cats`

Routes below need authentication:

- `POST /cats`
- `GET /fav-cats`

## 1. POST /register

Request

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

Response (201 - Created)

```json
{
  "id": "integer",
  "email": "string"
}
```

Response (400 - Bad Request)

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Password is required"
}
```

## 2. POST /login

Request

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

Response (200 - OK)

```json
{
  "access_token": "string"
}
```

Response (400 - Bad Request)

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

Response (401 - Unauthorized)

```json
{
  "message": "Invalid email/password"
}
```

## 3. POST /google-login

Request

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

Response (200 - OK)

```json
{
  "google_token": "string"
}
```

Response (400 - Bad Request)

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

Response (401 - Unauthorized)

```json
{
  "message": "Invalid email/password"
}
```

## 4. PATCH /update-profile/:id

Description:

- Update user profiles, return updated data

Request

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

- params:

```json
{
  "id": "integer"
}
```

- body:

```json
{
  "username": "Any username"
}
```

Response (200 - OK)

```json
{
  "message": "Data Updated"
}
```

Response (400 - Bad Request)

```json
{
  "message": "Username is required"
}
```

Response (404 - Not Found)

```json
{
  "message": "Data not found"
}
```

Response (403 - Not Found)

```json
{
  "message": "You're not authorized"
}
```

## 5. GET /cats

Description:

- Fetch all cats from 3rd party API

Request

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

Response (200 - OK)

```json
    "data": [
        {
            "id": "m4",
            "url": "https://cdn2.thecatapi.com/images/m4.jpg",
            "width": 500,
            "height": 667
        },
        {
            "id": "18s",
            "url": "https://cdn2.thecatapi.com/images/18s.gif",
            "width": 500,
            "height": 206
        },
        {
            "id": "8r0",
            "url": "https://cdn2.thecatapi.com/images/8r0.jpg",
            "width": 640,
            "height": 480
        },
        {
            "id": "bbf",
            "url": "https://cdn2.thecatapi.com/images/bbf.jpg",
            "width": 400,
            "height": 265
        },
        ...
]
```



## 6. DELETE /fav-cats/:id

Description:

- Delete Fav Cats
- Authorization : Users

Request

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

- params:

```json
{
  "id": "integer"
}
```

Response (200 - OK)

```json
{
  "message": "Favorite cat deleted successfully"
}
```

Response (404 - Not Found)

```json
{
  "message": "Favorite cat not found or you are not authorized"
}
```

Response (403 - Not Found)

```json
{
  "message": "You're not authorized"
}
```