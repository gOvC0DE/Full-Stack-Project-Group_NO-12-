import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../Styling/BasicUI.css';

const Footer = () => {
    return (
        <footer className="footer">
            <Container fluid>
                <Row className="justify-content-center">
                    <Col xs={12} md={4} className="text-center">
                        <div className="feature-circle">
                            <span>4K</span>
                            <div className="feature-label">Resolution</div>
                        </div>
                    </Col>
                    <Col xs={12} md={4} className="text-center">
                        <div className="feature-circle">
                            <span>3D</span>
                            <div className="feature-label">Experience</div>
                        </div>
                    </Col>
                    <Col xs={12} md={4} className="text-center">
                        <div className="feature-circle">
                            <span>DTS</span>
                            <div className="feature-label">Sound</div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;