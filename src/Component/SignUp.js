import React, { Component } from "react";
import UserService from "../Services/UserService.js";
import { Redirect } from 'react-router-dom';

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.createUser = this.createUser.bind(this);

        this.state = {
            username: "",
            password: "",
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

    createUser() {
        var data = {
          username: this.state.username,
          password: this.state.password,
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
                        <button onClick={this.createUser} className="btn btn-success">Sign Up</button>
                    </div>
                )}
            </div>
        );
    }
}