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
import './explore.css';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";

export class Explore extends Component{

    constructor(props) {
        super(props);
        this.state = {
            searchBar: '',
            all: localStorage.getItem('search')
        };

        this.handleSearchBarChange = this.handleSearchBarChange.bind(this);
        this.handleSearchBarSubmit = this.handleSearchBarSubmit.bind(this);
    }

    componentDidMount(){
        // EXPLORE FIND ALL
        Axios.get('http://127.0.0.1:8000/explore/', {withCredentials: true})
            .then((res) => {
                const data = JSON.stringify(res.data.users)
                localStorage.setItem('search', data)
                this.setState({
                    all: JSON.stringify(res.data.users)
                })

            })
            .catch((error) => {
                console.log('error..', error)
            })
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
            search: JSON.stringify(res.users),
            all: JSON.stringify(res.data.users)
          })
        })
    }

    render(){
    console.log('state all..', this.state.all)
    console.log('state search..', this.state.search)
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
            <Link class="nav-link" to="/profil">Profil</Link>
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

          <div class="my-3 p-3 bg-white rounded shadow-sm">
          <h6 class="border-bottom border-gray pb-2 mb-4">Exploration</h6>
          

            {/* card */}
            <div class="row row-cols-1 row-cols-md-3">
            {Object.keys(JSON.parse(this.state.all)).map((key) =>
                <div class="col mb-4">
                    <div class="card" id="card">
                    <div id="cadre">
                    <img src={`http://127.0.0.1:8000/storage/pictures/`+JSON.parse(this.state.all)[key].img} class="card-img-top" alt="..." id="img"/>
                    </div>
                    <div class="mt-2 ml-2">
                        <h5 class="card-title">{ JSON.parse(this.state.all)[key].firstname } { JSON.parse(this.state.all)[key].lastname }</h5>
                        <p class="card-text">{ JSON.parse(this.state.all)[key].describe }</p>
                        <small class="">{ JSON.parse(this.state.all)[key].created_at }</small>
                    </div>
                    </div>
                </div>
            )}
            </div>
            {/* end card */}

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