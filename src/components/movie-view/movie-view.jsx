import React from 'react';
import PropTypes from "prop-types";
import axios from 'axios';

import { Container, Row, Col, Button, Card, CardGroup } from 'react-bootstrap';
import {Link} from "react-router-dom";
import './movie-view.scss';


export class MovieView extends React.Component {

  onAddFavorite() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios.post(`https://berkdislimyflix.herokuapp.com/users/${username}/movies/${this.props.movie._id}`, {}, {
      headers: { Authorization: `Bearer ${token}` },
      method: 'POST'
    })
      .then(response => {
        alert(`Added to Favorites!`)
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Container fluid>
      <Row>
        <Col className="movie-poster value"><img className="movie-poster-img" src={movie.ImagePath} /></Col>
      </Row>
      <Row className="movie-title">
        <Col style={{fontSize:"40px"}}>{movie.Title}</Col>
      </Row>
      <Row className="movie-props">
        <Col>
          <Row className="movie-description">
            <Col>Description: </Col>
          </Row>
          <Row className="movie-description-text">
            <Col className="value" md={12}>{movie.Description}</Col>
          </Row>
          <Row className="movie-genre">
            <Col className="label">Genre: </Col>
            <Col className="value" md={12}>
            <Link to={`/genres/${movie.Genre.Name}`}>
              <Button className="props-button" variant="link">{movie.Genre.Name}</Button>
            </Link>
            </Col>
          </Row>
          <Row className="movie-director">
            <Col className="label">Director: </Col>
            <Col className="value" md={12}>
            <Link to={`/directors/${movie.Director.Name}`}>
              <Button className="props-button" variant="link">{movie.Director.Name}</Button>
            </Link>
            </Col>
          </Row>
          <Row className="actors">
            <Col className="label">Actors: </Col>
          </Row>
          <Row>
            <Col className="value" md={12}>{movie.Actors}</Col>
          </Row>
        </Col>
      </Row>
      <Row className="buttons">
        <Button variant= 'danger' className="add-favorite-button" onClick={() => { this.onAddFavorite(movie._id) }}>Add Favorite</Button>
        <Button variant= 'danger' className="movie-view-button" onClick={() => { onBackClick(null); }}>Back</Button>
      </Row>
  </Container>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }),
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
};