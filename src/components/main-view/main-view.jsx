import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { RegisView } from '../registration-view/registration-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { ProfileView } from '../profile-view/profile-view';

import { setMovies } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';

import {Row, Col, Container, Navbar, Nav, Button} from 'react-bootstrap';


import '../navbar/navbar.scss';
import LogoImage from '../../img/logo.png';


 class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      register: null,
      user: null,
      favoriteMovies: []
    }
  }

 
  componentDidMount(){
    let accessToken = localStorage.getItem('token');
      if (accessToken !== null) {
        this.setState({
          user: localStorage.getItem('user')
        });
        this.getMovies(accessToken);
      }
  }
  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
  
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

getMovies(token) {
  axios.get('https://berkdislimyflix.herokuapp.com/movies', {
    headers: { Authorization: `Bearer ${token}`}
  })
  .then(response => {
    this.props.setMovies(response.data);
    console.log(response.data)
  })
  .catch(function (error) {
    console.log(error);
  });
}

onLoggedOut() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  this.setState({
    user: null
  });
  window.open('/', '_self');
}


  render() {
    let { movies } = this.props;
    let { user } = this.state;

  return (
    <Router>
      <Container fluid>
          <Navbar className="navbar-header" expand="lg">
            <Navbar.Brand className="navbar-logo" href="/">
              <img src={LogoImage}
              className="navbar-logo d-inline-block align-top"/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link className="navbar-link" href="/">Home</Nav.Link>
                <Nav.Link className="navbar-link" href={`/users/:username`}>Profile</Nav.Link>
                <Nav.Link href="#logout">
                  <Button className="navbar-logout" variant="danger" onClick={() => { this.onLoggedOut() }}>Logout</Button>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar> 
      <Row className="main-view justify-content-md-center">
        <Route exact path="/" render={() => {
           if (!user) return <Col>
           <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
         </Col>
           if (movies.length === 0) return <div className="main-view" />;

           return <MoviesList movies={movies}/>;    
       }} />
       <Route path="/register" render={() => {
        if (user) return <Redirect to="/" />
        return <Col>
        <RegisView />
        </Col>
       }} />
        {/* you keep the rest routes here  */}

        <Route path="/movies/:movieId" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />

        <Route path="/directors/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
            </Col>
          }
          } />

        <Route path="/genres/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
            </Col>
        }} />

        {/* route for link on main-view to profile-view */}
        <Route path='/users/:username' render={({ history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
          </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={12}>
            <ProfileView user={user} setUser={user => this.setUser(user)}
            movies={movies} onLoggedOut={() => this.onLoggedOut()} onBackClick={() => history.goBack()}/>
          </Col>
        }} />
      </Row>
      </Container>
    </Router>
  );
}}

let mapStateToProps = state => {
  return {
    user: state.user,
    movies: state.movies
  }
}

export default connect(mapStateToProps, { setMovies } )(MainView);