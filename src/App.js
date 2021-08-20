import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import test from './Component/test'
import LogIn from './Component/LogIn';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
        <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div className="container">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="#">
                	<span className="glyphicon glyphicon-retweet"></span>
                	CarExchange
                </a>
            </div>
            <div className="collapse navbar-collapse" id="navbar">
                <ul className="nav navbar-nav">
                    <li className="active">
                        <a href="#">Home</a>
                    </li>
                    <li>
                        <a href="#">Buy/Sell</a>
                    </li>
                    <li>
                      <a href="" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">LogIn/SignUp</a>
                      <ul className="dropdown-menu" >
                        <li><Link to={"/LogIn"} className="nav-link">Log In</Link></li>
                        <li><Link to={"/SignUp"} className="nav-link">Sign Up</Link></li>
                      </ul>
                    </li>
                    <li>
                      <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Tools</a>
                      <ul className="dropdown-menu" aria-labelledby="about-us">
                        <li><a href="#">Loan Calculator</a></li>
                        <li><a href="#">Blog</a></li>
                      </ul>
                    </li>
                </ul>

            <form className="navbar-form navbar-right" role="search">
              <div className="form-group">
                <input type="text" className="form-control"/>
              </div>
              <button type="submit" className="btn btn-default">Search</button>
            </form>

                </div>
            </div>
        </nav>
        </div>
        <div className="container mt-3">
        <Switch>
          {/* <Route path='/students/:id' component={EditStudent} /> */}
          <Route exact path='/' component={test} />
          <Route exact path='/LogIn' component={LogIn}/>
        </Switch>
</div>
      </Router>
    </div>
  );
}
export default App;  