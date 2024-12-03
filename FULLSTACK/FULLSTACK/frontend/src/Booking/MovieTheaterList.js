import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import CardGroup from 'react-bootstrap/CardGroup';
import AppNavBar from "../BasicUI/AppNavBar";
import Footer from "../BasicUI/Footer";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import '../Styling/MovieTheaterList.css'

const styles = {
    card: {
        borderRadius: 55,
        padding: '1.5rem',
    }
}

class MovieTheaterList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movieTheaters: [],
            searchQuery: ''
        };
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(query) {
        this.setState({ searchQuery: query.toLowerCase() });
    }

    componentDidMount() {
        fetch('/app')
            .then(response => response.json())
            .then(data => this.setState({ movieTheaters: data }));
    }


    render() {
        window.scrollTo(0, 0);
        const { movieTheaters, searchQuery } = this.state;
        
        const filteredTheaters = movieTheaters.filter(theater => {
            const theaterMatches = theater.name.toLowerCase().includes(searchQuery) ||
                                 theater.location.toLowerCase().includes(searchQuery);
            
            const movieMatches = theater.movieList.some(movie => 
                movie.name.toLowerCase().includes(searchQuery)
            );
            
            return theaterMatches || movieMatches;
        });

        const theaterList = filteredTheaters.map(theater => {
            return <CardGroup className="pt-5" key={theater.id}>
                <Card className="mx-5 mb-4 theater-card" style={styles.card}>
                    <Row>
                        <Col xs={12} md={4} lg={7} className="text-center px-5">
                            <Card.Body className='py-4'>
                                <h2 className="theater-name">{theater.name}</h2>
                                <Card.Text className="theater-location">
                                    {theater.location} {theater.city}
                                </Card.Text>
                                <q className="theater-description">
                                    {theater.description}
                                </q>
                            </Card.Body>
                            <Button className="see-movie-btn">
                                <Link to={"/" + theater.id.toString()} className="btn-link" style={{textDecoration: 'none'}}>See a Movie</Link>
                            </Button>
                        </Col>
                        <Col className='text-center'>
                            <Card.Title className='now-showing'>Now Showing</Card.Title>
                            <Row>
                                {Array.from({ length: 3 }).map((_, idx) => (
                                    <Col key={idx}>
                                        <Link to={"/" + theater.id.toString()} style={{ textDecoration: 'none' }}>
                                            <div className='movie-preview-container'>
                                                <div className='text-center'>
                                                    <img src={theater.movieList[idx].image} height="200px" className="movie-preview" />
                                                </div>
                                                <div className='text-center mt-2 movie-title'>
                                                    {theater.movieList[idx].name}
                                                </div>
                                            </div>
                                        </Link>
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                    </Row>
                </Card>
            </CardGroup>
        });

        return (

            <div>
                <AppNavBar onSearch={this.handleSearch} />
                <Container fluid className='card-outline'>
                    <div className="welcome-banner">
                        <h1>WELCOME TO CINEMA</h1>
                        <p>Experience movies like never before</p>
                    </div>
                    {theaterList}
                </Container>
                <Footer />
            </div>

        );
    }



}

export default MovieTheaterList;