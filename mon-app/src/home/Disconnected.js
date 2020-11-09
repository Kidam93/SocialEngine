import React, { Component } from 'react';
// import './registration.css';
import Axios from 'axios';
import {
    BrowserRouter as Router,
    Redirect
} from "react-router-dom";

export class Disconnected extends Component {

    // APPELLE confirm METHOD PHP WITH JS
    constructor(props) {
        super(props);
        this.state = {
            redirection: null
        };
    }

    render() {
        localStorage.clear();
        return <Redirect to='/'/>;
    }
}