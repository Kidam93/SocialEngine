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
            search: localStorage.getItem('search'),
            searchBar: '',
        };

        this.handleSearchBarChange = this.handleSearchBarChange.bind(this);
        this.handleSearchBarSubmit = this.handleSearchBarSubmit.bind(this);
    }

    handleSearchBarChange(event) {
        this.setState({
            searchBar: event.target.value
        })
    }

    async handleSearchBarSubmit(event) {
        event.preventDefault();
        let data = new FormData(event.target)
        const response = await fetch('http://127.0.0.1:8000/search/', {
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
            search: JSON.stringify(res.users)
          })
          console.log('res', res)
        }).catch( error => {
          console.log('error', error)
        })
    }

    render(){
      let redirect = localStorage.getItem('redirect');
      if(redirect === 'true'){
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
          <Link className="nav-link" to="/profil">Profil</Link>
            <a class="nav-link active" href="#">Dashboard</a>
            <a class="nav-link" href="#">
              Friends
              <span class="badge badge-pill bg-light align-text-bottom">27</span>
            </a>
            <Link className="nav-link" to="/explore">Explore</Link>
            <a class="nav-link" href="#">Suggestions</a>
          </nav>
        </div>
        {/*  */}
        <div id="presence" data-token="{jwt}"></div>
        {/*  */}
        <main class="container" id="main">
          <form onSubmit={this.handleSearchBarSubmit} >
          <div class="input-group input-group-lg" id="search-bar">
            <div class="input-group-prepend">
              <button class="input-group-text" id="inputGroup-sizing-lg" id="span">Search</button>
            </div>
            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" id="input"  value={this.state.searchBar} onChange={this.handleSearchBarChange} name="search" />
          </div>
          </form>

          <div class="my-3 p-3 bg-white rounded shadow-sm">
          <h6 class="border-bottom border-gray pb-2 mb-0">Resultats</h6>
          
          { 
            Object.keys(JSON.parse(this.state.search)).map((key) =>
              <React.Fragment>
              <Link className="nav-link" to={`/user-`+JSON.parse(this.state.search)[key].id}>
              <div class="media text-muted pt-3">
                <img className="mr-3" src={`http://127.0.0.1:8000/storage/pictures/`+JSON.parse(this.state.search)[key].img} alt="" id="img-profil"/>
                <div class="media-body pb-3 mb-0 lh-125">
                  <div class="d-flex justify-content-between align-items-center w-100">
                    <strong class="text-gray-dark">{ JSON.parse(this.state.search)[key].firstname } { JSON.parse(this.state.search)[key].lastname }</strong>
                  </div>
                  <small class="d-block">{ JSON.parse(this.state.search)[key].describe }</small>
                  <small class="d-block">{ JSON.parse(this.state.search)[key].created_at }</small>
                </div>
              </div>
              <p class="border-bottom border-gray mt-4"></p>
              </Link>
              </React.Fragment>
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