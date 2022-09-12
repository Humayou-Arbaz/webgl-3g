import React, { useRef, useState,Suspense, useEffect } from 'react'
import Home from './Components/Layout/Home.js';
import FancyGraphic from './Components/3d/FancyGraphic.js'

function getPageHeight(scroll){
  return Math.floor(
    ( scroll
      / (
            window.innerHeight
        ||  document.documentElement.clientHeight
        ||  document.body.clientHeight
      )
    )
  ).toFixed();
}

export default function App(){
  const [getFloor, setFloor]    = useState("0")

  const containerRef = useRef();

  // function scrollHandler(e){
  //   setFloor(window.scrollY)
  // }

  useEffect(()=>{

    if(!window.onscroll) window.addEventListener(
      "scroll",
      (e)=>setFloor(getPageHeight(window.scrollY))
    );
  }, []);

  return (

    <>
      <div
        ref={containerRef}
        style={{
          alignItems: "flex-start",
          justifyContent: "space-around",
          height: "500vh",
          backgroundColor: "#0a1c2e",
          position: "relative",
          top: "0px"
        }}
      >

        <FancyGraphic scroll={getFloor}/>

        <div style={{
          position: "fixed",
          color: "#ffffff",
          top: "10vh",
          left: "2em"
        }}>
          <div style={{
          	display: "block",
          	width:   "2em",
          	height:  "2em",
          	margin:  "25px auto 0",
            textAlign: "center",
            verticalAlign: "middle",
            lineHeight: "2em",
          	borderRadius: "50%",
            background: "radial-gradient(circle at 65% 15%, white 1px, aqua 3%, darkblue 60%, aqua 100%)"
          }}>
            {'0'+(parseInt(getFloor)+1)}
            <div style={{
              position: "relative",
              top: "-10px",
              borderLeft: "3px solid white",
              marginLeft: "50%",
              transition: "height 0.3s ease-out",
              height: `${500-(getFloor*100)}px`
            }}></div>
            {'05'}
          </div>
        </div>
      </div>


      <Home floor={getFloor} />


    </>
  );
}

// <div
// id="debug"
// style={{
//   overflow: "visible",
//   color: "#808080",
//   zoom: "50%",
//   position: "fixed",
//   top: "0px",
//   left: "0px",
//   width: "600px",
//   height: "400px",
//   backgroundColor: "white",
//   zIndex: "1000"
// }}>
// henlo</div>
