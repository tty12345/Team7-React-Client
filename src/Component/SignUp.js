import React, { Component } from "react";
import UserService from "../Services/UserService.js";
import { Redirect} from 'react-router-dom';
import '../App.css';


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

    render() {
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
                       
                    </div>
                )}
            </div>
        );
    }
}