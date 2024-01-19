# IP-HCK-P2-REPEAT (Server Side)

## Endpoints

List of Available Endpoints:

- `POST /login`
- `POST /register`
- `POST /google-login`
- `PATCH /update-profile/:id`
- `GET /cats`
- `POST /cats`
- `GET /cats/fav-cats`
- `DELETE /cats/fav-cats/:id`
- `GET /payments/midtrans/token`

### POST /login

#### Description

- Login with registered user account

#### Response

_200 - OK_

- Body
  ```json
  {
    "access_token": "string"
  }
  ```

_400 - Bad Request_

- Body

  ````json
   {
    "message": "Email is required"
   },
  OR

    {
    "message": "Password is required"
    }
    ```
  _401 - Unauthorized_

  ````

- Body

  ```json
  {
    "message": "Invalid email/password"
  }
  ```

### POST /register

#### Description

- Register new account

#### Response

_201 - CREATED_

- Body
  ```json
  {
    "id": "string",
    "email": "string"
  }
  ```

_400 - Bad Request_

- Body

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

### PATCH /update-profile/:id

#### Description

- Edit (patch) the username by id (must login first & current user login ownership)

#### Response

_200 - OK_

- Body
  ```json
  {
    "message": "Data updated"
  }
  ```

_404 - Not Found_

- Body

  ```json
  {
    "message": "Data not found"
  }
  ```

  _400 - Bad Request_

- Body
  ```json
  {
    "message": "Username is required"
  }
  ```

### GET /cats

#### Description

- Get the cats data

#### Response

_200 - OK_

- Body
  ```json
  [
    {
        "breeds": array,
        "id": integer,
        "url": "string",
        "width": integer,
        "height": integer,
    },
    ...
    ]
  ```

### POST /cats

#### Description

- Create an cats (must login first)

#### Response

_201 - CREATED_

- Body
  ```json
  {
    "message": "Success adding cat to favorite list"
  }
  ```

_400 - Bad Request_

- Body
  ```json
  {
    "message": "Failed adding cat to favorite list"
  }
  ```

-401 - Unauthorized\_

- Body

  ```json
  {
    "message": "Invalid token"
  }
  ```

  ### GET /cats/fav-cats

#### Description

- Get the cats data

#### Response

_200 - OK_

- Body

  ```json
  [
    {
        "id": integer,
        "imgUrl": string,
        "UserId": integer,
        "createdAt": date,
        "updatedAt": date
    },
    ...
    ]
  ```

- 401 - Unauthorized\_

- Body
  ```json
  {
    "message": "Invalid token"
  }
  ```

### DELETE /cats/fav-cats/:id

#### Description

- Delete an favorite cats by id (must login first)

#### Response

_200 - OK_

- Body

  ```json
  {
    "message": "Favorite cat deleted successfully"
  }
  ```

_404 - Not Found_

- Body

  ```json
  {
    "message": "Data not found"
  }
  ```

  ### GET /payments/midtrans/token

  #### Description

  - Get token for midtrans payment (must login first)

  #### Response

  _200 - OK_

  - Body

  ```json
  {
    "transaction_token": string,
    "orderId": string
  }
  ```