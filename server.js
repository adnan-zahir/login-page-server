const express = require('express');
const cors = require('cors');
const hat = require('hat');

const app = express();
const port = process.env.PORT || 4000;

// REGISTERED USERS ARRAY
const registeredUsers = [
  {
    username: 'admin',
    password: 'admin',
    email: 'admin@mail.com',
    token: '134vb9qwye2',
    mobile_no: '0888-XXXX-XX99',
    full_name: 'Admin One',
    address: 'Management St. 48-D',
    city: 'New York City',
  },
];

// CHECKS
class Check {
  static isRegistered({ username, password }) {
    const foundUser = registeredUsers.find(
      (user) => user.username === username && user.password === password
    );

    return foundUser ? foundUser.token : undefined;
  }

  static isAvailable({ username, email }) {
    console.log(`Username : ${username}, Email : ${email}`);
    const foundUsername = registeredUsers.find(
      (user) => user.username === username
    );

    const foundEmail = registeredUsers.find((user) => user.email === email);

    console.log(foundUsername, foundEmail);

    return !foundUsername && !foundEmail;
  }

  static userInfo(token) {
    console.log(`Token : ${token}`);
    const foundUser = registeredUsers.find((user) => {
      return user.token === token;
    });

    return foundUser ? foundUser : undefined;
  }
}

// MIDDLEWARES
app.use(cors());
app.use(express.json());

// ROUTES
// LOGIN
app.post('/login', (req, res) => {
  console.log('Login request received');
  console.log(req.body);

  const token = Check.isRegistered({
    username: req.body.username,
    password: req.body.password,
  });
  console.log(token);

  res.send(
    token !== undefined
      ? { statusMessage: 'SUCCESS', token }
      : { statusMessage: 'UNREGISTERED' }
  );
});

// REGISTER
app.post('/register', (req, res) => {
  console.log('Register request received');
  console.log(req.body);

  const userAvailable = Check.isAvailable({
    username: req.body.username,
    email: req.body.email,
  });
  console.log(userAvailable ? 'Available' : 'Not available');

  if (!userAvailable) {
    res.send({ statusMessage: 'UNAVAILABLE' });
    return;
  }

  const newUser = {
    ...req.body,
    token: hat(),
    mobile_no: '',
    full_name: '',
    address: '',
    city: '',
  };

  registeredUsers.push(newUser);
  console.log(registeredUsers);
  res.send({ statusMessage: 'SUCCESS' });
});

// GET CREDENTIALS
app.post('/credentials', (req, res) => {
  const { token } = req.body;
  console.log('Getting credentials');
  const credentials = Check.userInfo(token);
  console.log(credentials ? credentials : 'Not Found');

  res.send(credentials ? credentials : { statusMessage: 'UNREGISTERED' });
});

// SERVER LISTEN
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
