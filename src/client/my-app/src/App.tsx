import React from 'react';
import './App.css';
import Task from './models/task';
import SubmittedTask from './models/submittedTask';
import DashboardCard from './components/DashboardCard';

function App() {
  const [dashboardData, setDashboardData] = React.useState<Task[]>([]);
  const [submittedTasks, setSubmittedTasks] = React.useState<SubmittedTask[]>([]);

  const totalResults = submittedTasks.length;
  const correctResults = submittedTasks.filter(task => task.result === 'Correct').length;
  const incorrectResults = submittedTasks.filter(task => task.result === '400').length;
  const percentageCorrect = (correctResults / totalResults) * 100;
  const percentageIncorrect = (incorrectResults / totalResults) * 100;

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
      <div className="container">
        <div className="row">
          <div className="col-md-5">
            <div className="row">
              <h3 className="dashboardTitle">REQUESTS:</h3>
              <div className="card">
                <div className="col-md-12">
                  <DashboardCard title="New task:" data={!dashboardData ? "Loading..." : dashboardData.length} />
                </div>
                <div className="col-md-12">
                  <DashboardCard title="Submit Task:" data={!submittedTasks ? "Loading..." : submittedTasks.length} />
                </div>
              </div>
            </div>
            <br />
            <div className="row">
              <h3 className="dashboardTitle">METRICS:</h3>
              <div className="card">
                <div className="col-md-12">
                  <DashboardCard title="Percentage of correct answers" data={percentageCorrect.toFixed(1)+"%"} />
                </div>
                <div className="col-md-12">
                  <DashboardCard title="Percentage of incorrect answers" data={percentageIncorrect.toFixed(1)+"%"} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-1"></div>
          <div className="col-md-5">
            <div className="row">
              <h3 className="dashboardTitle">RESULTS:</h3>
              <div className="card">
                <div className="col-md-12">
                  <DashboardCard title="Correct result:" data={submittedTasks.filter(task => task.result === 'Correct').length} />
                </div>
                <div className="col-md-12">
                  <DashboardCard title="Incorrect result:" data={submittedTasks.filter(task => task.result === '400').length} />
                </div>
                <div className="col-md-12">
                  <DashboardCard title="Value not found for specified ID:" data={submittedTasks.filter(task => task.result === '404').length} />
                </div>
                <div className="col-md-12">
                  <DashboardCard title="Error communicating with database:" data={submittedTasks.filter(task => task.result === '503').length} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
