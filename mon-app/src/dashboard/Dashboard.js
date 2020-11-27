import React, { Component } from 'react';
import Axios from 'axios';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { PartialNavbar } from '../partials/PartialNavbar';
import InputGroup from 'react-bootstrap/InputGroup';
import './dashboard.css';

// import './explore.css';
// import io from 'socket.io-client';
import io from 'socket.io';
import Echo from 'laravel-echo';
import Socketio from 'socket.io-client';
// import { io } from 'socket.io-client';
// import Echo from './node_modules/laravel-echo/dist/echo.js';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";

export class Dashboard extends Component{

    constructor(props) {
        super(props);
        this.state = {
            post: '',
            contents: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePostChange = this.handlePostChange.bind(this);
    }

    componentDidMount(){
        // let url = "http://127.0.0.1:3001/.well-know/mercure";
        Axios.get('http://127.0.0.1:8000/dashboard/', {withCredentials: true})
          .then((res) => {
              console.log('all', res.data.all_posts)
              this.setState({
                  contents: JSON.stringify(res.data.all_posts)
              })
          })
          .catch((error) => {
              
          })
    }

    handlePostChange(event) {
        this.setState({
            post: event.target.value
        })
    }

    async handleSubmit(event) {
        event.preventDefault();
        let data = new FormData()
        data.set('post', this.state.post);
        Axios.post('http://127.0.0.1:8000/dashboard/', data, {withCredentials: true})
            .then(res => {
                console.log('res', res)
            }).catch( error => {
                console.log(error)
            })
        // GET
        Axios.get('http://127.0.0.1:8000/dashboard/', {withCredentials: true})
            .then((res) => {
              console.log('all', res.data.all_posts)
              this.setState({
                  contents: JSON.stringify(res.data.all_posts)
              })
            })
            .catch((error) => {
                
            })
    }

    render(){
        let contents = this.state.contents;
        console.log('state', contents)
        return <React.Fragment>
            <body id="body">
                <div id="navbar"><PartialNavbar /></div>
                <div className="nav-scroller bg-white shadow-sm">
                    <nav className="nav nav-underline">
                    <Link className="nav-link" to="/profil">Profil</Link>
                    <Link className="nav-link" to="/dashboard">Dashboard</Link>
                    <Link className="nav-link" to="/friend">
                        Friends
                        <span class="badge badge-pill bg-light align-text-bottom">27</span>
                    </Link>
                    <Link className="nav-link" to="/explore">Explore</Link>
                    <a className="nav-link" href="#">Suggestions</a>
                    </nav>
                </div>
                <div class="" id="wall-conversation">

                { this.state.contents !== '' && 
                    Object.keys(JSON.parse(this.state.contents)).map((key) =>
                        <div id={key}>
                            <small><strong>{ JSON.parse(this.state.contents)[key].firstname } { JSON.parse(this.state.contents)[key].lastname } </strong></small>
                            <small>{ JSON.parse(this.state.contents)[key].created_at }</small>
                            <p>{ JSON.parse(this.state.contents)[key].content }</p>
                        </div>
                    )
                }

                </div>
                <div class="" id="form">
                    <form className="p-3 bg-white rounded shadow-sm" onSubmit={this.handleSubmit} id="form-form">
                        <textarea className="posts" placeholder="your post here.." name="post" value={this.state.post} onChange={this.handlePostChange}></textarea>
                        <button type="submit" class="btn btn-success">Ok</button>
                    </form>
                </div>
            </body>
        </React.Fragment>
    }
}