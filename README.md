# API Rest and JWT Authentication

### 🖥 Setup 
- Remember to change the environment variables before running.
```
PORT="your port"
MONGO_CNN="your mongo db connection"
SECRET_KEY="your secret key" 
```
- Install all necessary dependencies
```
npm i
```
- Start the server
```
npm start
```
### 🌐 Endpoints

The API provides the following endpoints:

| Method | Endpoint       | Description                            | Auth Required |
|:-------|:----------------|:----------------------------------------|:--------------|
| `POST` | `/register`     | Register a new user                     | ❌ |
| `POST` | `/auth`         | Log in an existing user                 | ❌ |
| `GET`  | `/profile`      | Get the current user's profile          | ✅ |
| `GET`  | `/users`        | Get a list of all users                 | ✅ |
| `GET`  | `/users/:id`    | Retrieve a specific user by their ID    | ✅ |
| `POST` | `/users`        | Create a new user                       | ✅ |
| `PUT`  | `/users/:id`    | Update an existing user by their ID     | ✅ |
| `DELETE` | `/users/:id`  | Delete an existing user by their ID     | ✅ |
      
### 🛠 [Stack Used](techstack.md)
