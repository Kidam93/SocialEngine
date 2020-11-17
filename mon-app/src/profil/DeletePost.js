import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './profil.css'
import Axios from 'axios';
import {
    BrowserRouter as Router,
    Redirect,
    Link
  } from "react-router-dom";
import { PartialNavbar } from '../partials/PartialNavbar';

export class DeletePost extends Component {

  constructor(props) {
    super(props);
    this.state = {
        redirection: null
    };
  }


    componentDidMount(){
        // PROFIL POST
        const id = this.props.match.params.id;
        Axios.get('http://127.0.0.1:8000/profil-delete-'+id, {withCredentials: true})
        .then((res) => {
            console.log('post supprimé !', res)
            this.setState({
                redirection: true
            })
        })
        .catch((error) => {
        
        })
    }

    render() {
        let redirect = localStorage.getItem('redirect');
        if(redirect === 'true'){
            return <Redirect to='/profil'/>;
        }
        if(this.state.redirection === true){
            return <Redirect to='/profil'/>;
        }
        return <React.Fragment></React.Fragment>
    }
}