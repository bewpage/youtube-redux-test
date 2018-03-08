import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { isEmpty } from 'lodash';
import VideoList from "./VideoList";
import CONFIG from "../config";
import './VideoDetail.css';



class VideoDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            videoSrc: '',
            videoKind:'',
            title:'',
            description:'',
            playlistItems: ''
        }
    }


    videoToPlay = (videoSrc, videoKind, title, description) => {
      // console.log('callback is videoSrc', videoSrc);
      // console.log('callback is videoKind', videoKind);
      this.setState({
          videoSrc,
          videoKind,
          title,
          description
      });

      if(videoKind === 'youtube#playlist'){
          console.log('video src test from fetch', videoSrc);
          this.testFetch(videoSrc);
      }else{
          this.setState({playlistItems: ''});
      }

    };



    testFetch = (data) => {

        const API_KEY = CONFIG.YOUR_API_KEY;
        const API_URL = CONFIG.API_URL;
        const API_MAX_RESULTS = 10;
        const API_URL_PLAYLIST_ITEMS = 'playlistItems?part=snippet';
        const API_PLAYLIST_ID = `playlistId=${data}`;
        const API_REQUEST_PLAYLIST = `${API_URL}${API_URL_PLAYLIST_ITEMS}&${API_PLAYLIST_ID}&maxResults=${API_MAX_RESULTS}&key=${API_KEY}`;

        if(data === ''){
            console.log('no playlist id')
        } else{
            fetch(API_REQUEST_PLAYLIST)
                .then(res => {
                    return res.json();
                })
                .then(list => {
                    console.log('test playlist items', list);
                    return this.setState({
                        playlistItems: list
                    })
                })
                .catch(e => console.log(e));
        }
    };


    render(){
        // console.log('test videoSrc', this.state.videoSrc);
        // console.log('test videoKind', this.state.videoKind);
        // console.log('test title', this.state.title);
        // console.log('test description', this.state.description);
        // console.log('test playlist items', this.state.playlistItems);
        const URL_VIDEO = 'https://www.youtube.com/embed/';
        const URL_Playlist = 'http://www.youtube.com/embed?listType=playlist&amp;list=';
        let videoSrcLink = this.state.videoKind ==='youtube#playlist' ? `${URL_Playlist}${this.state.videoSrc}` : `${URL_VIDEO}${this.state.videoSrc}`;
        const playlistItemsDetails = isEmpty(this.state.playlistItems) ?
            null :
            <ul>
            {this.state.playlistItems.items.map((items, id) => {
                const playlistItemTitle = items.snippet.title;
                return (
                    <li key={id} className='video_detail_playlist-items'>{playlistItemTitle}</li>
                )
            })}
        </ul>;
        const test = <div className='video_main-container'>
                <div className="video_detail-container embed-responsive embed-responsive-16by9">
                    <iframe className="embed-responsive-item" src={videoSrcLink} allowFullScreen title='youtube'></iframe>
                </div>
                <h4 className='video_detail-title'>{this.state.title}</h4>
                <h5 className='video_detail-info'>{this.state.description}</h5>
                <div>playlists title</div>
                {playlistItemsDetails}
            </div>;
        let iFrameElement = isEmpty(this.state.videoSrc) ? <div className='App'>Start searching</div> : test;
        return(
            <Row className='show-grid'>
                <Col xs={12} md={8}>
                    {iFrameElement}
                </Col>
                <Col xs={12} md={4}>
                    <VideoList video={this.props.video || []}
                               playVideo={this.videoToPlay}
                    />
                </Col>
            </Row>
        )
    }
}

export default VideoDetail;