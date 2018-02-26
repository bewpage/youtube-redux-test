import React, { Component } from 'react';
import { Row, Col, FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';
import './SearchBar.css';

class SearchBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            search: '',
        };

        console.log('test in search', this.props)
    }

    getValidationState = () => {
        const length = this.state.search.length;
        if (length > 1) {
            return 'success';
        }
        else if (length > 0) {
            return 'error';
        }
        return null;
    };

    handlerAnyInputChange = (event, nameInState) => {
        this.setState({
            [nameInState]: event.target.value,
        })
    };

    search = (event) => {
        event.preventDefault();
        if ( this.getValidationState() === 'success'){
            const { search } = this.state;
            // console.log('search', search);
            this.props.data(search);
        }
            this.setState({search: ''});

    };

    render(){
        return (
            <Row className='show-grid'>
                <Col xs={12}>
                    <form
                        className='search_bar'
                    >
                        <FormGroup
                            controlId='formBasicText'
                            validationState={this.getValidationState()}
                        >
                            <InputGroup>
                                <InputGroup.Button>
                                    <Button className='search_btn'
                                            type='submit'
                                            onClick={this.search}
                                    ><i className='fas fa-search'></i></Button>
                                </InputGroup.Button>
                                <FormControl
                                    type="text"
                                    value={this.state.search}
                                    placeholder='search'
                                    onChange={event => this.handlerAnyInputChange(event, 'search')}

                                />
                            </InputGroup>
                        </FormGroup>
                    </form>
                </Col>
            </Row>
        )
    }
}

export default SearchBar;