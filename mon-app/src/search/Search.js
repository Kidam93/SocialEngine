import React, { Component } from 'react';
import Axios from 'axios';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { PartialNavbar } from '../partials/PartialNavbar';
import InputGroup from 'react-bootstrap/InputGroup'
import './search.css';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";

export class Search extends Component{

    constructor(props) {
        super(props);
        this.state = {
            search: localStorage.getItem('search')
        };
    }

    componentDidMount(){
        // let data = localStorage.getItem('search');
        // data = JSON.parse(data)
        // JSON.parse()
        console.log(JSON.parse(this.state.search))
    }

    render(){
      const auth = localStorage.getItem('auth_x');
      const jwt = localStorage.getItem('token_x');
      if(auth !== null){
        return <React.Fragment>
          <body class="bg-light">
            {/* nav search */}
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
              </Navbar.Collapse>
            </Navbar>
            {/* end nav search */}
        <div class="nav-scroller bg-white shadow-sm">
          <nav class="nav nav-underline">
            <a class="nav-link active" href="#">Dashboard</a>
            <a class="nav-link" href="#">
              Friends
              <span class="badge badge-pill bg-light align-text-bottom">27</span>
            </a>
            <a class="nav-link" href="#">Explore</a>
            <a class="nav-link" href="#">Suggestions</a>
            <Link class="nav-link" to="/profil">You</Link>
          </nav>
        </div>
        {/*  */}
        <div id="presence" data-token="{jwt}"></div>
        {/*  */}
        <main class="container" id="main">
          <div class="input-group input-group-lg" id="search-bar">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-lg" id="span">Search</span>
            </div>
            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" id="input"/>
          </div>

          <div class="my-3 p-3 bg-white rounded shadow-sm">
          <h6 class="border-bottom border-gray pb-2 mb-0">Resultats</h6>
          {/* for */}
          {Object.keys(JSON.parse(this.state.search)).map((key) =>
          <div class="media text-muted pt-3">
            <svg class="bd-placeholder-img mr-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 32x32"><title>Placeholder</title><rect width="100%" height="100%" fill="#007bff"/><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg>
            <div class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
              <div class="d-flex justify-content-between align-items-center w-100">
                <strong class="text-gray-dark">{ JSON.parse(this.state.search)[key].firstname } { JSON.parse(this.state.search)[key].lastname }</strong>
                <a href="#">Follow</a>
              </div>
              <span class="d-block">@username</span>
            </div>
          </div>
          )}
          {/* endfor */}
          <small class="d-block text-right mt-3">
            <a href="#">All suggestions</a>
          </small>
        </div>

        </main>

        </body>
      </React.Fragment>
      }else{
        localStorage.clear();
        return <Redirect to='/'/>;
      }
    }
}