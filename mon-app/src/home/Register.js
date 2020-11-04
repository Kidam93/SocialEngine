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
            passwordConfirmed: '',
            redirection: null
        };

        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handlePasswordConfirmedChange = this.handlePasswordConfirmedChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        Axios.get('http://127.0.0.1:8000', {withCredentials: true})
            .then((res) => {
                if(res.data[0] !== null && res.data[1] === "ok"){
                    this.setState({
                        redirection: true
                    });
                }else{
                    this.setState({
                        redirection: false
                    });
                }
            })
            .catch((error) => {
                console.log("error");
            })
    }

    componentWillUnmount() {

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
        Axios.post('http://127.0.0.1:8000/registration', data, {withCredentials: true})
            .then(res => {
                console.log(res)
            })
            .catch(error => {
                console.log(error.response)
            })
    }

    render() {

    if (this.state.redirection === true) {
        return <Redirect to='/profil' />;
    }else if(this.state.redirection === false){
        return <React.Fragment>
            <body class="bg-light" className="body">
                <div class="container">
            {/* <div class="py-5 text-center">
            <nav class="nav nav-masthead justify-content-center">
                <Link to="/">Home</Link>
                <Link to="/register">Sinscrire</Link>
            </nav>
            <h3 class="masthead-brand"><a href="">Cover</a></h3>
                <h2>Registration form</h2>
                <p class="lead">SocialEngine welcomes you</p>
            </div> */}
            <div class="cover-container d-flex p-3 mx-auto flex-column mb-4">
            <header class="masthead mb-auto">
                <div class="inner mb-4">
                <h3 class="masthead-brand">Cover</h3>
                <nav class="nav nav-masthead justify-content-center">
                    <Link to="/">Home</Link>
                    <Link to="/register">Sinscrire</Link>
                    {/* <a class="nav-link" href="#">Mot de passe oublié</a> */}
                </nav>
                </div>
            </header>
            </div>
            <div className="space"></div>
            <h1 class="cover-heading mt-4" className="title">Registration</h1>
            <p class="lead">Share anything and everything with anyone</p>
            <div class="row justify-content-center">
                <div class="col-md-8 order-md-1">
                <form class="needs-validation mr-4 ml-4" onSubmit={this.handleSubmit}>
                    <div class="row">
                    <div class="col-md-6">
                        <input type="text" class="form-control" id="firstName" placeholder="Firstname" value={this.state.firstName} onChange={this.handleFirstNameChange} name="firstName" />
                        <div class="invalid-feedback">
                        Valid first name is required.
                        </div>
                    </div>
                    <div class="col-md-6">
                        <input type="text" class="form-control" id="lastName" placeholder="Lastname" value={this.state.lastName} onChange={this.handleLastNameChange} name="lastName" />
                        <div class="invalid-feedback">
                        Valid last name is required.
                        </div>
                    </div>
                    </div>

                    <div class="mb-3">
                    <input type="email" class="form-control" id="email" placeholder="email" value={this.state.email} onChange={this.handleEmailChange} name="email" />
                    <div class="invalid-feedback">
                        Please enter a valid email address for shipping updates.
                    </div>
                    </div>

                    <div class="mb-3">
                    <input type="text" class="form-control" id="address2" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange} name="password" />
                    </div>

                    <div class="mb-3">
                    <input type="text" class="form-control" id="address2" placeholder="Confirmed password" value={this.state.passwordConfirmed} onChange={this.handlePasswordConfirmedChange} name="passwordConfirmed" />
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
                    <button class="btn btn-lg btn-block" className="btn-register" type="submit">Registration</button>
                </form>
                </div>
            </div>
            </div>
            </body>
        </React.Fragment>
    }else{
        // LOADER
        return <React.Fragment></React.Fragment>
    }

  }
}

// export default Login;