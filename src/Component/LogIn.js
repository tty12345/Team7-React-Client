import React, { Component } from "react";
import UserDataService from "../Services/UserService";
import { Redirect } from 'react-router-dom';

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
        var data = {
          username: this.state.username,
          password: this.state.password
        };

        UserDataService.login(data)
        .then(response => {
            if (response.status === 200) {
                this.setState({
                    isLoggedIn: true,
                })
            } 
            console.log(response.data);
        })
        .catch(e => {
            this.setState({
                isLoggedIn: false,
                message: "Invalid username or password. Please try again"
            })
            console.log(e);
        });
    }

    render() {
        return (
            <div className="submit-form">
                {this.state.isLoggedIn ? (
                    <Redirect to='/'  />
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
                    </div>
                )}
            </div>
        );
    }
}