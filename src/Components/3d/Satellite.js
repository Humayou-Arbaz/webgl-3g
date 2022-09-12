import React, { useRef ,useState,useEffect} from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from 'three';

let n = 0;
const time_movement = 3; //how many seconds the animation will take

export default function Satellite({position, scroll, animation,...props}) {
    const sat                  = useRef()
    const { nodes, materials } = useLoader(GLTFLoader,"/satellite.glb");


useEffect(()=>{
  materials.communication_satellite_solar_panels_Mat.transparent = true
  materials.communication_satellite_dish_Mat.transparent = true
  materials.Material.transparent = true
}, [])

useEffect(
  ()=>{
    if(window.scrollY < 600) n=0
  },
  [scroll]
);

useFrame((state, delta)=>{
  switch(parseInt(animation)){
    case 0:
            // sat.current.position.set(0,0,0);
            n = 0;
            Object.values(materials).forEach(
              (mat) => {
                // console.log(mat.opacity)
                // we dont care how long it takes to disappear
                Math.max(0, mat.opacity -= delta);
                if(mat.opacity <= 0) sat.current.rotation.z=Math.PI/2
              }
            );

            break;
    case 1:
            if(n<time_movement){
              n+=delta;
              Object.values(materials).forEach(
                (mat) => {
                  // console.log(mat.opacity)
                  mat.opacity = n/time_movement;
                }
              );

              //Satellite rotation speed
              sat.current.rotation.z= THREE.MathUtils.lerp(
                Math.PI/2, // start more or less at 90deg to the left
                0,         // end more or less on the very top
                n/time_movement
              )

              // the "start position" is x=-3, y=3
              // and it ends in x=0, y=0
              // and it will take time_movement seconds
              sat.current.position.x = THREE.MathUtils.lerp(
                -3, // start in the edge of the screen
                 0, // end in the center of the screen
                 n/time_movement
              )
              // sat.current.position.y = THREE.MathUtils.lerp(
              //    4, // start in the edge of screen
              //    1, // end a bit above middle
              //    n/time_movement
              // )
              sat.current.position.z = THREE.MathUtils.lerp(
                 -4, // start in the edge of screen
                 0, // end a bit above middle
                 n/time_movement
              )
            }
            break;
    // case 2:
    //         //particles
    //         break;
    // case 3:
    //         //wireframe ship
    //         break;
    // case 4:
    //         //wireframe ship with triangle particles
    //         break;
    // case 5:
    //         // wireframe ship, triangle particles, grid floor, text stuff
    //         break;
    // case 6:
    //         // wireframe ship, wave floor, test stuff
    //         break;
    // case 7:
    //         //nothing
    //         break;
    default:
            sat.current.position.set(0, 0, 0);
            sat.current.rotation.z = 0;
            Object.values(materials).forEach(
              (mat) => {
                // console.log(mat.opacity)
                if(mat.opacity<1) mat.opacity += delta;
              }
            );
            break;
  }
})


  return (
    <group
      ref      ={sat}
      position ={[0,0,0]}  //satelliter arc center
    >
      <group
        position ={[0,0.5,0]} // CHANGE satellite position 0, Y , 0
        scale    ={0.0021}    // CHANGE satellite size
        dispose  ={null}
        rotation ={[0.9,3.9,0.0]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.communication_satellite_dish.geometry}
          material={materials.communication_satellite_dish_Mat}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          position ={[0,0,0]}
          geometry={nodes.communication_satellite_solar_panels.geometry}
          material={materials.communication_satellite_solar_panels_Mat}
          rotation={[Math.PI / 2, 0, 0]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/satellite.glb");
