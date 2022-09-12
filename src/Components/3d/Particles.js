import React, { useRef, useState, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const animation_time = 5;
const tempColor      = new THREE.Color()
const data           = Array.from(
      { length: 10 },
      () => ({
        color: Math.random() * 0xffffff,
        scale: 1
      })
    );

export default function Particles({animation}){
  const mesh      = useRef();
  const count     = 10;

  const colorArray = useMemo(
    () => Float32Array.from(
      new Array(count)
        .fill()
        .flatMap(
          (_, i) => tempColor
                      .set(data[i].color)
                      .toArray()
        )
    ),
    [count]
  );

  useEffect(
    ()=>{
      if(animation == 2){
        particles.forEach(
          (p, i) => {
            tempColor
              .set(0xFFFFFF)
              .toArray(colorArray, i*3);
            mesh.current.geometry.attributes.color.needsUpdate = true;
          }
        )
        return;
      }
      if(animation >= 4 ){
        particles.forEach(
          (p, i) => {
            tempColor
              .set(Math.random()*0xFFFFFF)
              .toArray(colorArray, i*3);
            mesh.current.geometry.attributes.color.needsUpdate = true;
          }
        )
      }
    },
    [animation]
  );

  const particles = useMemo(
    () => {
      const temp = [];
      for (let i = 0; i < count; i++) {
        const time   = THREE.MathUtils.randFloat( 0,    animation_time);;
        const factor = THREE.MathUtils.randFloat( 0,    0.5 );
        const scale  = THREE.MathUtils.randFloat( 0.2, 1) ;
        const x      = THREE.MathUtils.randFloat(-1.5,  1.5);
        const y      = THREE.MathUtils.randFloat(-0.6,  0.6);
        const z      = THREE.MathUtils.randFloat(-1,    0);

        temp.push({ time, factor, scale, x, y, z });
      }
      return temp;
    },
    [count]
  );

  const dummy = useMemo(() => new THREE.Object3D(), []);


  useFrame(
    (state, delta)=>{
      let rotation = false;
      switch(parseInt(animation)){
        default:
              particles.forEach(
                (p, i) => {
                  dummy.position.set(0,0,10);
                  dummy.updateMatrix();
                  mesh.current.setMatrixAt(i, dummy.matrix)
                }
              );
              mesh.current.instanceMatrix.needsUpdate = true;
              break;
        case 4:
        case 5:
        case 6:
              //TODO: add colors for cone particles
              particles.forEach(
                (p, i) => {
                  p.time += delta
                  if(p.time>animation_time){
                     p.time -= animation_time;

                     tempColor
                        .set(Math.random()*0xFFFFFF)
                        .toArray(colorArray, i*3);
                     mesh.current.geometry.attributes.color.needsUpdate = true;
                   }

                  dummy.position.y = THREE.MathUtils.lerp(
                    0.5, //start
                    -2, //end
                    p.time/animation_time
                  );
                  dummy.position.z = THREE.MathUtils.lerp(
                    0, //start
                    p.z, //end
                    p.time/animation_time
                  );
                  dummy.position.x = THREE.MathUtils.lerp(
                      0, //start
                      p.x, //end
                      p.time/animation_time
                    );

                  dummy.rotation.x += p.factor * delta;
                  dummy.rotation.y += p.factor * delta;
                  dummy.rotation.z += p.factor * delta;

                  dummy.scale.setScalar(1);

                  dummy.updateMatrix();

                  mesh.current.setMatrixAt(i, dummy.matrix)
                }
              );
              mesh.current.instanceMatrix.needsUpdate = true;
              break;
        case 2:
              //TODO: add colors for cone particles
              particles.forEach(
                (p, i) => {
                  p.time += delta
                  if(p.time>animation_time){
                     p.time -= animation_time;

                     tempColor
                        .set(0xFFFFFF)
                        .toArray(colorArray, i*3);
                     mesh.current.geometry.attributes.color.needsUpdate = true;
                   }

                  dummy.position.z = THREE.MathUtils.lerp(
                    p.z, //start
                    0,   //end
                    p.time/animation_time
                  );
                  dummy.position.y = THREE.MathUtils.lerp(
                    -2, //start
                    0.5,  //end  SHOULD be the same as satellite ref position Y
                    p.time/animation_time
                  );
                  dummy.position.x = (
                    THREE.MathUtils.lerp(
                      p.x, //start
                      0,   //end
                      p.time/animation_time
                    )
                    + (Math.cos(p.time*4)*0.155)
                  );


                  dummy.rotation.x = 0;
                  dummy.rotation.y = 0;
                  dummy.rotation.z = 0;

                  dummy.scale.x = p.scale;
                  dummy.scale.y = p.scale;
                  dummy.scale.z = p.scale;

                  dummy.updateMatrix();
                  mesh.current.setMatrixAt(i, dummy.matrix)
                }
              );

              mesh.current.instanceMatrix.needsUpdate = true;
              break;
      }
    }

  );

  // <dodecahedronBufferGeometry args={[1, 0]} />
  // return (
  //   <mesh ref={mesh} >
  //     <boxGeometry args={[1,1,1]} />
  //     <meshBasicMaterial color="#ffffff" />
  //   </mesh>
  // );
  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      {
        parseInt(animation) === 2
          ? (
            <boxBufferGeometry  args={[0.1,0.1,0.1]} >
              <instancedBufferAttribute
                attach="attributes-color"
                args={[colorArray, 3]} />
            </boxBufferGeometry>
          )
          : (
            <coneBufferGeometry args={[0.1,0.1,3]} >
              <instancedBufferAttribute
                attach="attributes-color"
                args={[colorArray, 3]} />
            </coneBufferGeometry>
          )
      }
      <meshBasicMaterial
        vertexColors
        toneMapped={false}
        wireframe={parseInt(animation) !== 2}
      />
    </instancedMesh>
  )
}
