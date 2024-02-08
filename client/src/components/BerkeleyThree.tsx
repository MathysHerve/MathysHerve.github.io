import React from 'react'
import { useEffect, useRef } from "react";
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const BerkeleyThree = () => {
    const refContainer = useRef<HTMLDivElement>(null);
    useEffect(() => {

    if (refContainer.current && refContainer.current.childNodes.length > 0) {
        // If it already has child nodes, do not append renderer.domElement again
        return;
        }
        var scene = new THREE.Scene();
        const darkBackground = new THREE.Color(0x212529);

       const loader = new GLTFLoader();
       loader.load( 'greek_structure.glb', function ( gltf ) {

            scene.add( gltf.scene );
        
            }, undefined, function ( error ) {
            console.error( error );
            } );

      scene.background = darkBackground;
      var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      var renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);

      refContainer.current && refContainer.current.appendChild( renderer.domElement );
      var geometry = new THREE.BoxGeometry(1, 1, 1);
      var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      var cube = new THREE.Mesh(geometry, material);
    //   scene.add(cube);
      camera.position.z = 5;
      var animate = function () {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
      };

      animate();
    }, []);
    return (
      <div style={{position: 'absolute', zIndex: -1}}ref={refContainer}></div>

    );
  }

export default BerkeleyThree