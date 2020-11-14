import React, { Component } from 'react';
import Axios from 'axios';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
// import {Search} from './search/Search.js';
import './partialNavbar.css';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";

export class PartialNavbar extends Component{

    constructor(props) {
        super(props);
        this.state = {
            submit: 'submit',
            redirection: null,
            token: null,
            search: '',
            data: null
        };

        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    }

    handleSearchChange(event) {
        this.setState({
            search: event.target.value
        })
    }

    async handleSearchSubmit(event) {
        const auth = localStorage.getItem('auth_x');
        event.preventDefault();
        let data = new FormData(event.target)
        const response = await fetch('http://127.0.0.1:8000/search/'+auth, {
            method: 'POST',
            body: data,
            credentials: 'include',
            headers: {
                Accept: 'application/json'
            }
        })
        let value = response.json();
        value.then(res => {
          this.setState({
            data: res.users,
            redirection: true
          })
        })
    }

    render(){
      if (this.state.redirection === true) {
        if(this.state.data !== null || this.state.data !== undefined){
          if(this.state.data !== "Aucun resultats"){
            const data = JSON.stringify(this.state.data)
            localStorage.setItem('search', data)
            return <Redirect to='/search' />;
          }else{
            console.log('not good !')
          }
        }else{
          return <Redirect to='/profil' />;
        }
      }
      
      return <React.Fragment>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
              <>
                <li className="nav-item">
                  <Link class="nav-link" to="/pictures/new">Poster une photo</Link>
                </li>
                <li className="nav-item">
                  <Link to="/disconnected" className="btn btn-danger">Déconnexion</Link>
                </li>
              </>
            </Nav>
              <form className="search" onSubmit={this.handleSearchSubmit}>
                <input className="inputsearch" type="" name="search" placeholder="Recherche.." value={this.state.search} onChange={this.handleSearchChange} />
                <button className="btn btn-success" type="submit">Ok</button>
              </form>
          </Navbar.Collapse>
        </Navbar>
      </React.Fragment>
    }
}