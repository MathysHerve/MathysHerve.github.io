import React, { useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { gsap } from "gsap";

const ThreePage = () => {
  const refContainer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (refContainer.current && refContainer.current.childNodes.length > 0) {
      // If it already has child nodes, do not append renderer.domElement again
      return;
    }
    // Scene Work
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 20;

    // Lights
    const light = new THREE.PointLight(0xffffff, 100, 100);
    light.position.set(0, 10, 10);
    scene.add(light);

    // Rendering
    const renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000);
    renderer.setPixelRatio(2);
    renderer.setSize(window.innerWidth, window.innerHeight);
    refContainer.current &&
      refContainer.current.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.autoRotate = true;
    controls.enablePan = false;
    controls.enableZoom = false;

    // Geometry
    const geometry = new THREE.SphereGeometry(3, 64, 64);
    const material = new THREE.MeshStandardMaterial({ color: "#00ff83" });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    function animate() {
      requestAnimationFrame(animate);

      // required if controls.enableDamping or controls.autoRotate are set to true
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    const tl = gsap.timeline({ defaults: { duration: 1 } });
    tl.fromTo(sphere.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });
    tl.fromTo("nav", { y: "-100%" }, { y: "0%" });
    tl.fromTo("h1", { opacity: 0 }, { opacity: 1 });

    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      tl.seek(0);
    });
  }, []);

  return (
    <Container fluid>
      <h1 className="sphere-title">give it a spin</h1>
      <div
        style={{ position: "absolute", zIndex: -1 }}
        ref={refContainer}
      ></div>
    </Container>
  );
};

export default ThreePage;
