import axios from 'axios';

const loginUrl = 'http://localhost:3001/api/v1/user/login';

const config = {
  Headers: {
    'Content-Type': 'application/json',
  },
};

const login = (user) => axios.post(loginUrl, user, config);

export default login;
