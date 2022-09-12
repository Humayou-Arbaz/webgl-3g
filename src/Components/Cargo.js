import React, { useRef,useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function Cargo(props) {
  const { nodes, materials } = useGLTF("/das.glb");
  const maro = useRef()
  const [color , setColor] = useState("#0289B9")

  useFrame((state) =>{
    console.log("yakkaa", maro.current)
    if(maro.current){
        setColor("white")
        // materials["Material #25"].transparent = true
        // materials["Material #26"].transparent = true
        // materials["Material #25"].transparent = true 
        // materials["Material #25"].opacity = 0.3
        // materials["Material #26"].opacity = 0.3
        // materials["Material #25"].opacity = 0.3
        // materials.shiptail.opacity = 0.3
        // materials.Material.opacity = 0.3
    }
      })
  return (
    <group {...props} position={[0,-1.6,0.6]}
    rotation={[0,-2.1,0.03]} dispose={null} ref={maro}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Ship.geometry}
        material={materials["Material #25"]}
        material-color={color}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Fence.geometry}
          material={materials["Material #26"]}
          material-color={color}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Containers.geometry}
          material={materials["Material #25"]}
          material-color={color}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/das.glb");