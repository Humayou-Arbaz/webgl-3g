import React, {useRef,useEffect, useState} from 'react'
import { Instance, shaderMaterial } from '@react-three/drei';
import glsl from 'babel-plugin-glsl/macro';
import * as THREE from "three";
import { extend, useFrame } from '@react-three/fiber';
import { Clock } from 'three';
import { Plane } from './Plane';

let magic = 0;

function Marker({animation}) {

const shaderRef = useRef()
const def = useRef()

const WaveShaderMaterial = shaderMaterial(
  // Unifrom
  {
    time: 0.5,
    USE_UV: " ",
    opacity: 1.0,
    phase: new THREE.InstancedBufferAttribute(new Float32Array([5]), 1)
  },
  //Vertex Shader
  glsl`
  varying vec2 vUv;
  attribute float phase;
  varying float vPhase;

  #include <common>
  #include <uv_pars_vertex>
  #include <uv2_pars_vertex>
  #include <envmap_pars_vertex>
  #include <color_pars_vertex>
  #include <fog_pars_vertex>
  #include <morphtarget_pars_vertex>
  #include <skinning_pars_vertex>
  #include <logdepthbuf_pars_vertex>
  #include <clipping_planes_pars_vertex>

  void main() {

        vUv = uv;

        vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

        // gl_Position = projectionMatrix * mvPosition;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  //Fragment Shader
  glsl`
  uniform float time;
  varying float vPhase;
  uniform vec3 diffuse;
  varying vec2 vUv;

  uniform float opacity;

#ifndef FLAT_SHADED
  varying vec3 vNormal;
#endif

#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
#include <packing>

void main() {
  #include <clipping_planes_fragment>

  vec2 lUv = (vUv - 0.5) * 2.;
  float val = 0.;
  float lenUv = length(lUv);

  // val = max(val, 1. - step(0.25, lenUv)); // central circle
  float tShift = fract(time * 0.5 + vPhase);


    val = max(
      val,
      smoothstep(
        0.1 + (tShift * 0.2),
        0.5 + (tShift * 0.3) ,
        lenUv
      )
      - step(
        0.3 + (tShift * 0.3),
        lenUv
      )
    ); // outer circle


  val = max(
    val,
    smoothstep(
      0.2 + (tShift * 0.3),
      0.6 + (tShift * 0.3) ,
      lenUv
    )
    - step(
      0.45 + (tShift * 0.3),
      lenUv
    )
  ); // outer circle


  val = max(
    val,
    smoothstep(
      0.4 + (tShift * 0.6),
      0.5 + (tShift * 0.7),
      lenUv
    )
    - step(
      0.5 + (tShift * 0.5),
      lenUv
    )
  ); // ripple

  if (val < 0.1) discard;


  gl_FragColor = vec4(0, val, val, val*opacity);
}
`
)

extend({WaveShaderMaterial})

useFrame(({clock}, delta)=>{
  switch(parseInt(animation)){
    case 1:
    case 2:
      magic = Math.min(magic+delta, 1);
      break;
    case 3:
    case 4:
      magic = Math.max(magic-delta, 0);
      break;
    case 0:
    case 5:
      magic = -1;
      break;
  }

  if(!shaderRef.current) return //console.log("nope");
  shaderRef.current.uniforms.time.value    = clock.getElapsedTime()
  shaderRef.current.uniforms.opacity.value = magic;

})

  if(parseInt(animation) >= 4 ) return ""

  return (
    <mesh rotation={[Math.PI/2, Math.PI, -1]} position={[0,-1.8,0]}>
      <planeGeometry args={[4.5,4.5]} />
      <waveShaderMaterial
          key={WaveShaderMaterial.key}
          attach="material"
          ref={shaderRef}
          transparent={true} />
    </mesh>
  )
}

export default Marker
