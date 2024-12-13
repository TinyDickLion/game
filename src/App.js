import React, { useEffect, useRef } from "react";
import "./index.css";
import { PeraWalletProvider } from "./components/PeraWalletProvider";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/Navbar";
import Game from "./components/Game";
import HomePage from "./components/HomePage";
import Leaderboard from "./components/Leaderboard";
import GameDescription from "./components/GameDescription";
import TriviaContainer from "./components/TriviaContainer";
import PeraWalletTutorial from "./components/PeraWalletTutorial";
import * as THREE from "three";
import TurnGameStart from "./components/TurnGameStart";
import TicTacToe from "./components/TicTacToe";
import tdldVid from "./videos/tdld.mp4";

const App = () => {
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
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    const particleGeometry = new THREE.SphereGeometry(0.05, 16, 16);
    const particleMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
    const particles = Array.from({ length: 200 }, () => {
      const particle = new THREE.Mesh(particleGeometry, particleMaterial);
      particle.position.set(
        (Math.random() - 0.5) * 16, // Random X position
        4 - Math.random() * 8, // Start at random height
        (Math.random() - 0.5) * 16 // Random Z position
      );
      scene.add(particle);
      return particle;
    });

    const animate = () => {
      requestAnimationFrame(animate);
      particles.forEach((p) => {
        p.position.y -= 0.01; // Move particles downward
        p.rotation.x += 0.005;
        p.rotation.y += 0.005;
        if (p.position.y < -4) p.position.y = 4; // Reset particle to top
      });
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      mountRef?.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <Router>
      <NavBar />
      <video className="videoBackground" autoPlay loop muted playsInline>
        <source src={tdldVid} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="backgroundOverlay"></div>
      <div className="canvasContainer" ref={mountRef}></div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/match-3-mania" element={<Game />} />
        <Route path="/trivia-takedown" element={<TriviaContainer />} />
        <Route path="/duel-arena" element={<TurnGameStart />} />
        <Route path="/tic-tac-toe" element={<TicTacToe />} />
        <Route path="/rewards-game-guide" element={<GameDescription />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/learn-pera-wallet" element={<PeraWalletTutorial />} />
      </Routes>
    </Router>
  );
};

export default App;
