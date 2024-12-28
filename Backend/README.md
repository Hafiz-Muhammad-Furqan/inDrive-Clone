# API Documentation

## User Registration

### POST /users/register

Register a new user in the system.

#### Request Body

```json
{
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "password": "string"
}
```

#### Required Fields

- `fullname.firstname`: User's first name (minimum 3 characters)
- `fullname.lastname`: User's last name (minimum 3 characters)
- `email`: Valid email address
- `password`: Password (minimum 6 characters)

#### Validations

- `fullname.firstname`: Must be at least 3 characters long
- `fullname.lastname`: Must be at least 3 characters long
- `email`: Must be a valid email address
- `password`: Must be at least 6 characters long

#### Response Status Codes

| Status Code | Description                      |
| ----------- | -------------------------------- |
| 201         | User successfully created        |
| 400         | Bad request - Invalid input data |
| 409         | Conflict - Email already exists  |
| 500         | Internal server error            |

#### Example Request

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com",
  "password": "password123"
}
```

#### Example Success Response

```json
{
  "status": "success",
  "message": "User registered successfully",
  "data": {
    "id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com"
  }
}
```