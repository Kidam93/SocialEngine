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
    };
  }
    
  componentDidMount(){
      // USER
      const id = this.props.match.params.id;
      Axios.get('http://127.0.0.1:8000/user-'+id, {withCredentials: true})
          .then((res) => {
              if(res.data.user !== null){
                localStorage.setItem('redirect', true)
                localStorage.setItem('img_user', res.data.user[0].img)
                this.setState({
                  id: res.data.user[0].id,
                  firstName: res.data.user[0].firstname,
                  lastName: res.data.user[0].lastname,
                  created: res.data.user[0].created_at,
                  describe: res.data.user[0].describe
                })
              }else{
                localStorage.setItem('redirect', false)
              }
          })
          .catch((error) => {
              // console.log('error', error)
          })
  }

  render() {
    let img = localStorage.getItem('img_user')
    let redirect = localStorage.getItem('redirect');
    if(redirect === 'true'){
      return <React.Fragment>
          <body className="bg-light">
          <PartialNavbar />
        <div className="nav-scroller bg-white shadow-sm">
          <nav className="nav nav-underline">
            <Link className="nav-link" to="/profil">Profil</Link>
            <a className="nav-link active" href="#">Dashboard</a>
            <a className="nav-link" href="#">
              Friends
              <span class="badge badge-pill bg-light align-text-bottom">27</span>
            </a>
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
          {/* <form className="my-3 p-3 bg-white rounded shadow-sm" onSubmit={this.handleSubmit}>
            <textarea className="posts" placeholder="your post here.." name="post" value={this.state.post} onChange={this.handlePostChange}></textarea>
            <button type="submit" class="btn btn-success">Ok</button>
          </form> */}
          <div className="my-3 p-3 bg-white rounded shadow-sm">
            <h6 className="border-bottom border-gray pb-2 mb-0">Recent posts</h6>
            <div className="media text-muted pt-3">
            <div className="container">
              {/* POSTS */}
              {Object.keys(this.state.posts_user).map((key) => 
                <div className="border-bottom border-gray" id="content-post">
                  <p>{ this.state.posts_user[key].content }</p>
                  <Link class="nav-link" to={'profil-delete-'+this.state.posts_user[key].id}>Delete</Link>
                </div>
              )}
              {/* END POSTS */}
              </div>
            </div>
          </div>

        </main>
        </body>
        </React.Fragment>
    }else{
      return <Redirect to='/profil'/>;
    }
  }
}