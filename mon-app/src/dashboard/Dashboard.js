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
            post: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePostChange = this.handlePostChange.bind(this);
    }

    componentDidMount(){
        // let url = "http://127.0.0.1:6001/socket.io/socket.io.js";
        Axios.get('http://127.0.0.1:8000/dashboard/', {withCredentials: true})
          .then((res) => {
              console.log('all', res)
          })
          .catch((error) => {
              
          })
        // Axios.get(url, {withCredentials: true})
        // .then((res) => {
        //     console.log('url', res)
        // })
        // .catch((error) => {
            
        // })
        let echo = new Echo({
            broadcaster: 'socket.io',
            host: 'ws://127.0.0.1:6001',  
            // host: window.location.hostname + ':6001',
            client: Socketio,
            auth: {
                headers: {
                     'Authorization': 'Bearer ' + this.props.token,
                },
            },
        });
        echo.private('chan-demo');
        echo.channel('chan-test').listen('PostCreatedEvent', (e) => {
            console.log(e)
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
        // Axios.post('http://127.0.0.1:8000/dashboard/', data, {withCredentials: true})
        //     .then(res => {
        //       console.log('res')
        //     }).catch( error => {
        //         console.log(error)
        //     })
        // POST
        Axios.get('http://127.0.0.1:8000/dashboard/', {withCredentials: true})
        .then((res) => {
            console.log('all', res)
        })
        .catch((error) => {
            
        })
  }

    render(){
        return <React.Fragment>
            <div>Dashboard</div>
            <form className="my-3 p-3 bg-white rounded shadow-sm" onSubmit={this.handleSubmit}>
                <textarea className="posts" placeholder="your post here.." name="post" value={this.state.post} onChange={this.handlePostChange}></textarea>
                <button type="submit" class="btn btn-success">Ok</button>
            </form>
        </React.Fragment>
    }
}