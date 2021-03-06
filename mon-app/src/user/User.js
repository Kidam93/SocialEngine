import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './user.css'
import Axios from 'axios';
import {
    BrowserRouter as Router,
    Redirect,
    Link
  } from "react-router-dom";
import { PartialNavbar } from '../partials/PartialNavbar';

export class User extends Component {

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
        change: false,
        is_friend: 'Loading...'
    };
    
    this.handleAddUserSubmit = this.handleAddUserSubmit.bind(this);
    this.handleAcceptUserSubmit = this.handleAcceptUserSubmit.bind(this);
    this.handleDeleteUserSubmit = this.handleDeleteUserSubmit.bind(this);
  }
    
  componentDidMount(){
      // USER
      const id = this.props.match.params.id;
      Axios.get('http://127.0.0.1:8000/user-'+id, {withCredentials: true})
          .then((res) => {
              if(res.data.user !== null){
                localStorage.setItem('img_user', res.data.user[0].img)
                this.setState({
                  id: res.data.user[0].id,
                  firstName: res.data.user[0].firstname,
                  lastName: res.data.user[0].lastname,
                  created: res.data.user[0].created_at,
                  describe: res.data.user[0].describe,
                  is_friend: null,
                  posts_user: res.data.posts
                })
                console.log('res dataa', res.data.posts)
                // IF FRIEND OR NOT
                if(res.data.is_friend[0].confirmed === 1){
                  this.setState({
                    is_friend: 1
                  })
                }else if(res.data.is_friend[0].confirmed === 0){
                  if(res.data.id === res.data.accept[0].friend_id){
                    // ACCEPT INVITATION
                    this.setState({
                      is_friend: 'accept'
                    })
                  }else{
                    // INVITATION ENVOYEE
                    this.setState({
                      is_friend: 0
                    })
                  }
                  // console.log('myInvitation', res.data.accept[0].friend_id)
                  // console.log('myId', res.data.id)
                }else{
                  this.setState({
                    is_friend: null
                  })
                }
                // console.log('is friend verif ', res)
              }else{
                // console.log('user res..error', res)
              }
          })
          .catch((error) => {
              // console.log('error', error)
          })
  }

    async handleAddUserSubmit(event) {
      event.preventDefault();
      const id = this.props.match.params.id;
      // console.log('props id', id)
      this.setState({ change: true })
      let data = new FormData(event.target)
      const response = await fetch('http://127.0.0.1:8000/user-'+id, {
          method: 'POST',
          body: data,
          credentials: 'include',
          headers: {
              Accept: 'application/json'
          }
      })
      let value = response.json();
      value.then(res => {
        console.log('res!', res)
        this.setState({ change: false })
        Axios.get('http://127.0.0.1:8000/user-'+id, {withCredentials: true})
          .then((res) => {
              if(res.data.user !== null){
                localStorage.setItem('img_user', res.data.user[0].img)
                this.setState({
                  id: res.data.user[0].id,
                  firstName: res.data.user[0].firstname,
                  lastName: res.data.user[0].lastname,
                  created: res.data.user[0].created_at,
                  describe: res.data.user[0].describe
                })
                // IF FRIEND OR NOT
                if(res.data.is_friend[0].confirmed === 1){
                  this.setState({
                    is_friend: 1
                  })
                }else if(res.data.is_friend[0].confirmed === 0){
                  if(res.data.id === res.data.accept[0].friend_id){
                    // ACCEPT INVITATION
                    this.setState({
                      is_friend: 'accept'
                    })
                  }else{
                    // INVITATION ENVOYEE
                    this.setState({
                      is_friend: 0
                    })
                  }
                  // console.log('myInvitation', res.data.accept[0].friend_id)
                  // console.log('myId', res.data.id)
                }else{
                  this.setState({
                    is_friend: null
                  })
                }
                // console.log('is friend verif ', res)
              }else{
                // console.log('user res..error', res)
              }
          })
          .catch((error) => {
              // console.log('error', error)
          })
      }).catch( error => {
        console.log(error)
      })
  }

  async handleAcceptUserSubmit(event){
    event.preventDefault();
      const id = this.props.match.params.id;
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
      value.then(res => {
        console.log('res!', res)
        this.setState({ change: false })
        Axios.get('http://127.0.0.1:8000/user-'+id, {withCredentials: true})
          .then((res) => {
              if(res.data.user !== null){
                localStorage.setItem('img_user', res.data.user[0].img)
                this.setState({
                  id: res.data.user[0].id,
                  firstName: res.data.user[0].firstname,
                  lastName: res.data.user[0].lastname,
                  created: res.data.user[0].created_at,
                  describe: res.data.user[0].describe
                })
                // IF FRIEND OR NOT
                if(res.data.is_friend[0].confirmed === 1){
                  this.setState({
                    is_friend: 1
                  })
                }else if(res.data.is_friend[0].confirmed === 0){
                  if(res.data.id === res.data.accept[0].friend_id){
                    // ACCEPT INVITATION
                    this.setState({
                      is_friend: 'accept'
                    })
                  }else{
                    // INVITATION ENVOYEE
                    this.setState({
                      is_friend: 0
                    })
                  }
                  // console.log('myInvitation', res.data.accept[0].friend_id)
                  // console.log('myId', res.data.id)
                }else{
                  this.setState({
                    is_friend: null
                  })
                }
                // console.log('is friend verif ', res)
              }else{
                // console.log('user res..error', res)
              }
          })
          .catch((error) => {
              // console.log('error', error)
          })
      }).catch( error => {
        console.log(error)
      })
  }

  async handleDeleteUserSubmit(event){
    event.preventDefault();
      const id = this.props.match.params.id;
      this.setState({ change: true })
      let data = new FormData(event.target)
      const response = await fetch('http://127.0.0.1:8000/friend-delete-'+id, {
          method: 'POST',
          body: data,
          credentials: 'include',
          headers: {
              Accept: 'application/json'
          }
      })
      let value = response.json();
      value.then(res => {
        this.setState({ change: false })
        Axios.get('http://127.0.0.1:8000/user-'+id, {withCredentials: true})
          .then((res) => {
              // IF FRIEND OR NOT
              this.setState({
                is_friend: null
              })
          })
          .catch((error) => {
              // console.log('error', error)
          })
      }).catch( error => {
        console.log(error)
      })
  }

  render() {
    let img = localStorage.getItem('img_user')
    let redirect = localStorage.getItem('redirect');
    // console.log('state', this.state.is_friend)
    if(redirect === 'true'){
      return <React.Fragment>
          <body className="bg-light">
          <PartialNavbar />
        <div className="nav-scroller bg-white shadow-sm">
          <nav className="nav nav-underline">
            <Link className="nav-link" to="/profil">Profil</Link>
            <a className="nav-link active" href="#">Dashboard</a>
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
            {/* <Link class="nav-link" to={'profil-update'} id="update">Modifier</Link> */}
          </small>
          </div>
          { this.state.is_friend == 'Loading...' &&
            <div className="my-3 p-3 bg-white rounded shadow-sm">
            <h6 className="border-bottom border-gray pb-2 mb-0">{this.state.is_friend}</h6>
            <div className="media text-muted pt-3">
              <div className="container">
                
              </div>
            </div>
          </div> 
          }
          { this.state.is_friend == null &&
          <div className="my-3 p-3 bg-white rounded shadow-sm">
            <h6 className="border-bottom border-gray pb-2 mb-0">Vous n'etes pas amis</h6>
            <div className="media text-muted pt-3">
              <div className="container">
                <form class="form-signin" onSubmit={this.handleAddUserSubmit}>
                <div class="form-label-group">
                    <input type="hidden" id="inputEmail" class="form-control" placeholder="Email address" name="add-user" value={this.state.id} />
                </div>
                <button class="btn btn-success" disabled={this.state.change} type="submit">Ajouter</button>
                </form>
              </div>
            </div>
          </div> 
          }
          { this.state.is_friend == 0 &&
          <div className="my-3 p-3 bg-white rounded shadow-sm">
            <h6 className="border-bottom border-gray pb-2 mb-0">Invitation envoyée</h6>
            <div className="media text-muted pt-3">
              <div className="container">
                
              </div>
            </div>
          </div> 
          }
          { this.state.is_friend == "accept" &&
          <div className="my-3 p-3 bg-white rounded shadow-sm">
            <h6 className="border-bottom border-gray pb-2 mb-0">Demande d'amis</h6>
            <div className="media text-muted pt-3">
              <div className="container">
                <form class="form-signin" onSubmit={this.handleAcceptUserSubmit}>
                <div class="form-label-group">
                    <input type="hidden" id="inputEmail" class="form-control" placeholder="Email address" name="add-user" value={this.state.id} />
                </div>
                <button class="btn btn-success" disabled={this.state.change} type="submit">Accepter</button>
                </form>
              </div>
            </div>
          </div> 
          }
          { this.state.is_friend == 1 &&
          <React.Fragment>
          <div className="my-3 p-3 bg-white rounded shadow-sm">
          <h6 className="border-bottom border-gray pb-2 mb-0">Vous etes amis</h6>
          <div className="media text-muted pt-3">
            <div className="container">
              <form class="form-signin" onSubmit={this.handleDeleteUserSubmit}>
              <div class="form-label-group">
                  <input type="hidden" id="inputEmail" class="form-control" placeholder="Email address" name="add-user" value={this.state.id} />
              </div>
              <button class="btn btn-danger" disabled={this.state.change} type="submit">Supprimer</button>
              </form>
            </div>
          </div>
        </div> 

        <div className="my-3 p-3 bg-white rounded shadow-sm">
          <h6 className="border-bottom border-gray pb-2 mb-0">Recent posts</h6>
            <div className="media text-muted pt-3">
              <div className="container">
              { this.state.posts_user !== '' &&
                Object.keys(this.state.posts_user).map((key) => 
                <div className="border-bottom border-gray" id="content-post">
                  <p>{ this.state.posts_user[key].content }</p>
                  <Link class="nav-link" to={'profil-delete-'+this.state.posts_user[key].id}>Delete</Link>
                </div>
                )
              }
              </div>
            </div>
        </div>
        </React.Fragment>
        }
        </main>
        </body>
        </React.Fragment>
    }else{
      return <Redirect to='/profil'/>;
    }
  }
}