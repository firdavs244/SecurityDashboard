import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const SystemArchitecture3D = ({ serverNodes, className = '' }) => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationFrameRef = useRef(null);
  const [selectedNode, setSelectedNode] = useState(null);

  useEffect(() => {
    if (!containerRef?.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer?.setSize(containerRef?.current?.clientWidth, containerRef?.current?.clientHeight);
    renderer?.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef?.current?.appendChild(renderer?.domElement);
    rendererRef.current = renderer;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene?.add(ambientLight);

    const pointLight = new THREE.PointLight(0x2c7a7b, 1, 100);
    pointLight?.position?.set(10, 10, 10);
    scene?.add(pointLight);

    const nodes = [];
    const connections = [];

    serverNodes?.forEach((node, index) => {
      const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
      const color = node?.status === 'healthy' ? 0x38a169 : 
                    node?.status === 'warning' ? 0xd69e2e : 0xe53e3e;
      const material = new THREE.MeshPhongMaterial({ 
        color, 
        transparent: true, 
        opacity: 0.8,
        wireframe: true
      });
      const cube = new THREE.Mesh(geometry, material);

      const angle = (index / serverNodes?.length) * Math.PI * 2;
      const radius = 8;
      cube.position.x = Math.cos(angle) * radius;
      cube.position.y = Math.sin(angle) * radius;
      cube.position.z = Math.sin(angle * 2) * 2;

      cube.userData = { nodeData: node, index };
      scene?.add(cube);
      nodes?.push(cube);
    });

    for (let i = 0; i < nodes?.length; i++) {
      const nextIndex = (i + 1) % nodes?.length;
      const points = [
        nodes?.[i]?.position,
        nodes?.[nextIndex]?.position
      ];
      const geometry = new THREE.BufferGeometry()?.setFromPoints(points);
      const material = new THREE.LineBasicMaterial({ 
        color: 0x2c7a7b, 
        transparent: true, 
        opacity: 0.3 
      });
      const line = new THREE.Line(geometry, material);
      scene?.add(line);
      connections?.push(line);
    }

    const particleCount = window.innerWidth < 768 ? 300 : 800;
    const particlesGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 30;
      particlePositions[i + 1] = (Math.random() - 0.5) * 30;
      particlePositions[i + 2] = (Math.random() - 0.5) * 30;
    }

    particlesGeometry?.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x2c7a7b,
      size: 0.05,
      transparent: true,
      opacity: 0.6
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene?.add(particles);

    let time = 0;
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      time += 0.01;

      nodes?.forEach((node, index) => {
        node.rotation.x += 0.005;
        node.rotation.y += 0.005;
        node.position.y += Math.sin(time + index) * 0.01;
      });

      particles.rotation.y += 0.0005;
      particles.rotation.x += 0.0002;

      renderer?.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!containerRef?.current) return;
      camera.aspect = containerRef?.current?.clientWidth / containerRef?.current?.clientHeight;
      camera?.updateProjectionMatrix();
      renderer?.setSize(containerRef?.current?.clientWidth, containerRef?.current?.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef?.current) {
        cancelAnimationFrame(animationFrameRef?.current);
      }
      if (rendererRef?.current && containerRef?.current) {
        containerRef?.current?.removeChild(rendererRef?.current?.domElement);
      }
      renderer?.dispose();
      nodes?.forEach(node => {
        node?.geometry?.dispose();
        node?.material?.dispose();
      });
      connections?.forEach(line => {
        line?.geometry?.dispose();
        line?.material?.dispose();
      });
      particlesGeometry?.dispose();
      particlesMaterial?.dispose();
    };
  }, [serverNodes]);

  return (
    <div className={`relative ${className}`}>
      <div ref={containerRef} className="w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-xl overflow-hidden bg-card/50" />
      {selectedNode && (
        <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-4 max-w-xs">
          <h4 className="font-heading font-semibold text-foreground mb-2">{selectedNode?.name}</h4>
          <div className="space-y-1 text-sm caption">
            <p className="text-muted-foreground">Status: <span className="text-foreground">{selectedNode?.status}</span></p>
            <p className="text-muted-foreground">CPU: <span className="text-foreground">{selectedNode?.cpu}%</span></p>
            <p className="text-muted-foreground">Memory: <span className="text-foreground">{selectedNode?.memory}%</span></p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SystemArchitecture3D;