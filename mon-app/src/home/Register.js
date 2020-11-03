import React, { Component } from 'react';
import './registration.css';
import Axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";

export class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            passwordConfirmed: ''
        };

        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handlePasswordConfirmedChange = this.handlePasswordConfirmedChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount(){
        const id = localStorage.getItem('id');
        const token = localStorage.getItem('token');
        if(id && token){
            this.setState({
                redirection: false,
                token: token
            });
        }
    }

    handleFirstNameChange(event) {
        this.setState({
            firstName: event.target.value
        })
    }

    handleLastNameChange(event) {
        this.setState({
            lastName: event.target.value
        })
    }

    handleEmailChange(event) {
        this.setState({
            email: event.target.value
        })
    }

    handlePasswordChange(event) {
        this.setState({
            password: event.target.value
        })
    }

    handlePasswordConfirmedChange(event) {
        this.setState({
            passwordConfirmed: event.target.value
        })
    }

    async handleSubmit(event) {
        event.preventDefault();
        let data = new FormData()
        data.set('firstName', this.state.firstName);
        data.set('lastName', this.state.lastName);
        data.set('email', this.state.email);
        data.set('password', this.state.password);
        data.set('passwordConfirmed', this.state.passwordConfirmed);
        Axios.post('http://127.0.0.1:8000/registration', data)
            .then(res => {
                console.log(res)
            })
            .catch(error => {
                console.log(error.response)
            })
    }

    render() {

    if (this.state.redirection === false && this.state.token === "ok") {
        return <Redirect to='/profil' />;
    }

    return <React.Fragment>
        <body class="bg-light">
            <div class="container mb-4">
        <div class="py-5 text-center">
        <nav class="nav nav-masthead justify-content-center">
            <Link to="/">Home</Link>
            <Link to="/register">Sinscrire</Link>
        </nav>
        <h3 class="masthead-brand"><a href="">Cover</a></h3>
            <h2>Registration form</h2>
            <p class="lead">SocialEngine welcomes you</p>
        </div>
        <div class="row justify-content-center">
            <div class="col-md-8 order-md-1">
            <form class="needs-validation" onSubmit={this.handleSubmit}>
                <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="firstName">First name</label>
                    <input type="text" class="form-control" id="firstName" placeholder="" value={this.state.firstName} onChange={this.handleFirstNameChange} name="firstName" />
                    <div class="invalid-feedback">
                    Valid first name is required.
                    </div>
                </div>
                <div class="col-md-6 mb-3">
                    <label for="lastName">Last name</label>
                    <input type="text" class="form-control" id="lastName" placeholder="" value={this.state.lastName} onChange={this.handleLastNameChange} name="lastName" />
                    <div class="invalid-feedback">
                    Valid last name is required.
                    </div>
                </div>
                </div>

                <div class="mb-3">
                <label for="email">Email <span class="text-muted">(Optional)</span></label>
                <input type="email" class="form-control" id="email" placeholder="you@example.com" value={this.state.email} onChange={this.handleEmailChange} name="email" />
                <div class="invalid-feedback">
                    Please enter a valid email address for shipping updates.
                </div>
                </div>

                <div class="mb-3">
                <label for="address2">Password<span class="text-muted"></span></label>
                <input type="text" class="form-control" id="address2" placeholder="Apartment or suite" value={this.state.password} onChange={this.handlePasswordChange} name="password" />
                </div>

                <div class="mb-3">
                <label for="address2">Password confirmed<span class="text-muted"></span></label>
                <input type="text" class="form-control" id="address2" placeholder="Apartment or suite" value={this.state.passwordConfirmed} onChange={this.handlePasswordConfirmedChange} name="passwordConfirmed" />
                </div>

                <hr class="mb-4" />
                <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="same-address" />
                <label class="custom-control-label" for="same-address">Shipping address is the same as my billing address</label>
                </div>
                <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="save-info" />
                <label class="custom-control-label" for="save-info">Save this information for next time</label>
                </div>
                <hr class="mb-4" />
                <button class="btn btn-primary btn-lg btn-block mb-4" type="submit">Registration</button>
            </form>
            </div>
        </div>
        <footer class="my-5 pt-5 text-muted text-center text-small">
            <p class="mb-1">&copy; 2017-2020 Company Name</p>
            <ul class="list-inline">
            <li class="list-inline-item"><a href="#">Privacy</a></li>
            <li class="list-inline-item"><a href="#">Terms</a></li>
            <li class="list-inline-item"><a href="#">Support</a></li>
            </ul>
        </footer>
        </div>
        </body>
    </React.Fragment>
  }
}

// export default Login;