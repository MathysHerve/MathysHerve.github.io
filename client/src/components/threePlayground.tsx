import React, { RefObject, useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { gsap } from "gsap";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

class SceneManager {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private targetX: number = 0;
  private targetY: number = 0;
  private debug?: boolean;
  public refContainer: RefObject<HTMLDivElement>;

  constructor(refContainer: RefObject<HTMLDivElement>, debug?: boolean) {
    this.refContainer = refContainer;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.renderer = new THREE.WebGLRenderer();
    this.debug = debug;

    if (debug) {
      const size = 10;
      const divisions = 10;

      const gridHelper = new THREE.GridHelper(size, divisions);
      this.scene.add(gridHelper);
    }

    this.init();
  }

  private init(): void {
    this.setupResize();
    this.setupText();
    this.setupCamera();
    // this.setupControls();
    this.setupEnvironment();
    this.setupLights();

    this.createRenderRef();
    this.animate();
  }

  private setupResize(): void {
    window.addEventListener("resize", () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });

    window.addEventListener("mousemove", (event: MouseEvent) => {
      // Calculate normalized position of the mouse (-1 to +1)
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = (event.clientY / window.innerHeight) * 2 - 1;

      // Map the mouse position to the rotation rang
      this.targetX = -0.1 * mouseY;
      this.targetY = -0.2 * mouseX;
    });

    window.addEventListener("keydown", (event) => {
      if (event.key === " ") {
        console.log(this.camera.rotation.y); // 0.41 - -0.41 for y
      }
    });
  }

  private animate(): void {
    const _this = this;

    function animate(): void {
      requestAnimationFrame(animate);
      const dampingFactor = 0.05;
      _this.camera.rotation.x +=
        (_this.targetX - _this.camera.rotation.x) * dampingFactor;
      _this.camera.rotation.y +=
        (_this.targetY - _this.camera.rotation.y) * dampingFactor;
      // Update camera rotation

      _this.renderer.render(_this.scene, _this.camera);
    }
    animate();
  }

  private setupText(): void {
    const loader = new FontLoader();

    loader.load("roboto.json", (font) => {
      const geometry = new TextGeometry("Hi, I'm Mathys", {
        font: font,
        size: 0.8,
        height: 0.005,
      });
      const material = new THREE.MeshStandardMaterial({ color: 0x000000 });
      const textMesh = new THREE.Mesh(geometry, material);
      textMesh.position.set(-4, 0, 0); // Adjust position as needed
      textMesh.castShadow = true;
      this.scene.add(textMesh);
    });
  }

  private setupCamera(): void {
    this.camera.position.z = 10;
    this.camera.position.x = 0;
  }

  private setupLights(): void {
    const light = new THREE.AmbientLight(0xffffff, 1); // soft white light
    this.scene.add(light);

    const directionalLight = new THREE.SpotLight(0xffffff, 300);
    // directionalLight.castShadow = true;
    directionalLight.position.set(0, 15, 15);
    this.scene.add(directionalLight);

    if (this.debug) {
      this.scene.add(new THREE.SpotLightHelper(directionalLight));
    }
  }

  public createRenderRef(): void {
    this.renderer.setClearColor(0x000000);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setPixelRatio(2);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.refContainer.current &&
      this.refContainer.current.childNodes.length == 0 &&
      this.refContainer.current.appendChild(this.renderer.domElement);
  }

  private setupEnvironment(): void {
    const floorGeometry = new THREE.PlaneGeometry(100, 100);
    const floorMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      specular: 0x050505,
      shininess: 100,
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2; // Rotate to lie flat
    floor.position.y = -15;
    floor.receiveShadow = true;
    this.scene.add(floor);

    // Walls
    const wallMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      specular: 0x050505,
      shininess: 100,
    });
    const wallGeometry = new THREE.PlaneGeometry(100, 60);

    // Back wall
    const backWall = new THREE.Mesh(wallGeometry, wallMaterial);
    backWall.position.z = -10;
    backWall.position.y = 2;
    backWall.receiveShadow = true;
    this.scene.add(backWall);

    // Left wall
    const leftWall = new THREE.Mesh(wallGeometry, wallMaterial);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.x = -50;
    leftWall.position.y = 2;
    leftWall.receiveShadow = true;
    this.scene.add(leftWall);

    // Right wall
    const rightWall = new THREE.Mesh(wallGeometry, wallMaterial);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.position.x = 50;
    rightWall.position.y = 2;
    rightWall.receiveShadow = true;
    this.scene.add(rightWall);
  }
}

const ThreePlayground = () => {
  let refContainer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const sm = new SceneManager(refContainer);
  }, []);
  return (
    <>
      <div className="three ">
        <div ref={refContainer}></div>
      </div>
      <div className="scroll-section"></div>
      <div className="scroll-section"></div>
    </>
  );
};

export default ThreePlayground;
