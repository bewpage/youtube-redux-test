import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { isEmpty, hasIn } from 'lodash';
import VideoList from "./VideoList";
import './VideoDetail.css';



class VideoDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            videoSrc: '',
            videoKind:''
        }
    }

    videoToPlay = (videoSrc, videoKind) => {
      console.log('callback is videoSrc', videoSrc);
      console.log('callback is videoKind', videoKind);
      this.setState({
          videoSrc,
          videoKind
      });
    };


    render(){
        // console.log('test videoSrc', this.state.videoSrc);
        // console.log('test videoKind', this.state.videoKind);
        // console.log('this.state', this.state.videoKind);
        // console.log('this.state', hasIn(this.state, 'playlist'));
        const URL_VIDEO = 'https://www.youtube.com/embed/';
        const URL_Playlist = 'http://www.youtube.com/embed?listType=playlist&amp;list=';
        let videoSrcLink = this.state.videoKind ==='youtube#playlist' ? `${URL_Playlist}${this.state.videoSrc}` : `${URL_VIDEO}${this.state.videoSrc}`;
        // let videoSrcLink = `${URL_VIDEO}${this.state.videoSrc}`;
        let iFrameElement = isEmpty(this.state.videoSrc) ? <div className='App'>Start searching</div> : <div className="embed-responsive embed-responsive-16by9">
            <iframe className="embed-responsive-item" src={videoSrcLink} allowFullScreen></iframe>
        </div>;
        console.log('videoSrcLink', videoSrcLink);
        return(
            <Row className='show-grid'>
                <Col mdHidden lgHidden xs={12} sm={4} className='video_container borderBox'>
                    <div className='video_window borderBox'>Video Box</div>
                </Col>
                <Col mdHidden lgHidden xs={12} sm={8} className='borderBox'>
                    <div className='video_text'>Video Description</div>
                </Col>
                <Col xsHidden smHidden md={8} className='borderBox'>
                    {iFrameElement}
                </Col>
                <Col xsHidden smHidden md={4} className='borderBox'>
                    <VideoList video={this.props.video || []}
                               playVideo={this.videoToPlay}
                    />
                </Col>
            </Row>
        )
    }
}

export default VideoDetail;