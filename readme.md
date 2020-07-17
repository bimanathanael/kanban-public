# Kanban Board

Kanban Board App is an application to manage your team tasks with 4 different stages/categories . This app has:
* RESTful endpoint for Knaban CRUD Operation
* Used Technology : 
    - Express Js, 
    - Sequelize, 
    - Postgres, 
    - Json Web Token, 
    - Bcrypt, 
    - Vue JS
    - Google Authentication, 
    - Mailgun API
* JSON Formated Response


## RESTful endpoints

### Global endpoints

_Response (401 - Unauthorized)_
```
{
  "message": "Not authroized to do the actions"
}
```

_Response (500 - Error)_
```
{
  "message": "internal server error"
}
```


### GET /tasks
> Get all tasks base on selected task Id

_Request Header_
```
{
    "access_token": "<access_token JWT>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
    {
        "id": "<show id data>",
        "title": "<show title data>",
        "category": "<show category data>",
        "UserId": "<show UserId data>",
        "createdAt": "<show createdAt data>",
        "updatedAt": "<show updatedAt data>"
    },
    {
        "id": "<show id data>",
        "title": "<show title data>",
        "category": "<show category data>",
        "UserId": "<show UserId data>",
        "createdAt": "<show createdAt data>",
        "updatedAt": "<show updatedAt data>"
    }
]
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
_Response (401 - Not Found)_
```
{
  "message": "data not found"
}
```


### GET /tasks/:id
> Get selected tasks base on selected task

_Request Header_
```
{
    "access_token": "<access_token JWT>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "id": "<show id by requested id>",
    "title": "<show title by requested id>",
    "category": "<show category by requested id>",
    "UserId": "<show UserId by requested id>",
    "createdAt": "<show createdAt by requested id>",
    "updatedAt": "<show updatedAt by requested id>"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```

_Response (404 - Not Found)_
```
{
  "message": "data not found"
}
```

### POST /tasks
> Create new tasks 
On this method, also hit mailGun API to perform send email after new Task created.

_Request Header_
```
{
    "access_token": "<access_token JWT>"
}
```

_Request Body_
```
{
  "title": "<title to get insert into>",
  "category": "<category to get insert into>",
}
```

_Response (201)_
```
{
  "id": <given id by system>,
  "title": "<title to get insert into>",
  "category": "<category to get insert into>",
  "UserId": "<UserId from login user>",
  "createdAt": "<createdAt to get insert into>",
  "updatedAt": "<updatedAt to get insert into>"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Please Fill All Fields"
}
```


### PUT /tasks/:id
> Update existing task on selected task Id

_Request Header_
```
{
    "access_token": "<access_token JWT>"
}
```

_Request Body_
```
{
  "title": "<title to get update into>",
  "category": "<category to get update into>",
}
```

_Response (200)_
```
{
    "id": "<id to get update into>",
    "title": "<title to get update into>",
    "category": "<category to get update into>",
    "UserId": "<UserId from login user>",
    "createdAt": "<createdAt to get update into>",
    "updatedAt": "<updatedAt to get update into>"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Please Fill All Fields"
}
```

_Response (404 - Not Found)_
```
{
  "message": "data not found"
}
```

### DELETE /tasks/:id
> Delete task for Selected Id

_Request Header_
```
{
    "access_token": "<access_token JWT>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "id": "<contain id that deleted>",
    "title": "<contain title that deleted>",
    "category": "<contain category that deleted>",
    "UserId": "<contain UserId that deleted>",
    "createdAt": "<contain createdAt that deleted>",
    "updatedAt": "<contain updatedAt that deleted>"
}
```

_Response (404 - Not Found)_
```
{
  "message": "data not found"
}
```


### POST /login
> Login User

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": "<email to get login>",
  "password": "<password to get login>"
}
```

_Response (200)_
```
{
    "access_token": "<access_token JWT>"
    "id": "<user id>"
}
```

_Response (404 - Not Found)_
```
{
    "message": "data not found"
}
```



### POST /register
> Register User

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": "<email to get register into>",
  "password": "<password to get register into>"
}
```

_Response (201)_
```
{
    "id": "<id given by system>",
    "email": "<contain email result register>",
    "password": "<contain hashed password result register>",
    "organization": "<value setted to Hacktiv8>",
    "updatedAt": "<contain updatedAt result register>",
    "createdAt": "<contain createdAt result register>"
}
```

_Response (404 - Not Found)_
```
{
  "message": "data not found"
}
```


### POST /googleSignin
> Login User with Google Sign in, if not registered, then do register user aswell

_Request Header_
```
not needed
```

_Request Body_
```
{
  "id_token" : "<id_token from google>" 
}
```

_Response (200)_
```
{
    "access_token": "<access_token JWT>"
}
```

_Response (404 - Not Found)_
```
{
    "message": "data not found"
}
```

