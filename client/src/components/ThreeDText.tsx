import React, { RefObject, useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { gsap } from "gsap";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";

class SceneManager {
  private text: string;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private arrows?: THREE.Group<THREE.Object3DEventMap>;
  private targetX: number = 0;
  private targetY: number = 0;
  private debug?: boolean;
  private controls?: OrbitControls;
  public refContainer: RefObject<HTMLDivElement>;

  constructor(
    refContainer: RefObject<HTMLDivElement>,
    text: string,
    debug?: boolean
  ) {
    this.text = text;
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
    this.setupEnvironment();
    this.setupLights();
    this.setupScroll();

    this.setupControls();
    this.setupInteraction();
    this.createRenderRef();

    this.animate();
  }

  private setupControls(): void {
    if (this.debug) {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    }
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
  }

  private setupInteraction(): void {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseClick = (event: { clientX: number; clientY: number }) => {
      // Calculate mouse position in normalized device coordinates (-1 to +1) for both components
      const bounds = this.renderer.domElement.getBoundingClientRect();

      mouse.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      mouse.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;

      // Update the picking ray with the camera and mouse position
      raycaster.setFromCamera(mouse, this.camera);

      // Calculate objects intersecting the picking ray
      const intersects = raycaster.intersectObjects(this.scene.children, true);
      console.log(intersects);

      for (let i = 0; i < intersects.length; i++) {
        // If the clicked object is the one we're interested in
        if (intersects[i].object.name === "arrowshitbox") {
          // Scroll to a specific section
          console.log("Hit!");
          const sectionToScrollTo = document.getElementById("about"); // Make sure you have the correct ID
          sectionToScrollTo?.scrollIntoView({ behavior: "smooth" });

          // Break the loop if you've found your object
          break;
        }
      }
    };

    // Add event listener to the renderer's DOM element
    this.renderer.domElement.addEventListener("click", onMouseClick, false);
  }

  private animate(): void {
    const _this = this;

    if (this.arrows) {
      const tl = gsap.timeline({ defaults: { duration: 1 } });
      tl.to(this.arrows.position, {
        x: this.arrows.position.x,
        y: this.arrows.position.y - 0.2,
        z: this.arrows.position.z,
      });
      tl.to(this.arrows.position, {
        x: this.arrows.position.x,
        y: this.arrows.position.y,
        z: this.arrows.position.z,
      });
      tl.repeat(-1);
    }

    function animate(): void {
      requestAnimationFrame(animate);
      const dampingFactor = 0.05;
      _this.camera.rotation.x +=
        (_this.targetX - _this.camera.rotation.x) * dampingFactor;
      _this.camera.rotation.y +=
        (_this.targetY - _this.camera.rotation.y) * dampingFactor;
      // Update camera rotation
      if (_this.controls && _this.debug) {
        _this.controls.update();
      }

      _this.renderer.render(_this.scene, _this.camera);
    }

    animate();
  }

  private setupText(): void {
    const loader = new FontLoader();
    let textSize = window.innerWidth < 448 ? 0.5 : 0.8;
    let offset = window.innerWidth < 448 ? -2.2 : -3.5;

    loader.load("/three/roboto.json", (font) => {
      const geometry = new TextGeometry(this.text, {
        font: font,
        size: textSize,
        height: 0.005,
      });
      const material = new THREE.MeshStandardMaterial({ color: 0x000000 });
      const textMesh = new THREE.Mesh(geometry, material);
      textMesh.position.set(offset, 0, 0); // Adjust position as needed
      textMesh.castShadow = true;
      this.scene.add(textMesh);
    });
  }

  private setupScroll(): void {
    const group = new THREE.Group();
    const arrowDown = new THREE.Shape();

    arrowDown.moveTo(-1, 1);
    arrowDown.lineTo(0, 0);
    arrowDown.lineTo(1, 1);
    arrowDown.lineTo(0.9, 1.1);
    arrowDown.lineTo(0, 0.2);
    arrowDown.lineTo(-0.9, 1.1);

    const geometry = new THREE.ShapeGeometry(arrowDown);
    const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const arrow1 = new THREE.Mesh(geometry, material);
    const arrow2 = new THREE.Mesh(geometry, material);
    arrow2.position.y = -1;
    group.add(arrow1);
    group.add(arrow2);

    this.scene.add(group);
    group.position.y = -1.8;
    group.scale.x = 0.3;
    group.scale.y = 0.3;
    group.scale.z = 0.3;
    this.arrows = group;
    const planeGeometry = new THREE.PlaneGeometry(1, 1.1); // Set width and height to cover the text
    const planeMaterial = new THREE.MeshBasicMaterial({ visible: false });
    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);

    planeMesh.position.set(
      group.position.x,
      group.position.y - 0.1,
      group.position.z - 0.1
    );
    this.scene.add(planeMesh);
    planeMesh.name = "arrowshitbox";
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

interface Props {
  text: string;
}

const ThreeDText = ({ text }: Props) => {
  let refContainer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const sm = new SceneManager(refContainer, text);
  }, []);
  return (
    <div className="three title">
      <div ref={refContainer}></div>
    </div>
  );
};

export default ThreeDText;
