import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap';
import { hasIn } from 'lodash';
import './VideoListItem.css';

class VideoListItem extends Component{


    render(){
            return(<div>
                {this.props.video.map(item => {
                    const { videoId, channelId, playlistId, kind } = item.id;
                    let videoSrc;
                    hasIn(item.id, 'playlistId') ? console.log('ma to cos') : console.log('nie ma tego');
                    if(hasIn(item.id, 'videoId')){
                        videoSrc = videoId;
                    } else if (hasIn(item.id, 'channelId')){
                        videoSrc = channelId;
                    } else if(hasIn(item.id, 'playlistId')){
                        videoSrc = playlistId;
                    }
                    const { url, height } = item.snippet.thumbnails.default;
                    const { title } = item.snippet;
                    let coverUrl = {
                        backgroundImage: hasIn(item.snippet.thumbnails.default, 'url') ? `url(${url})` : 'url(notProvided)',
                    };
                    return(
                    <ListGroup key={item.etag}
                    >
                        <ListGroupItem className='video_list_item'>
                            <Row className='show-grid'>
                                <Col md={6}>
                                    <div className='video_list-thumbnail'
                                         style={coverUrl}
                                         onClick={() => this.props.playVideo(videoSrc, kind)}
                                    ></div>
                                </Col>
                                <Col md={6}><span>{title}</span></Col>
                            </Row>
                        </ListGroupItem>
                    </ListGroup>)
            })}
            </div>
            )
    }
}

export default VideoListItem;

