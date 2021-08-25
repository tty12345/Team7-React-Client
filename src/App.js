import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import HomePage from './Component/HomePage'
import LogIn from './Component/LogIn';
import CarList from './Component/CarList';
import CarDetail from './Component/CarDetail';
import SignUp from './Component/SignUp';
import CreatePost from './Component/CreatePost'
import Calculator from './Component/Calculator'
import{ NotificationTable } from "./Component/table/NotificationTable"
import { FaBell } from 'react-icons/fa';

function App() {

  function logout(){
    if (sessionStorage.getItem("status") != null) {
      console.log(sessionStorage.getItem("status"));
      sessionStorage.removeItem("status");
      // sessionStorage.setItem("loggedout",);
    } 
    window.location.reload();
  }


  return (
    <div className="App">
      <Router>
        <div>
        <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div className="container">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="www.google.comnavbar">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="www.google.com">
                	<span className="glyphicon glyphicon-retweet"></span>
                	CarExchange
                </a>
            </div>
            <div className="collapse navbar-collapse" id="navbar">
                <ul className="nav navbar-nav">
                    <li className="active">
                    <Link to={"/"} className="nav-link">Home</Link>
                    </li>
                    <li>
                    <Link to={"/CarList"} className="nav-link">Buy</Link>
                    </li>
                    <li>
                    <Link to={"/CreatePost"} className="nav-link">Sell Car</Link>
                    </li>
                    <li>
                     { sessionStorage.getItem("status") == null ?
                        <Link to={"/login"} className="nav-link">Log In</Link>
                        :
                       <Link onClick={logout} className="nav-link">Log Out</Link> }
                    </li>
                    <li>
                      { sessionStorage.getItem("status") == null ?
                         <Link to={"/signup"} className="nav-link">Sign Up</Link>
                         : <div></div> } 
                    </li>
                    <li>
                      <a href="www.google.com" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Tools</a>
                      <ul className="dropdown-menu" aria-labelledby="about-us">
                        <li><Link to={"/Calculator"}>Loan Calculator</Link></li>
                        <li><a href="www.google.com">Blog</a></li>
                      </ul>
                    </li>
                    <li>
                     <Link to={"/GetUsers"} className="nav-link">See Users</Link>
                    </li>
                    {sessionStorage.getItem("status") ?(
                    <li>
                    <a href="www.google.com" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><FaBell/></a>
                      <ul className="dropdown-menu" aria-labelledby="about-us">
                        <li><div><NotificationTable/></div></li>
                      </ul>
                    </li>):
                    (<li></li>)}
                </ul>

                </div>
            </div>
        </nav>
        </div>
        <div className="container mt-3">
        <Switch>
          {/* <Route path='/students/:id' component={EditStudent} /> */}
          <Route exact path='/' component={HomePage} />
          <Route exact path='/LogIn' component={LogIn}/>
          <Route exact path='/CarList' component={CarList}/>
          <Route exact path='/SignUp' component={SignUp}/>
          <Route path='/carDetail/:id' component={CarDetail} />
          <Route exact path='/CreatePost' component={CreatePost}/>
          <Route exact path='/Calculator' component={Calculator}/>
        </Switch>
      </div>
      </Router>
    </div>
  );
}
export default App;  