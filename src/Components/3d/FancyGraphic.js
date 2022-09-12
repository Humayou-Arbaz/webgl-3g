import {Canvas,extend, useThree,useFrame} from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Boc from './Boc'
import Marker from './Marker';
import { DragControls } from 'three/examples/jsm/controls/DragControls'
import * as THREE from "three"
import React, { useRef, useState,Suspense, useEffect, useMemo } from 'react'
import Satellite from './Satellite';
import Particles from './Particles';



const Scene = ({scroll}) => {

  let animationIndex = useMemo(()=>parseInt(scroll)+1, [scroll]);
  const def = useRef()

  const {
    camera,
    gl: { domElement },
  } = useThree()

  const type = [
    "not showing",
    "boc fadein, satellite from far to center",
    "particles from boc to satellite",
    "satellite still, boc wireframe",
    "pyramid particles from sat to boc",
    "?",
    "???"
  ];
useFrame((state, delta)=>{
  if(def.current){
    def.current.material.transparent= true
    if(animationIndex >=4 ) {
      def.current.material.opacity = Math.min(
        def.current.material.opacity + delta,
        1)
    } else {
      def.current.material.opacity = Math.max(
        def.current.material.opacity - delta,
        0)
    }
    if(animationIndex <=3 ) {
      def.current.material.opacity = 0
    }

    // console.log(scroll)
  }
  // if(scroll==0){
    camera.position.z=5;
    camera.position.y=2;
    camera.lookAt(0,0,0)
  // }
})
  // document.getElementById("debug").innerHTML=`
  //   animation: ${animationIndex}<br/>
  //   ${type[animationIndex]}`;

  return (
    <>
      <Particles
          animation = {animationIndex} />
      <Satellite
          scroll    = {scroll}
          animation = {animationIndex} />
      <Boc
          scroll = {scroll}
          scale     = {0.015}
          position  = {[0,-1.6,0.6]}
          animation = {animationIndex} />
    {animationIndex <= 3
      ? <Marker
          show      = {true}
          animation = {animationIndex} />
      : ""}
    {animationIndex >= 3
        ? <gridHelper
            args={[4,18]}
            scale={[1.59, 0.5, 0.85]}
            position={[0,-1.7,0]}
            opacity={0}
            transparent={true}
            ref={def} />
        : "" }
    </>
  )
}


export default function FancyGraphic({scroll}){

  return (
    <Canvas
      className='canvas'
      style={{
        height: "100vh",
        position: "sticky",
        top: "0px",
        left: "0px"
      }}>
        <ambientLight intensity={0.5}/>
        <directionalLight position={[4,5,2]}  intensity={1} />
        <Suspense fallback={null}>
          <Scene scroll={scroll} />
        </Suspense>
      </Canvas>
  );
  // <OrbitControls enableZoom={false} onChange={false} onEnd={false} onStart={false}/>
}
