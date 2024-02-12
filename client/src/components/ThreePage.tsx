import React, { useEffect, useRef } from "react";
import * as THREE from "three";
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

    // Helper
    const size = 10;
    const divisions = 10;

    const gridHelper = new THREE.GridHelper(size, divisions);
    scene.add(gridHelper);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 10;
    camera.position.x = 10;

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
    controls.autoRotate = false;
    controls.enablePan = true;
    controls.enableZoom = true;

    // Geometry Sphere
    const geometry = new THREE.SphereGeometry(3, 64, 64);
    const material = new THREE.MeshStandardMaterial({ color: "#00ff83" });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Geometry Plane
    const plane = new THREE.PlaneGeometry(5, 15);
    const wire_plane = new THREE.WireframeGeometry(plane);
    const line = new THREE.LineSegments(wire_plane);
    line.rotation.x = 1.57;
    scene.add(line);

    // Animation

    function animate() {
      requestAnimationFrame(animate);

      // required if controls.enableDamping or controls.autoRotate are set to true
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    const tl = gsap.timeline({ defaults: { duration: 1 } });
    tl.fromTo(sphere.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });
    tl.fromTo("nav *", { y: "-300%" }, { y: "0%" }, "<");
    tl.fromTo("h1", { opacity: 0 }, { opacity: 1 }, "<");

    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    function moveBall() {
      const t = document.body.getBoundingClientRect().top;

      // tl.seek(t * -0.001);
      // tl.pause();

      // if (t < -200) {
      //   tl.reverse();
      // } else {
      //   tl.play();
      // }

      // camera.position.x = t * -0.0006 + 10;
      // camera.position.z = t * -0.03 + 10;
      // camera.position.y = t * -0.003;
      // camera.rotation.y = t * -0.02;
      // camera.updateProjectionMatrix();
    }
    document.body.onscroll = moveBall;
  }, []);

  return (
    <>
      <div className="three ">
        <h1 className="sphere-title">try scrolling</h1>
        <div ref={refContainer}></div>
      </div>
      <div className="scroll-section"></div>
      <div className="scroll-section"></div>
    </>
  );
};

export default ThreePage;
