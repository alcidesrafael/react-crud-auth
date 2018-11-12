# REACT-CRUD-AUTH

This project was built for a job challenge, using:

- React
- Redux
- Redux-Thunk
- Redux-Form
- React-Router
- Axios
- Fetch data from the backend REST API (NodeJS)
- Material-UI

## Installation

### Running locally

**Requirements:** NodeJS. Postman for tests.

1. Clone this repository
2. Run `$ npm install` in the backend directory
3. Run `$ npm install` in the frontend directory
4. Rename the `env.example` file in frontend directory to `.env` with your environment variables

```js
// frontend/.env example file

REACT_APP_AUTH_SERVER=http:\\localhost:3000\auth
REACT_APP_USER_SERVER=http:\\localhost:3000\users
}
```

5. Start the server using `$ node server` in the backend directory
6. Start the application using `$ npm start` in the frontend directory
7. **Attention**: both server and application will try to run on port 3000
8. To log in you can use `email: admin@mail.com, password: 123456` or any other user from the backend/database.json
