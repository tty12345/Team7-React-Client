import React, { Component } from "react";
import UserService from "../Services/UserService.js";
import { Redirect } from 'react-router-dom';
import '../App.css';
import { GoogleLogin } from 'react-google-login';
import axios from "axios";


export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.createUser = this.createUser.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
        this.onFailure = this.onFailure(this);
        this.googleClicked = this.googleClicked(this);

        this.state = {
            username: "",
            password: "",
            email: "",
            isCreated: false,
            googleClicked:false
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

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    createUser() {
        var data = {
          username: this.state.username,
          password: this.state.password,
          email: this.state.email
        };
        UserService.save(data)
        .then(response => {
            if (response.status === 201) {
                this.setState({
                    isCreated: true
                });
            }
        });
    }

    onSuccess = (res) => {
        console.log("WTF")
        var data = {
            username: res.profileObj.name,
            password: res.profileObj.googleId,
            email: res.profileObj.email
          };

        axios.post("http://localhost:8080/api/googlelogin",data)
        .then( response => {
            if ( response.status === 200){
                sessionStorage.setItem("userId", response.data);
                this.setState({
                });
            }
        });
    };

    onFailure = (res) => {
        console.log("[ Login failed ] res: ", res);
    };

    googleClicked(){
        this.setState({
            googleClicked:true
        })
    }

    

    render() {
        return (
            <div className="submit-form">
                {this.state.isCreated ? (
                    <Redirect to='/login'  />
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="username">Username:</label>
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
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                required
                                onChange={this.onChangeEmail}
                                name="email"
                            />
                        </div>
                        <button onClick={this.createUser} className="btn btn-success">Sign Up</button>
                        {this.state.googleClicked?
                        <div>
                            <GoogleLogin
                                clientId = "626198155735-d6cl2at1tugtttie9jb2j09o483ncata.apps.googleusercontent.com"
                                onSuccess = {this.onSuccess}
                                onFailure = {this.onFailure}
                                cookiePolicy = {'single_host_origin'}
                                style = {{marginTop: '100px'}}
                                isSignedIn = {true}
                            />
                        </div>
                        :<div>
                        {/* <img onClick = {this.googleClicked} alt="" src="https://aws1.discourse-cdn.com/business5/uploads/webflow1/original/3X/2/4/24bc102eccbabdb30b5ec93447732ead235d5549.png"/> */}
                        </div>}
                        <button onClick={this.googleClicked} className="btn btn-success">Sign Up With Google</button>
                    </div>                  
                )}
            </div>
        );
    }
}