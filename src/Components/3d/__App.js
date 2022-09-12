// khass cheez ha, mahool yahan banaya ha
import './App.css';
import Home from './Components/Layout/Home.js';


import {Canvas,extend, useThree,useFrame} from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Boc from './Components/Boc'
import Marker from './Components/Marker';
import { DragControls } from 'three/examples/jsm/controls/DragControls'
import * as THREE from "three"
import React, { useRef, useState,Suspense, useEffect } from 'react'
import Satellite from './Components/Satellite';

extend({ DragControls })

const ex = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0xff00ff }))


const Scene = () => {

  const {
    camera,
    gl: { domElement }
  } = useThree()

  return (
    <>
     <Satellite    />
     <Boc scale={0.015} position={[0,-1.6,0.6]} rotation={[0.4,0.23,0.03]} />
     <Marker/>
    </>
  )
}

function App2() {
  const mesh = useRef()

  return (
    <div className="App">
      <Canvas className='canvas'>
        <ambientLight intensity={0.5}/>
        <directionalLight position={[4,5,2]}  intensity={1} />
        <Suspense fallback={null}>
          <Scene/>
        </Suspense>
        <OrbitControls enableZoom={false} onChange={false} onEnd={false} onStart={false}/>
      </Canvas>
    </div>
  );
}

function App(){
  return <Home/>;
}

export default App;
