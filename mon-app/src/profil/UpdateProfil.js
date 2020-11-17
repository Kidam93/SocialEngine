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

export class UpdateProfil extends Component {

  constructor(props) {
    super(props);
    this.state = {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        created: '',
        redirection: false,
        auth_x: null,
        post: '',
        posts_user: '',
        describe: '',
        personal: '',
        image: ''
    };
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleDescribeChange = this.handleDescribeChange.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
            localStorage.setItem('img', res.data.user.img)
            this.setState({
              id: res.data.user.id,
              firstName: res.data.user.firstname,
              lastName: res.data.user.lastname,
              email: res.data.user.email,
              created: res.data.user.created_at,
              auth_x: res.data.user.auth+'&'+res.data.user.id,
              redirection: false,
              personal: res.data.user.describe,
            })
          }
      })
      .catch((error) => {
          this.setState({
            redirection: true
          })
      })
    }

    handleImageChange(event){
        let file = event.target.files[0]
        this.setState({
            image: file
        })
    }

    handleFirstNameChange(event) {
        this.setState({
            firstName: event.target.value
        })
    }

    handleLastNameChange(event) {
        this.setState({
            lastName: event.target.value
        })
    }

    handleDescribeChange(event) {
        this.setState({
            describe: event.target.value
        })
    }

    async handleSubmit(event) {
        event.preventDefault();
        let data = new FormData()
        data.set('firstname', this.state.firstName)
        data.set('lastname', this.state.lastName)
        data.set('describe', this.state.describe);
        data.set('image', this.state.image);
        // POST DATA
        Axios.post('http://127.0.0.1:8000/profil-update/', data, {withCredentials: true})
            .then(res => {
                localStorage.setItem('img', res.data.user.img)
                console.log(res)
            }).catch(error => {
                console.log('error', error)
            })
        // GET UPDATE AFTER SUBMITED
        Axios.get('http://127.0.0.1:8000/profil/', {withCredentials: true})
            .then((res) => {
                if(res.data.user === null){
                  localStorage.clear();
                  this.setState({
                    redirection: true
                  })
                }else{
                  localStorage.setItem('img', res.data.user.img)
                  this.setState({
                    id: res.data.user.id,
                    firstName: res.data.user.firstname,
                    lastName: res.data.user.lastname,
                    email: res.data.user.email,
                    created: res.data.user.created_at,
                    auth_x: res.data.user.auth+'&'+res.data.user.id,
                    redirection: false,
                    personal: res.data.user.describe,
                  })
                }
            })
            .catch((error) => {
                this.setState({
                  redirection: true
                })
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
                    <a className="nav-link active" href="#">Dashboard</a>
                    <a className="nav-link" href="#">
                    Friends
                    <span class="badge badge-pill bg-light align-text-bottom">27</span>
                    </a>
                    <a className="nav-link" href="#">Explore</a>
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
                    <small className="text-dark">{this.state.personal}</small>
                    </div>
                </div>
                </div>
                <div className="align-items-center p-3 my-3 text-white-50 bg-white rounded shadow-sm">
                <form onSubmit={this.handleSubmit}>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text">Upload</span>
                        </div>
                        <div class="custom-file">
                            <input type="file" class="custom-file-input" id="inputGroupFile01" name="image" value={this.state.img} onChange={this.handleImageChange} />
                            <label class="custom-file-label" for="inputGroupFile01">Choose image</label>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                        <input class="form-control" id="inputEmail4" placeholder="Firstname" name="firstname" value={this.state.firstName} onChange={this.handleFirstNameChange} />
                        </div>
                        <div class="form-group col-md-6">
                        <input class="form-control" id="inputPassword4" placeholder="Lastname" name="lastname" value={this.state.lastName} onChange={this.handleLastNameChange} />
                        </div>
                    </div>
                    <div class="form-group mt-4">
                        <textarea class="w-100" placeholder="Describe here" id="custom-profil" name="describe" value={this.state.describe} onChange={this.handleDescribeChange}></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Ok</button>
                    </form>
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