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
                    // hasIn(item.id, 'playlistId') ? console.log('ma to cos') : console.log('nie ma tego');
                    if(hasIn(item.id, 'videoId')){
                        videoSrc = videoId;
                    } else if (hasIn(item.id, 'channelId')){
                        videoSrc = channelId;
                    } else if(hasIn(item.id, 'playlistId')){
                        videoSrc = playlistId;
                    }
                    const { url, height, width } = item.snippet.thumbnails.default;
                    const { title, description, channelTitle } = item.snippet;
                    let videoContainerSize = {
                        width: width,
                        height: height,
                    };
                    let coverUrl = {
                        backgroundImage: hasIn(item.snippet.thumbnails.default, 'url') ? `url(${url})` : 'url(notProvided)',
                        width: width,
                        height: height,
                    };
                    return(
                    <ListGroup key={item.etag}
                    >
                        <ListGroupItem className='video_list_item'>
                            <Row className='show-grid'>
                                <Col xs={3} md={3}
                                     className='video_list_item-image-container borderBox'
                                     style={videoContainerSize}
                                >
                                    <div className='video_list-thumbnail'
                                         style={coverUrl}
                                         onClick={() => this.props.playVideo(videoSrc, kind, title, description)}
                                    ></div>
                                </Col>
                                <Col xs={9} md={9}>
                                    <div className='video_list_item-text-container'>
                                        <div className='video_list_item-title'>{title}</div>
                                        <div className='video_list_item-info'>{channelTitle}</div>
                                        <div className='video_list_item-description'>{description}</div>
                                    </div>
                                </Col>
                            </Row>
                        </ListGroupItem>
                    </ListGroup>)
            })}
            </div>
            )
    }
}

export default VideoListItem;

