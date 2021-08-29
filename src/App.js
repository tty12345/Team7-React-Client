import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import HomePage from './Component/HomePage'
import LogIn from './Component/LogIn';
import CarList from './Component/CarList';
import CarDetail from './Component/CarDetail';
import SignUp from './Component/SignUp';
import CreatePost from './Component/CreatePost'
import OwnCarPosts from './Component/OwnCarPosts'
import Calculator from './Component/Calculator'
import Estimate from './Component/Estimate'
import DepreciationCalculator from './Component/DepreciationCalculator';
import { NotificationTable } from "./Component/table/NotificationTable"
import { FaBell } from 'react-icons/fa';
import SavePreference from './Component/SavePreference';
import { GoogleLogout } from 'react-google-login';



function App() {

  function logout() {
    sessionStorage.clear();
    sessionStorage.setItem("logout", "true");
    return (
      <Redirect to="/" />
    )
  }

  function onSuccess() {
    // alert('Successfully logged out');
    sessionStorage.clear();
    sessionStorage.setItem("logout", "true");
    console.log("SOMETHING");
    window.location.reload()
    return (
      <Redirect to="/" />
    )
  }

  const customStyle = {
    color: '#9d9d9d',
    display: 'block',
    fontsize: 13,
    padding: 14,
    cursor: "pointer",
    '&:hover': {
      color: "#fff",
      backgroundcolor: "transparent"
    }
  };


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
                  <li className="nav-link">
                    <Link to={"/"} className="nav-link">Home</Link>
                  </li>
                  <li>
                    <Link to={"/CarList"} className="nav-link">Buy</Link>
                  </li>
                  <li>
                    <Link to={"/CreatePost"} className="nav-link">Post</Link>
                  </li>

                  
                  <li>
                    {sessionStorage.getItem("status") == null ?
                      <div></div> :
                      <Link to={"/ownpost"} className="nav-link">Your Posts</Link>}
                  </li>
                  <li>
                    {sessionStorage.getItem("status") == null ?
                      <div></div> :
                      <Link to={"/SavePreference"} className="nav-link">Preference</Link>}
                  </li>
        
                  <li>
                    <a href="www.google.com" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Tools</a>
                    <ul className="dropdown-menu" aria-labelledby="about-us">
                      <li><Link to={"/Calculator"}>Loan Calculator</Link></li>
                      <li><Link to={"/DepreciationCalculator"}>Depreciation Calculator</Link></li>
                      <li><a href="http://loopholes.sg/">Financial Blog</a></li>
                    </ul>
                  </li>
                  {sessionStorage.getItem("status") ? (
                    <li>
                      <a href="www.google.com" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><FaBell /></a>
                      <ul className="dropdown-menu" aria-labelledby="about-us">
                        <li><div><NotificationTable /></div></li>
                      </ul>
                    </li>) :
                    (<li></li>)}

                   <li>
                    {sessionStorage.getItem("status") == null ?
                      <Link to={"/signup"} className="nav-link">Sign Up</Link>
                      : <div></div>}
                  </li>

                  <li className="nav-link log-in-out">
                    {sessionStorage.getItem("status") == null ?
                      <Link to={"/login"} className="nav-link">Log In</Link>
                      : (sessionStorage.getItem("googleLogin") == "true" ?
                        <div>
                          <GoogleLogout
                            render={renderProps => (
                              <li onClick={renderProps.onClick} className="nav-link" style={customStyle}>Log Out</li>
                            )}
                            className="nav-link"
                            clientId='626198155735-d6cl2at1tugtttie9jb2j09o483ncata.apps.googleusercontent.com'
                            buttonText='Logout'
                            onLogoutSuccess={onSuccess}
                            type="darl"
                          />
                        </div> :
                        <Link to={'/'} onClick={logout} className="nav-link">Log Out</Link>)}
                  </li>
                </ul>

              </div>
            </div>
          </nav>
        </div>

        <div >
          <Switch>
            {/* <Route path='/students/:id' component={EditStudent} /> */}
            <Route exact path='/login' component={LogIn} />
            <Route exact path='/carlist' component={CarList} />
            <Route exact path='/signup' component={SignUp} />
            <Route path='/cardetail/:id' component={CarDetail} />
            <Route exact path='/ownpost' component={OwnCarPosts} />
            <Route exact path='/createpost' component={CreatePost} />
            <Route exact path='/Calculator' component={Calculator} />
            <Route exact path='/SavePreference' component={SavePreference} />
            <Route exact path='/' component={HomePage} />
            <Route exact path='/Estimate' component={Estimate} />
            <Route exact path='/DepreciationCalculator' component={DepreciationCalculator} />
          </Switch>
          
        </div>
        


        <footer>
          <div className="footer-blurb">
            <div className="container">
              <div className="row">
                <div className="col-sm-4 footer-blurb-item">
                  <h3><span className="glyphicon glyphicon-plus-sign"></span> Loan Calculator</h3>
                  <p>Calculator your loan here</p>
                  <Link to="/Calculator" className="btn btn-default">Calculator Now</Link>
                  {/* <p><a class="btn btn-default"><Link to={"/Calculator/"}>Calculator Now</Link></a></p> */}
                </div>
                <div className="col-sm-4 footer-blurb-item">
                  <h3><span className="glyphicon glyphicon-usd"></span> Financial Blog</h3>
                  <p>View tips about finanical knowledge</p>
                  <p><a className="btn btn-default" href="http://loopholes.sg/">Tour now</a></p>
                </div>
                <div className="col-sm-4 footer-blurb-item">
                  <h3><span className="glyphicon glyphicon-check"></span> Depreciation Calculator</h3>
                  <p>Calculate car depreciation</p>
                  <Link to="/DepreciationCalculator" className="btn btn-default">Calculator Now</Link>
                </div>
                  </div>
                  </div>
                  
                  <div className="small-print">
                    <div className="container">
                      <p><a>Terms &amp; Conditions</a> | <a>Privacy Policy</a> | <a>Contact</a></p>
                      <p><font color="white">Copyright &copy; Team7AD.com 2021</font> </p>
                    </div>
                  </div>
                  </div>
            </footer>
            </Router>
            </div>
            



  );
}
export default App;
