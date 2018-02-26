import React, { Component } from 'react';
import { ListGroup} from 'react-bootstrap';
import VideoListItem from './VideoListItem';
import './VideoList.css';

class VideoList extends Component{

    render(){
        return(
            <ListGroup>
                <VideoListItem video={this.props.video || []}
                               playVideo={this.props.playVideo}
                />
            </ListGroup>
        )
    }
}

export default VideoList;