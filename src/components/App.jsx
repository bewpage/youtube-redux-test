import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import VideoDetail from "./VideoDetail";
import Header from "./Header";
import YOUR_API_KEY from './../config.js';
import './App.css';

const YTSearch = (request) => {
    const API_KEY = YOUR_API_KEY;
    const API_URL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&';
    const API_REQUEST = `${API_URL}q=${request}&key=${API_KEY}`;

    return fetch(API_REQUEST)
        .then(res => {
            return res.json();
        })
};


class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            video: {}
        };
        console.log('test constructor', this.state.video)
    }


    fetchDataFromSearch = (data) => {
        console.log('hello from fetchDataFromSearch', data);

        YTSearch(data)
            .then(d => {
                console.log('video', d);
                return this.setState({video: d})
            })
            .catch(e => console.log(e));

    };

    componentDidUpdate(){
        console.log('co tu jest state', this.state.video);
    }

    render() {
        return (
          <Grid className="main_container_temp borderBox">
              <Header
                  data={this.fetchDataFromSearch}
              />
              <VideoDetail video={this.state.video.items || []}/>
          </Grid>
        );
    }
}

export default App;
