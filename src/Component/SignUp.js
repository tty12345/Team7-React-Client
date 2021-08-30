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

        this.state = {
            username: "",
            password: "",
            email: "",
            isCreated: false
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

        if (this.state.username === "" || this.state.password === "" || this.state.email === "") 
        {
        window.alert("Please fill in all fields");
        return;}

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

            var data = {
                username: res.profileObj.name,
                password: res.profileObj.googleId,
                email: res.profileObj.email
              };

        axios.post("http://springbootbackend-env.eba-b2jcsvnv.us-east-1.elasticbeanstalk.com/api/googlelogin",data)
        .then( response => {
            if ( response.status === 200){
                this.setState({
                    isCreated: true
                });
            }
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
        if(!this.googleClicked)
        return (
            <div className="main">
                {this.state.isCreated ? (
                    <Redirect to='/login'  />
                ) : (
                    <div className = "main">
                                    <p className = "sign" align ="center">Sign Up</p>
                                    
                        <br></br>
                        <div className="form1">
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
                        <div className="form1">
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
                        
                        <br></br>
                        <br></br>
                        <button onClick={this.createUser} className="btn btn-success">Sign Up</button>
                        <GoogleLogin
                            render={renderProps => (
                            <li onClick={renderProps.onClick} className = "nav-link" style={this.customStyle}>Sign Up With Google</li>)}
                            clientId = '626198155735-d6cl2at1tugtttie9jb2j09o483ncata.apps.googleusercontent.com'
                            buttonText = 'Sign Up With Google'
                            onSuccess = {this.onSuccess}
                            onFailure = {this.onFailure}
                            cookiePolicy = {'single_host_origin'}
                            style = {{marginTop: '100px'}}
                            isSignedIn = {true}
                        />
                       
                    </div>
                )}
            </div>
        );
    }
}