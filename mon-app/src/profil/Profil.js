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
import io from 'socket.io-client';

// let socket = io("http://127.0.0.1:3000")

export class Profil extends Component {

  // WEBSOCKET CLIENT
  // socket.on('connect', () => {
  //   console.log('je suis connecté')
  // })
  // 

  constructor(props) {
    super(props);
    this.state = {
        firstName: '',
        lastName: '',
        email: '',
        created: '',
        redirection: false,
        auth_x: null,
        post: '',
        posts_user: ''
    };

    this.handlePostChange = this.handlePostChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
      // const bad_auth_x = "jBdGvA92WCsqVVut0C92LKGLYRKPsO2i1KkbfIr7&26";
      const auth_x = localStorage.getItem('auth_x');
      // USER
      Axios.get('http://127.0.0.1:8000/profil/'+auth_x, {withCredentials: true})
          .then((res) => {
              if(res.data.error === 'redirect'){
                localStorage.clear();
              }else{
                this.setState({
                  firstName: res.data.user.firstname,
                  lastName: res.data.user.lastname,
                  email: res.data.user.email,
                  created: res.data.user.created_at,
                  auth_x: res.data.user.auth+'&'+res.data.user.id
                })
              }
          })
          .catch((error) => {
              console.log("error");
          })
      // POST
      Axios.get('http://127.0.0.1:8000/profil-post/'+auth_x, {withCredentials: true})
          .then((res) => {
              this.setState({
                posts_user: res.data.posts
              })
          })
          .catch((error) => {
              console.log("error");
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
  Axios.post('http://127.0.0.1:8000/profil/'+this.state.auth_x, data, {withCredentials: true})
      .then(res => {
          console.log(res)
      })
      .catch(error => {
          console.log(error.response)
      })
  
  // POST
  const auth_x = localStorage.getItem('auth_x');
  Axios.get('http://127.0.0.1:8000/profil-post/'+auth_x, {withCredentials: true})
      .then((res) => {
          this.setState({
            posts_user: res.data.posts
          })
      })
      .catch((error) => {
          console.log("error");
      })
  this.setState({
      post: ''
  })
}

    render() {
    console.log(this.state.posts_user)
    const auth = localStorage.getItem('auth_x');
    const jwt = localStorage.getItem('token_x');
    if(auth !== null){
      return <React.Fragment>
        <body class="bg-light">
          <PartialNavbar />
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
      <main role="main" class="container" id="main">
        <div class="d-flex align-items-center p-3 my-3 text-white-50 bg-purple rounded shadow-sm">
          <img class="mr-3" src="/docs/4.5/assets/brand/bootstrap-outline.svg" alt="" width="48" height="48" />
          <div class="lh-100">
          <h6 class="mb-0 text-dark lh-100">{this.state.firstName} {this.state.lastName}</h6>
          <small class="text-dark">{this.state.created}</small>
          </div>
        </div>

        <form class="my-3 p-3 bg-white rounded shadow-sm" onSubmit={this.handleSubmit}>
          <textarea className="posts" placeholder="your post here.." name="post" value={this.state.post} onChange={this.handlePostChange}></textarea>
          <button type="submit" class="btn btn-success">Ok</button>
          {/* <p>{this.state.auth_x}</p> */}
        </form>

        <div class="my-3 p-3 bg-white rounded shadow-sm">
          <h6 class="border-bottom border-gray pb-2 mb-0">Recent posts</h6>

          <div class="media text-muted pt-3">
            <div className="text">
            {Object.keys(this.state.posts_user).map((key) => 
              // console.log(this.state.posts_user[key])
              <div><p>{ this.state.posts_user[key].content }</p></div>
            )}
            </div>
          </div>

          <small class="d-block text-right mt-3">
            <a href="#">All posts</a>
          </small>
        </div>

        <div class="my-3 p-3 bg-white rounded shadow-sm">
          <h6 class="border-bottom border-gray pb-2 mb-0">Suggestions</h6>
          <div class="media text-muted pt-3">
            <svg class="bd-placeholder-img mr-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 32x32"><title>Placeholder</title><rect width="100%" height="100%" fill="#007bff"/><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg>
            <div class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
              <div class="d-flex justify-content-between align-items-center w-100">
                <strong class="text-gray-dark">Full Name</strong>
                <a href="#">Follow</a>
              </div>
              <span class="d-block">@username</span>
            </div>
          </div>
          <div class="media text-muted pt-3">
            <svg class="bd-placeholder-img mr-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 32x32"><title>Placeholder</title><rect width="100%" height="100%" fill="#007bff"/><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg>
            <div class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
              <div class="d-flex justify-content-between align-items-center w-100">
                <strong class="text-gray-dark">Full Name</strong>
                <a href="#">Follow</a>
              </div>
              <span class="d-block">@username</span>
            </div>
          </div>
          <div class="media text-muted pt-3">
            <svg class="bd-placeholder-img mr-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 32x32"><title>Placeholder</title><rect width="100%" height="100%" fill="#007bff"/><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg>
            <div class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
              <div class="d-flex justify-content-between align-items-center w-100">
                <strong class="text-gray-dark">Full Name</strong>
                <a href="#">Follow</a>
              </div>
              <span class="d-block">@username</span>
            </div>
          </div>
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