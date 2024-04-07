import React from 'react';
import logo from './logo.svg';
import './App.css';

interface Task {
  id: number,
  operation: string,
  left: number,
  right: number,
}

interface SubmittedTask {
  id: number,
  operation: string,
  left: number,
  right: number,
  result: string
}

function App() {
  const [dashboardData, setDashboardData] = React.useState<Task[]>([]);
  const [submittedTasks, setSubmittedTasks] = React.useState<SubmittedTask[]>([]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      fetch("/tasks")
        .then((res) => res.json())
        .then((data) => setDashboardData(data));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      fetch("/tasks/submitted")
        .then((res) => res.json())
        .then((data) => setSubmittedTasks(data));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <h1>Number of requests for new task:</h1>
      <h3>{ !dashboardData ? "Loading..." : dashboardData.length }</h3>
      <h1>Number of requests to submit endpoint:</h1>
      <h3>{ !submittedTasks ? "Loading..." : submittedTasks.length }</h3>
      <h1>Number of correct submissions:</h1>
      <h3>{submittedTasks.filter(task => task.result === 'Correct').length}</h3>
    </div>
  );
}

export default App;
