import React, { Component } from "react";
import UserDataService from "../Services/UserService";
import { Redirect } from 'react-router-dom';
import '../App.css';
import { GoogleLogin } from 'react-google-login';


export default class LogIn extends Component {
    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.login = this.login.bind(this);

        this.state = {
            username: "",
            password: "",
            isLoggedIn : false,
            message: ""
        };
    }


    onChangeUsername(e) {
        this.setState({
          username: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    login() {
        sessionStorage.setItem("status", "true");

        var data = {
          username: this.state.username,
          password: this.state.password
        };

        UserDataService.login(data)
        .then(response => {
            if (response.status === 200) {      
                this.setState({
                    isLoggedIn: true,
                });
                sessionStorage.setItem("userId", response.data);
                window.location.reload();
            } 
            // console.log(response.data);
            // console.log(sessionStorage.getItem('ToWhere'));
        })
        .catch(e => {
            this.setState({
                isLoggedIn: false,
                message: "Invalid username or password. Please try again"
            })
            console.log(e);
        });
    }

    onSuccess = (res) => {
        var data = {
            username: res.profileObj.name,
            password: res.profileObj.googleId,
            email: res.profileObj.email
          };

          UserDataService.login(data)
          .then(response => {
            if (response.status === 200) {  
                sessionStorage.setItem("status", "true");
                sessionStorage.setItem("googleLogin", "true");
                sessionStorage.setItem("userId", response.data);    
                this.setState({
                    isLoggedIn: true,
                });
                console.log(response.data);
                window.location.reload();
            } 
        }).catch(e => {
            this.setState({
                isLoggedIn: false,
                message: "Invalid username or password. Please try again"
            })
            console.log(e);
        });
        
    };

    onFailure = (res) => {
        console.log("[ Login failed ] res: ", res);
    };

    customStyle = {
        color: 'white',
        background: '#E040FB',
        fontsize: 13,
        padding: 14,
        display:"block",
        margin:"auto",
        width:"max-content",
        backgroundImage: `linear-gradient(to right, #9C27B0, #E040FB)`,
        borderRadius:17,
        marginTop: 15,
        cursor: "pointer",
      };


    render() {
        return (

        <div className="main">
        {this.state.isLoggedIn ? (
                        (sessionStorage.getItem("ToWhere") == 'sellcar' ?
                            <Redirect to='/createpost' /> : <Redirect to='/' /> ) 
                            // <Redirect to='/carlist' /> 
                        ) : (
                                <div className = "main">
                                    <p className = "sign" align ="center">Sign In</p>
                                    <br></br>
                                    <div className="form1">
                                        <h4 className="text-danger">{this.state.message}</h4>
                                        <label htmlFor="title">Username:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="username"
                                            required
                                            value={this.state.username}
                                            onChange={this.onChangeUsername}
                                            name="username"
                                        />
                                    </div>
                                <br></br>
                                    <div className="form1">
                                        <label htmlFor="password">Password:</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            required
                                            value={this.state.password}
                                            onChange={this.onChangePassword}
                                            name="password"
                                        />
                                    </div>
                                    <br></br>
                                    <br></br>
                                    <button onClick={this.login} className="btn btn-success">Log In</button>
                                    <GoogleLogin
                                        render={renderProps => (
                                        <li onClick={renderProps.onClick} className = "nav-link" style={this.customStyle}>Log In With Google</li>)}
                                        clientId = '626198155735-d6cl2at1tugtttie9jb2j09o483ncata.apps.googleusercontent.com'
                                        buttonText = 'Log In With Google'
                                        onSuccess = {this.onSuccess}
                                        onFailure = {this.onFailure}
                                        cookiePolicy = {'single_host_origin'}
                                        style = {{marginTop: '100px'}}
                                        isSignedIn = {true}
                                    />
                                </div>
                            )
                
        }
        </div>
        )
    }
}