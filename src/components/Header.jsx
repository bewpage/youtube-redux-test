import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import SearchBar from "./SearchBar";
import './Header.css';

class Header extends Component {
    render() {
        return (
            <header className='header'>
                <Row className='show-grid'>
                    <Col xs={12}>
                        <h1 className='App'>Hello, Wiki!</h1>
                        <h4 className='App'>Let's watch YouTube Yeah...</h4>
                    </Col>
                </Row>
                <SearchBar
                    data={this.props.data}
                />
            </header>
        );
    }
}

export default Header;
