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
            redirection: null,
            token: null,
            error: 'Entrer vos identifiants',
            id: null
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
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
        let data = new FormData()
        data.set('email', this.state.email)
        data.set('password', this.state.password)
        Axios.post('http://127.0.0.1:8000', data)
            .then(res => {
                if(res.data.errors !== undefined){
                    this.setState({
                        redirection: true,
                        error: res.data.errors
                    })
                }else{
                    localStorage.setItem('id', res.data.id);
                    localStorage.setItem('token', res.data.token);
                    this.setState({
                        redirection: false,
                        token: res.data.token,
                        id: res.data.id
                    })
                }
            })
            .catch(error => {
                // console.log(error.response)
            })
    }

    render() {

    if (this.state.redirection === false && this.state.token === "ok") {
        return <Redirect to='/profil' />;
    }

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
            <h1 class="cover-heading">SocialEngine</h1>
            <p class="lead">
    Share anything and everything with anyone</p>
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
            <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
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

// export default Login;