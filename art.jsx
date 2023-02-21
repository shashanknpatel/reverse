import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const Galaxy = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas });

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505);

    const camera = new THREE.PerspectiveCamera(
      75,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    const stars = new THREE.Group();
    scene.add(stars);

    const createStar = () => {
      const geometry = new THREE.SphereGeometry(0.15, 24, 24);
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(Math.random(), 1, 0.8),
      });

      const star = new THREE.Mesh(geometry, material);
      star.position.set(
        Math.random() * 100 - 50,
        Math.random() * 100 - 50,
        Math.random() * 100 - 50
      );
      stars.add(star);
    };

    for (let i = 0; i < 500; i++) {
      createStar();
    }

    const animate = () => {
      requestAnimationFrame(animate);

      stars.rotation.x += 0.001;
      stars.rotation.y += 0.001;

      renderer.render(scene, camera);
    };

    animate();
  }, []);

  return <canvas ref={canvasRef} />;
};

export default Galaxy;
