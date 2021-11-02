import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Table from '../../components/Table/Table';
import { fetchTasks } from '../../api';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  useEffect(async () => {
    const tasksArr = await fetchTasks(token);
    setTasks(tasksArr.data);
  }, []);

  return (
    <>
      <Header />
      <Table tasks={tasks} />
    </>
  );
}
