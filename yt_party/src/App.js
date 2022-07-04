import React, { useState, useRef, useEffect } from 'react';
import styled  from 'styled-components';
import axios from 'axios';
import YuTub from './YuTub.js'
import "@capaj/videojs-youtube";

// Estilos 
const MainPage = styled.section`
    align-items: center;
`;
const TweetContainer = styled.div`
    background-color: #282c34;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 1vmin);
    color: white;
`;
const TweetSlide = styled.div`
    z-index: 5;
`;
const TweetAct = styled.div`
    //position: absolute;
    //top: 0;
    left: 0; 
    bottom: 1rem;
    width: 100%;
    height: 100%;
    //display: flex;
    align-items: center;
    //justify-content: center;
`;
const UserImage = styled.img`
    border: 0.2rem;
    border-style: solid;
    border-color: #000000;
    border-radius: 4px;
    position: absolute;
    top: 0.7rem;
    left: 0.7rem; 
    width: 5vw;
    height: 5vw;
    max-height: 10vw;
    object-fit: cover;
    box-shadow: 5rem;
`;
const TweetInfo = styled.div`
    position: relative;
    justify-content: center;
    z-index: 10;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 80%;
    max-width: 1600px;
    width: calc(100% -100px);
    color: #000000;
    background-color: white;
    box-shadow: #000000;
    box-shadow: 5px;

    h1{
        //font-size: clamp(1rem, 8vw, 2rem);
        font-family: "Medium";
        padding-left: 8rem;
        font-size: 8;
        font-weight: 400;
        text-transform: uppercase;
        text-shadow: 0px 0px 20px rgba(0,0,0,0.4);
        text-align: left;
        margin-bottom: 0.3rem;
    }
    p{
        font-family: "Light";
        margin-left: 8rem;
        margin-right: 0.5rem;
        font-size: 4;
        margin-bottom: 1.2rem;
        text-shadow: 0px 0px 20px rgba(0,0,0, 0.4);
    }
`;

// Main 
const App = () => {

  // Objetos y setters
  const [length, setLength] = useState(0);
  const [newVid, setNew] = useState(false); 
  const [loading, setLoad] = useState(true); 
  const [current, setCurrent] = useState(0);
  const [Jtwitts, setData] = useState(null);
  const [PlayList, setList] = useState([0]);
  const tooLong = useRef(null);

  // Primer carga de la API
  useEffect(() => {
    //axios.get("http://localhost:3006/").then(response => {
    axios({
      method: 'get',
      url: `http://localhost:3006/`,
      withCredentials: false
    }).then(response => {
      //console.log(response?.data);
      //console.log(response?.data.length);
      setLength(response?.data.length);
      setData(response?.data);
      setLoad(false);
    })
  }, [loading]);

  // useEffect(() => {
  //   const getNewData = () => {
  //     axios({
  //       method: 'get',
  //       url: `http://localhost:3006/`,
  //       withCredentials: false
  //     }).then(response => {
  //       let prevLengt = response?.data.length;
  //       if (prevLengt > length) {
  //         setNew(true);
  //         setLength(prevLengt);
  //       }
  //       console.log("Updated");
  //       length = response?.length();
  //       setData(response?.data);
  //     })
  //   };
  //   // timeout.current = setInterval(getNewData, 10000);
  //   // return function () {
  //   //         if (timeout.current) {
  //   //             clearInterval(timeout.current);
  //   //         }
  //   //     };
  //   // timeout.current = setTimeout(getNewData, 10000);
  //   // return function () {
  //   //         if (timeout.current) {
  //   //             clearTimeout(timeout.current);
  //   //         }
  //   //     };
  // }, [Jtwitts, current])
  
  useEffect(() => {
    // Funcion asincrona de cmbio de video por timeout
    // entro de la uncion use effect para anunciar el cambio en el front
    const getNewData = () => {
      axios({
        method: 'get',
        url: `http://localhost:3006/`,
        withCredentials: false
      }).then(response => {
        let prevLengt = response?.data.length;
        if (prevLengt > length) {
          setNew(true);
          setLength(prevLengt);
        }
        console.log("Updated");
        setLength(response?.data.length);
        setData(response?.data);
      })
    };

    const vidEnd = () => {
      if (!newVid) {
        //setCurrent(current => (current === length - 1 ? 0 : current + 1));
        setCurrent(getNextVid());
        getNewData();
      }
      else {
        setNew(false);
        setCurrent(length - 1);
        getNewData();
      }
    };
    tooLong.current = setTimeout(vidEnd,300000);
    
    return function () {
            if (tooLong.current) {
                clearTimeout(tooLong.current);
            }
        };
  }, [Jtwitts,current])

  // Funciones de cambio de video por llamada vidEnd
  const getNewData = () => {
      axios({
        method: 'get',
        url: `http://localhost:3006/`,
        withCredentials: false
      }).then(response => {
        let prevLengt = response?.data.length;
        if (prevLengt > length) {
          setNew(true);
          setLength(prevLengt);
        }
        console.log("Updated");
        setLength(response?.data.length);
        setData(response?.data);
      })
  };
  const vidEnd = () => {
    if (tooLong.current) {
            clearTimeout(tooLong.current);
    }
    
    if (!newVid) {
      //setCurrent(current => (current === length - 1 ? 0 : current + 1));
      setCurrent(getNextVid());
      getNewData();
    }
    else {
      setNew(false);
      setCurrent(length - 1);
      getNewData();
    }
  };

  // Funcion para simuolar lista de reproduccion aleatoria
  const getNextVid=()=>{
    if(PlayList.length<2){
      setList([0]);
      for (let i = 1; i < length; i++){
        setList(PlayList.push(i));
      }
      let next=Math.floor(Math.random()*(PlayList.length));
      let vidNow=PlayList[next];
      PlayList.splice(next,1);
      //console.log(PlayList);
      setList(PlayList);
      return vidNow;
    }
    else{
      let next=Math.floor(Math.random()*(PlayList.length));
      let vidNow=PlayList[next];
      PlayList.splice(next,1);
      //console.log(PlayList);
      setList(PlayList);
      return vidNow;
    }
  };

  if (loading) {
    return (<MainPage>
          <TweetContainer>
              <h1>Cargando...</h1>
          </TweetContainer>
      </MainPage>);
  } 
  else {
    return (<MainPage>
      <TweetContainer>
        {Jtwitts.map((tweetNow, index) => {
                    return (
                        <TweetSlide key={index}>
                            {index === current && (
                          <TweetAct>
                            <div>
                              <YuTub data={tweetNow?.vidUrl} vidEnd={ vidEnd } /> 
                            </div>
                            {/* <YuTub data={tweetNow?.vidUrl} vidEnd={ vidEnd } /> */}
                            <TweetInfo>
                              <UserImage src={tweetNow?.userPicURL} alt="imagen"/>
                              <h1>{tweetNow?.userName}</h1>
                              <p>{tweetNow?.userText}</p>
                            </TweetInfo>
                          </TweetAct>
                        )}
                      </TweetSlide>
                    );
                })}
          </TweetContainer>
  </MainPage>);
  }
}

export default App;