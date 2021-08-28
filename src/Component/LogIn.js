import React, { Component } from "react";
import UserDataService from "../Services/UserService";
import { Redirect } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import axios from "axios";



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
            console.log(response.data);
            console.log(sessionStorage.getItem('ToWhere'));
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
        })
    };

    onFailure = (res) => {
        console.log("[ Login failed ] res: ", res);
    };


    render() {
        return (
            <div className="submit-form">
                {this.state.isLoggedIn ? (
                  (sessionStorage.getItem("ToWhere") == 'sellcar' ?
                    <Redirect to='/createpost' /> : <Redirect to='/' /> ) 
                    // <Redirect to='/carlist' /> 
                ) : (
                    <div>
                        <div className="form-group">
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
                        <div className="form-group">
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
                        <button onClick={this.login} className="btn btn-success">Log In</button>
                        <div>
                        <div>
                                <GoogleLogin
                                    clientId = '626198155735-d6cl2at1tugtttie9jb2j09o483ncata.apps.googleusercontent.com'
                                    buttonText = 'Login'
                                    onSuccess = {this.onSuccess}
                                    onFailure = {this.onFailure}
                                    cookiePolicy = {'single_host_origin'}
                                    style = {{marginTop: '100px'}}
                                    isSignedIn = {true}
                                />
                        </div>
  
                        </div>
                    </div>
                )}
            </div>
        );
    }
}