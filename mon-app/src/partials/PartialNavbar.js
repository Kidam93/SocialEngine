import React, { Component } from 'react';
import Axios from 'axios';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

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
      };
  }

  componentDidMount(){
      const id = localStorage.getItem('id');
      const token = localStorage.getItem('token');
      if(id === null && token === null){
          this.setState({
              redirection: false,
          });
      }
  }

  logout = () => {
    localStorage.setItem('id', null);
    localStorage.setItem('token', null);
    localStorage.clear();
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    if(id === null && token === null){
        this.setState({
            redirection: false,
        });
    }
  }

    render(){
      if (this.state.redirection === false) {
        return <Redirect to='/' />;
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
              { localStorage.getItem('token') ? 
              <>
                <li class="nav-item">
                  <Link class="nav-link" to="/pictures/new">Poster une photo</Link>
                </li>
                <li class="nav-item">
                  <button class="btn btn-danger" onClick={this.logout}>Déconnexion</button>
                </li>
              </>
             : 
              <>
                 <li class="nav-item">
                  <Link class="nav-link" to="/pictures/new">Poster une photo</Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="/">Connexion</Link>
                </li>
              </>
              }
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
      </React.Fragment>
    }
}