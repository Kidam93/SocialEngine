import React, { Component } from 'react';
import './cover.css';
import Axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";

export class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            redirection: false,
            error: 'Entrer vos identifiants',
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    async handleSubmit(event) {
        event.preventDefault();
        let data = new FormData(event.target)
        const response = await fetch('http://127.0.0.1:8000', {
            method: 'POST',
            body: data,
            credentials: 'include',
            headers: {
                Accept: 'application/json'
            }
        })
        data = response.json()
        data.then(res => {
            if(res.errors){
                this.setState({
                    redirection: false,
                    error: res.errors
                });
            }else if(res.valid.token !== "ok"){
                this.setState({
                    redirection: false,
                    error: "Veuillez confirmé votre compte par email"
                });
            }else{
                localStorage.setItem('auth', res.valid.auth)
                this.setState({
                    user: res.valid,
                    redirection: true,
                    error: "Connexion..."
                });
            }
        })
    }

    render() {
    const auth = localStorage.getItem('auth');
    console.log(auth);

    if (auth) {
        return <Redirect to='/profil' />;
    }else{
        return <React.Fragment>
            <div class="text-center" className="body">
            <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
            <header class="masthead mb-auto">
                <div class="inner">
                <h3 class="masthead-brand">Cover</h3>
                <nav class="nav nav-masthead justify-content-center">
                    <Link to="/">Home</Link>
                    <Link to="/register">Sinscrire</Link>
                    {/* <a class="nav-link" href="#">Mot de passe oublié</a> */}
                </nav>
                </div>
            </header>

            <main role="main" class="inner cover">
                <h1 class="cover-heading">Social<span className="E">E</span>ngine</h1>
                <p class="lead">Share anything and everything with anyone</p>
                <p class="lead">

                {this.state.error}

                <form class="form-signin" onSubmit={this.handleSubmit}>
                <div class="form-label-group">
                    <input type="email" id="inputEmail" class="form-control" placeholder="Email address" name="email" value={this.state.email} onChange={this.handleEmailChange} />
                </div>
                <div class="form-label-group">
                    <input type="password" id="inputPassword" class="form-control" placeholder="Password" name="password" value={this.state.password} onChange={this.handlePasswordChange} />
                </div>
                <div class="checkbox mb-3">
                    <label>
                    <input type="checkbox" value="remember-me" name="remember" /> Remember me
                    </label>
                </div>
                <button class="btn btn-lg btn-block" className="btn-pink" type="submit">Sign in</button>
                </form>
                </p>
            </main>

            <footer class="mastfoot mt-auto">
                <div class="inner">
                <p>Cover template for <a href="https://getbootstrap.com/">Bootstrap</a>, by <a href="https://twitter.com/mdo">@mdo</a>.</p>
                </div>
            </footer>
            </div>
            </div>
        </React.Fragment>
    }
  }
}

// export default Login;