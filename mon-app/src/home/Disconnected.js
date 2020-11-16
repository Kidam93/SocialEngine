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
            redirection: false
        };
    }

    componentDidMount(){
        // USER
        Axios.get('http://127.0.0.1:8000/profil-disconnected/', {withCredentials: true})
            .then((res) => {
                this.setState({
                    redirection: true
                })
            })
            .catch((error) => {

            })
    }

    render() {
        localStorage.clear();
        if(this.state.redirection === true){
            return <Redirect to='/'/>;
        }
        return <React.Fragment></React.Fragment>
    }

}