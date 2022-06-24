// js
import React from 'react';
import YouTube from 'react-youtube';

//let VideoId = "Y3HPkXHxS_s";
let opts = {
    height: '390',
    width: '640',
    playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
    },
};

export default class YuTub extends React.Component {  
    componentDidUpdate(prevProps) {
        if (this.props.data !== prevProps.data) {
    //this.fetchData(this.props.userID);
  }
    }
    render() {
        return (
        <div>
            {
            this.props.data && (
                <YouTube videoId={this.props.data} opts={opts} onReady={this._onReady} onEnd={this.props.vidEnd} />
                ) 
            }
        </div>
        )
    //return <YouTube videoId="Tn21l5YMxd0" opts={opts} onReady={this._onReady} />
    }   
  _onReady(event) {
    // access to player in all event handlers via event.target
    //event.target.pauseVideo();
      event.target.playVideo();
    }
    _onEnd(event) {
        //event.target.playVideo();
        this.props.vidEnd();
    // access to player in all event handlers via event.target
    //event.target.pauseVideo();
    // viId = "bzJDimvPW1Y";
    // opts = {
    //   height: '390',
    //   width: '640',
    //   playerVars: {
    //     // https://developers.google.com/youtube/player_parameters
    //     autoplay: 1,
    //   },
    // };  
        //this.setState({ VideoId: "bzJDimvPW1Y"});
        //event.target.playVideo();
    }
}