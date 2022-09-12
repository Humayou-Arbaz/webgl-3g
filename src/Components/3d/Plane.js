// import React, { useRef } from "react";
// import { useGLTF } from "@react-three/drei";
// import { useFrame,useLoader } from "@react-three/fiber";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// export function Plane(props) {
//   const ran = useRef()
//   const { nodes, materials } = useLoader(GLTFLoader,"/ship.glb");
//   useFrame((state)=>{
//     if(ran.current)
//     console.log("Sacs", console.log(nodes,materials))
//   })
//   return (
//     <group {...props} dispose={null} ref={ran}>
//       {/* <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Plane.geometry}
//         material={nodes.Plane.material}
//       /> */}
//     </group>
//   );
// }

// useGLTF.preload("/grid.glb");

// import React, { useRef } from "react";
// import { useGLTF } from "@react-three/drei";

// export  function Plane(props) {
//   const { nodes, materials } = useGLTF("/grid.glb");
//   return (
//     <group {...props} dispose={null}>
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Plane.geometry}
//         material={nodes.Plane.material}
//       />
//     </group>
//   );
// }

// useGLTF.preload("/grid.glb");


import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame,useLoader } from "@react-three/fiber";
export function Plane(props) {
const { nodes, materials } = useGLTF("/grids.glb");
const def = useRef()
useFrame((state)=>{
  console.log("SACs",def.current.material)
  def.current.material.transparent = true
  // def.current.material.wireframe = true
  def.current.material.opacity = 0.1

})

return (
   <>
    {/* <group {...props} position={[0.1,-2,0.5]} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane.geometry}
        material={nodes.Plane.material}
        scale={[2.59, 1, 0.85]}
      />
    </group> */}
    <gridHelper args={[4,20]}  scale={[1.59, 0.5, 0.85]} position={[0,-2,0]} ref={def}/>
   </>
  );
}

useGLTF.preload("/grids.glb");