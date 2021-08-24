import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'antd/dist/antd.css';
import './index.css';
import App from './App';
import { Login } from './common/login';
import { Register } from './common/register';
import { Analytics } from './components/analytics';
import { Dashboard } from './common/dashboard';

ReactDOM.render(
  <React.StrictMode>
    <Router> 
      <Switch> 
        <Route exact path="/" component={App}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/analytics" component={Analytics}/>
        <Route exact path="/dashboard" component={Dashboard}/>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
