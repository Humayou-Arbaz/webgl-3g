import React, { useState, useEffect } from 'react'
import ScreenContainer from './ScreenContainer.js';
import Header from "./Header";
import FancyGraphic from "../3d/FancyGraphic";
import img from '../../img/header.jpeg';


export default function Home({floor}){

  return (
    <div
      id="scrollElement"
      style={{
        width: "100%",
        overflow: "hidden",
        position: "absolute",
        top: "0px",
      }}
    >


      <ScreenContainer  font="" visible={floor==0}>
        <p>AI-driven optimization</p>
        <p className="title">maximun efficiency</p>
      </ScreenContainer>

      <ScreenContainer  visible={floor==1}>
        <p>We collect</p>
        <p className="title">vessel data</p>
      </ScreenContainer>

      <ScreenContainer visible={floor==2}>
        <p>We model the vessel fast and accurate using</p>
        <p className="title">AI</p>
      </ScreenContainer>

      <ScreenContainer  visible={floor==3}>
        <p>We optimise actionable</p>
        <p className="title">outcomes</p>
      </ScreenContainer>

      <ScreenContainer visible={floor==4}>
        <p>We create high-impact</p>
        <p className="title">suggestions</p>
      </ScreenContainer>

      <ScreenContainer visible={floor==5}>
        <p className="title">Voyage plans</p>
        <p>tailored to the exact performance profile of each of your vessels</p>
      </ScreenContainer>
    </div>
  );
}
