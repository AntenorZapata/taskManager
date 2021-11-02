import axios from 'axios';

const loginUrl = 'http://localhost:3001/api/v1/user/login';
const tasksUrl = 'http://localhost:3001/api/v1/task';

const config = {
  Headers: {
    'Content-Type': 'application/json',
  },
};

export const login = (user) => axios.post(loginUrl, user, config);

export const fetchTasks = (token) => axios.get(tasksUrl, { headers: { 'Content-Type': 'application/json', authorization: `${token}` } });
