// js
import React from 'react';
import YouTube from 'react-youtube';

// Parametros del video via Youtube Embed function
let opts = {
    height: '390',
    width: '640',
    playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
    },
};

// Actualiza el front al recibir un nuevo video
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
                // Funcion principal
                <YouTube videoId={this.props.data} opts={opts} onReady={this._onReady} onEnd={this.props.vidEnd} />
                ) 
            }
        </div>
        )
    }   

    // Evento del autoplay, curiosamente despues de la reproduccion inicial funciona
    // Sin necesidad de mutear el video

  _onReady(event) {
    // access to player in all event handlers via event.target
    //event.target.pauseVideo();
      event.target.playVideo();
    }

    // Funcion para el siguiente video por Props
    _onEnd(event) {
        //event.target.playVideo();
        this.props.vidEnd();

    // Pruebas para cambiar el video mediante props
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