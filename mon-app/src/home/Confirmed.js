import React, { Component } from 'react';
// import './registration.css';
import Axios from 'axios';
import {
    BrowserRouter as Router,
    Redirect
} from "react-router-dom";

export class Confirmed extends Component {

    // APPELLE confirm METHOD PHP WITH JS
    constructor(props) {
        super(props);
        this.state = {
            redirection: null
        };
    }

    componentDidMount(){
        const id = this.props.match.params.id;
        const token = this.props.match.params.token;

        Axios.get('http://127.0.0.1:8000/confirmed/'+id+'-'+token, {withCredentials: true})
            .then((res) => {
                if(res.data.error === "badconfirmed"){
                    this.setState({
                        redirection: true
                    })
                }else{
                    localStorage.setItem('auth', res.data.auth)
                    this.setState({
                        redirection: false
                    })
                }
            })
            .catch((error) => {
                console.log("error");
            })
            // const auth = localStorage.getItem('auth');
            // console.log(auth);
    }

    render() {
        if (this.state.redirection === true) {
            return <Redirect to='/'/>;
        }else if(this.state.redirection === false){
            return <Redirect to='/profil'/>;
        }
        return <React.Fragment></React.Fragment>
    }
}