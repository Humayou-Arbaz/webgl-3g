
import React, { useRef, useEffect, useState, useMemo} from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from 'three';

const white = new THREE.Color(0xffffff);
const solid_transparent_material = new THREE.MeshStandardMaterial({
  color: 0xf0f0f0,
  transparent: true,
});
const solid_background_material = new THREE.MeshStandardMaterial({
  color: 0x000000,
  wireframe: false,
  transparent: false,
});
const wireframe_material = new THREE.MeshStandardMaterial({
  color: 0x0289b9,
  wireframe: true,
  opacity: 1,
  transparent: true
});

export default function Boc({
  scale,
  position,
  rotation,
  animation
}) {

 const { nodes, materials }  = useLoader(GLTFLoader,"/ship.glb");
 const shipRender            = useRef();
 const [opacity, setOpacity] = useState(0);
 const shipSolidMaterial     = useMemo(
   ()=>{
     switch(parseInt(animation)){
       case 3:
       case 4:
       case 5:
          return solid_background_material;
       default: return solid_transparent_material;
     }
   },
   [animation]
 );
 const shipWireMaterial      = useMemo(()=>wireframe_material);
 const materialEffect        = useMemo(
  ()=>({
    opacity: 0,
    delta  : 0,
    color  : new THREE.Color(0x0289b9),
    // material: new MeshBasicMaterial(0xfffff)
  }),
  []
);

const data = useMemo(
  ()=>(
  <group
      scale   ={scale}
      position={position} >
    <group rotation={[Math.PI / 2, 0, -Math.PI/5]}  ref={shipRender}>
      <mesh
        geometry={nodes["uploads_files_2658646_MSC_Black_Container_Ship_(1)_1"].geometry}
        material={shipSolidMaterial}
      />
      <mesh
        geometry={nodes["uploads_files_2658646_MSC_Black_Container_Ship_(1)_2"].geometry}
        material={shipSolidMaterial}
      />
      <mesh
        geometry={nodes["uploads_files_2658646_MSC_Black_Container_Ship_(1)_3"].geometry}
        material={shipSolidMaterial}
      />
      <mesh
        geometry={nodes["uploads_files_2658646_MSC_Black_Container_Ship_(1)_4"].geometry}
        material={shipSolidMaterial}
      />


      <mesh
        geometry={nodes["uploads_files_2658646_MSC_Black_Container_Ship_(1)_1"].geometry}
        material={shipWireMaterial}

      />
      <mesh
        geometry={nodes["uploads_files_2658646_MSC_Black_Container_Ship_(1)_3"].geometry}
        material={shipWireMaterial}
      />
      <mesh
        geometry={nodes["uploads_files_2658646_MSC_Black_Container_Ship_(1)_4"].geometry}
        material={shipWireMaterial}
      />
    </group>
  </group>
))

// console.log("boc", animation)
useFrame((state, delta) => {
  const fdelta = delta*1.5; // animation speed = delta * time in seconds (1.0 = 1 sec)
  if(shipRender.current){
    // shipRender.current.rotation.z += 0.125*delta;
    switch(parseInt(animation)){
      case 0:
          shipSolidMaterial.opacity=Math.max(0, shipSolidMaterial.opacity-(fdelta) );
          shipWireMaterial.opacity=0;
          break;

      case 1:
          shipSolidMaterial.opacity=Math.min(shipSolidMaterial.opacity+(fdelta), 1);
          shipWireMaterial.opacity=0;
          // solid_material.color.r = (1+Math.sin(state.clock.getElapsedTime())) / 2
          break;
      case 2:
          shipSolidMaterial.opacity=Math.min(shipSolidMaterial.opacity+(fdelta), 1);
          shipWireMaterial.opacity=Math.max(shipWireMaterial.opacity-(fdelta), 0);
          // shipWireMaterial.opacity=0;
          break;
      // case 3:
      // case 4:
      default:

          shipSolidMaterial.opacity=Math.max(shipSolidMaterial.opacity-(fdelta),0);
          // shipSolidMaterial.color.lerp()
          shipWireMaterial.opacity =Math.min(shipWireMaterial.opacity+(fdelta), 1);
          // wireframe_material.color.r = (1+Math.sin(state.clock.getElapsedTime())) / 2
          break;
    }
 }
})



  return (
    data
  );
}

useGLTF.preload("/ship.glb");
