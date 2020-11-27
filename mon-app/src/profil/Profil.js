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

export class Profil extends Component {

  constructor(props) {
    super(props);
    this.state = {
        id: '',
        img: '',
        firstName: '',
        lastName: '',
        email: '',
        created: '',
        redirection: false,
        auth_x: null,
        post: '',
        posts_user: '',
        describe: '',
        invitations: '',
        valuetest: 1
    };

    this.handlePostChange = this.handlePostChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAcceptUserSubmit = this.handleAcceptUserSubmit.bind(this);
  }

componentDidMount(){
      // USER
      Axios.get('http://127.0.0.1:8000/profil/', {withCredentials: true})
          .then((res) => {
              if(res.data.user === null){
                localStorage.clear();
                this.setState({
                  redirection: true
                })
              }else{
                const data = JSON.stringify([res.data.user])
                localStorage.setItem('search', data)
                localStorage.setItem('img', res.data.user.img)
                this.setState({
                  id: res.data.user.id,
                  firstName: res.data.user.firstname,
                  lastName: res.data.user.lastname,
                  email: res.data.user.email,
                  created: res.data.user.created_at,
                  auth_x: res.data.user.auth+'&'+res.data.user.id,
                  describe: res.data.user.describe,
                  redirection: false,
                })
              }
          })
          .catch((error) => {
              this.setState({
                redirection: true
              })
          })
      // PROFIL POST
      Axios.get('http://127.0.0.1:8000/profil-post/', {withCredentials: true})
      .then((res) => {
        this.setState({
          posts_user: res.data.posts
        })
      })
      .catch((error) => {
        
      })
      // FRIEND
      Axios.get('http://127.0.0.1:8000/friend-all/', {withCredentials: true})
          .then((res) => {
              // console.log('all', res.data.all)
              this.setState({
                invitations: res.data.all
              })
          })
          .catch((error) => {
              
          })
  }

  handlePostChange(event) {
      this.setState({
          post: event.target.value
      })
  }

async handleSubmit(event) {
      event.preventDefault();
      // this.setState({ post: '' })
      let data = new FormData()
      data.set('post', this.state.post);
      Axios.post('http://127.0.0.1:8000/profil/', data, {withCredentials: true})
          .then(res => {
            
          })
      // POST
      Axios.get('http://127.0.0.1:8000/profil-post/', {withCredentials: true})
          .then((res) => {
              this.setState({
                posts_user: res.data.posts,
              })
          })
      this.setState({
          post: ''
      })
}

async handleAcceptUserSubmit(event){
  event.preventDefault();
    const id = event.target.user.value
    this.setState({ change: true })
    let data = new FormData(event.target)
    const response = await fetch('http://127.0.0.1:8000/friend-'+id, {
        method: 'POST',
        body: data,
        credentials: 'include',
        headers: {
            Accept: 'application/json'
        }
    })
    let value = response.json();
     // FRIEND
     Axios.get('http://127.0.0.1:8000/friend-all/', {withCredentials: true})
     .then((res) => {
         // console.log('all', res.data.all)
         this.setState({
           invitations: res.data.all
         })
     })
     .catch((error) => {
         
     })
}

  render() {
    let img = localStorage.getItem('img')
    let redirect = localStorage.getItem('redirect');
    if(redirect === 'true'){
      return <React.Fragment>
        <body className="bg-light">
          <PartialNavbar />
      <div className="nav-scroller bg-white shadow-sm">
        <nav className="nav nav-underline">
          <Link className="nav-link" to="/profil">Profil</Link>
          <Link className="nav-link" to="/dashboard">Dashboard</Link>
          <Link className="nav-link" to="/friend">
            Friends
            <span class="badge badge-pill bg-light align-text-bottom">27</span>
          </Link>
          <Link className="nav-link" to="/explore">Explore</Link>
          <a className="nav-link" href="#">Suggestions</a>
        </nav>
      </div>
      {/* BEGIN JWT */}
      <div id="presence" data-token="{jwt}"></div>
      {/* END JWT */}
      <main role="main" className="container" id="main">
        <div className="d-flex align-items-center p-3 my-3 text-white-50 bg-white rounded shadow-sm" id="presentation">
        <div className="" id="content">
          {/* JSX BEGIN CONDITION */}
          { img ? 
              <img className="mr-3" src={`http://127.0.0.1:8000/storage/pictures/${img}`} alt="" id="img-profil"/>
            :
              <svg className="bd-placeholder-img mr-2 rounded" width="125" height="125" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 32x32"><title>Placeholder</title><rect width="100%" height="100%" fill="#007bff"/><text x="50%" y="50%" fill="#007bff" dy=".3em">62x62</text></svg>
          }
          {/* JSX END CONDITION */}
          <div className="lh-100">
          <h6 className="mb-0 text-dark lh-100">{this.state.firstName} {this.state.lastName}</h6>
          <small className="text-dark">{this.state.created}</small><br/>
          <small className="text-dark">{this.state.describe}</small>
          </div>
          {/* <Link class="nav-link" to="">Delete</Link> */}
        </div>
        <small className="d-block text-right mt-3">
          <Link class="nav-link" to={'profil-update'} id="update">Modifier</Link>
        </small>
        </div>
        <form className="my-3 p-3 bg-white rounded shadow-sm" onSubmit={this.handleSubmit}>
          <textarea className="posts" placeholder="your post here.." name="post" value={this.state.post} onChange={this.handlePostChange}></textarea>
          <button type="submit" class="btn btn-success">Ok</button>
        </form>
        <div className="my-3 p-3 bg-white rounded shadow-sm">
          <h6 className="border-bottom border-gray pb-2 mb-0">Recent posts</h6>
          <div className="media text-muted pt-3">
          <div className="container">
            {/* POSTS */}
            {this.state.posts_user !== '' && 
            Object.keys(this.state.posts_user).map((key) => 
              <div className="border-bottom border-gray" id="content-post">
                <p>{ this.state.posts_user[key].content }</p>
                <Link class="nav-link" to={'profil-delete-'+this.state.posts_user[key].id}>Delete</Link>
              </div>
            )
            }

            {/* END POSTS */}
            </div>
          </div>
        </div>
        
        <div className="my-3 p-3 bg-white rounded shadow-sm">
          <h6 className="border-bottom border-gray pb-2 mb-0">Friends request</h6>
          { Object.keys(this.state.invitations).map((key) =>
          <div className="media text-muted pt-3">
            {/* <svg className="bd-placeholder-img mr-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 32x32"><title>Placeholder</title><rect width="100%" height="100%" fill="#007bff"/><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg> */}
            <img className="mr-3" src={`http://127.0.0.1:8000/storage/pictures/${this.state.invitations[key].img}`} alt="" id="img-user"/>
            <div className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
              <div className="d-flex justify-content-between align-items-center w-100">
                <strong className="text-gray-dark">{ this.state.invitations[key].firstname } { this.state.invitations[key].lastname }</strong>
                {/* <a href={ this.state.invitations[key].id }>Follow</a> */}
                <form class="form-signin" onSubmit={this.handleAcceptUserSubmit}>
                <div class="form-label-group">
                {/* {JSON.stringify(this.state.invitations[key].id)} */}
                    <input type="hidden" id="inputEmail" class="form-control" placeholder="Email address" name="user" value={this.state.invitations[key].id} />
                </div>
                <button class="btn btn-success" disabled={this.state.change} type="submit">Accepter</button>
                </form>
              </div>
              {/* <span className="d-block">@username</span> */}
            </div>
          </div>
          )}
          <small className="d-block text-right mt-3">
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