// import React from "react";

// export default function Box(){
//     return <mesh rotation={[90,0,20]}>
//         <boxBufferGeometry attach="geometry" args={[3,3,3]}/>
//         <meshLambertMaterial attach="material" color="blue"/>
//     </mesh>
// } 

import { createRoot } from 'react-dom/client'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
 
export default function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
//   useFrame((state, delta) => (mesh.current.rotation.x += 0.01))
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <>
    <mesh
    rotation={[90,0,20]}
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      position={[props.x,props.y,-1]}
      onPointerOut={(event) => setHover(false)}>
      
      <boxGeometry args={[1, 1, 1]}  />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'}  opacity={0.1} transparent/>
    </mesh>
    
        </>
  )
}