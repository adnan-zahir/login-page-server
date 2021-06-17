const express = require('express');
const cors = require('cors');
const hat = require('hat');

const app = express();
const port = process.env.PORT || 4000;

const registeredUsers = [
  {
    username: 'admin',
    password: 'admin',
    email: 'admin@mail.com',
    token: '134vb9qwye2',
  },
];

const checkRegistered = ({ username, password }) => {
  const foundUser = registeredUsers.find(
    (user) => user.username === username && user.password === password
  );

  if (foundUser) return foundUser.token;
  else return undefined;
};

const checkAvailable = ({ username, password, email }) => {
  console.log(`Username : ${username}, Email : ${email}`);
  const foundUsername = registeredUsers.find(
    (user) => user.username === username
  );

  const foundEmail = registeredUsers.find((user) => user.email === email);

  console.log(foundUsername, foundEmail);

  if (!foundUsername && !foundEmail) return true;
  else return false;
};

app.use(cors());
app.use(express.json());

app.post('/login', (req, res) => {
  console.log('Login request received');
  console.log(req.body);

  const userToken = checkRegistered(req.body);
  console.log(userToken);

  if (userToken !== undefined) res.json(userToken);
  else res.json('');
});

app.post('/register', (req, res) => {
  console.log('Register request received');
  console.log(req.body);

  const userAvailable = checkAvailable(req.body);
  console.log(userAvailable ? 'Available' : 'Not available');

  if (!userAvailable) {
    res.send({ statusMessage: 'UNAVAILABLE' });
    return;
  }

  const newUser = {
    ...req.body,
    token: hat(),
  };

  registeredUsers.push(newUser);
  console.log(registeredUsers);
  res.send({ statusMessage: 'SUCCESS' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});