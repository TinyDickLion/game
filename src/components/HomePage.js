import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import * as THREE from "three";
import HomePageStyles from "./css_modules/HomePageStyles.module.css";

const HomePage = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Three.js scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Responsive resize handling
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    // Create floating particles (or crystals)
    const particleGeometry = new THREE.SphereGeometry(0.05, 16, 16);
    const particleMaterial = new THREE.MeshBasicMaterial({ color: 0x8844ee });
    const particles = Array.from({ length: 60 }, () => {
      const particle = new THREE.Mesh(particleGeometry, particleMaterial);
      particle.position.set(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8
      );
      scene.add(particle);
      return particle;
    });

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      particles.forEach((p) => {
        p.position.y += 0.002; // Upward drift effect
        p.rotation.x += 0.005;
        p.rotation.y += 0.005;
        if (p.position.y > 4) p.position.y = -4;
      });
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
      mountRef?.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className={HomePageStyles.container}>
      {/* Three.js Canvas Container */}
      <div className={HomePageStyles.canvasContainer} ref={mountRef}></div>

      {/* Welcome Text and Start Button */}
      <div className={HomePageStyles.content}>
        <h1 className={HomePageStyles.title}>
          Welcome to Tiny Dick Lion's Den Games!
        </h1>
        <br></br>
        <div style={{ backgroundColor: "white", padding: "1em" }}>
          <p className={HomePageStyles.description}>
            Embark on an exciting journey to earn rewards and reaching high
            scores. Are you ready?
          </p>
        </div>
        <br></br>
        <div className={HomePageStyles.buttonContainer}>
          <Link to="/match-3-mania" className={HomePageStyles.button}>
            Start
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
