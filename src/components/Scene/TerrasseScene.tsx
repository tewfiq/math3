import { useEffect, useRef, useState } from 'react';

interface TerrasseSceneProps {
  highlightCut?: boolean;
}

function isWebGLSupported(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')
    );
  } catch {
    return false;
  }
}

export function TerrasseScene({ highlightCut = false }: TerrasseSceneProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [webglAvailable] = useState(() => isWebGLSupported());
  const [loaded, setLoaded] = useState(false);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!webglAvailable || !canvasRef.current) return;

    let cancelled = false;

    async function init() {
      const THREE = await import('three');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { OrbitControls } = await import(
        'three/examples/jsm/controls/OrbitControls.js'
      );

      if (cancelled || !canvasRef.current) return;

      const container = canvasRef.current;
      const W = container.clientWidth || 400;
      const H = 280;

      // Renderer
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(W, H);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      // Scene
      const scene = new THREE.Scene();

      // Camera
      const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
      camera.position.set(8, 7, 10);
      camera.lookAt(0, 0, 0);

      // Lights
      scene.add(new THREE.AmbientLight(0xffffff, 0.6));
      const dirLight = new THREE.DirectionalLight(0xffffff, 0.9);
      dirLight.position.set(5, 10, 7);
      scene.add(dirLight);

      // ── Terrasse composite ──
      // Main slab (8 × 5m, extruded 0.12m thick) minus 2×2 corner
      const shape = new THREE.Shape();
      shape.moveTo(0, 0);
      shape.lineTo(8, 0);
      shape.lineTo(8, 5);
      shape.lineTo(2, 5);  // cut corner start
      shape.lineTo(2, 3);
      shape.lineTo(0, 3);
      shape.lineTo(0, 0);

      const extrudeSettings = {
        depth: 0.12,
        bevelEnabled: false,
      };
      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      geometry.center();

      const material = new THREE.MeshLambertMaterial({ color: 0xc8b99a });
      const slab = new THREE.Mesh(geometry, material);
      slab.rotation.x = -Math.PI / 2;
      slab.position.y = 0;
      scene.add(slab);

      // Cut area overlay (2×2 transparent red if highlighting)
      if (highlightCut) {
        const cutGeo = new THREE.BoxGeometry(2, 0.15, 2);
        const cutMat = new THREE.MeshLambertMaterial({
          color: 0xe55555,
          transparent: true,
          opacity: 0.4,
        });
        const cutMesh = new THREE.Mesh(cutGeo, cutMat);
        cutMesh.position.set(3, 0.02, -1.5);
        scene.add(cutMesh);
      }

      // Grid helper
      const grid = new THREE.GridHelper(16, 16, 0xaaaaaa, 0xdddddd);
      grid.position.y = -0.07;
      scene.add(grid);

      // Controls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.maxPolarAngle = Math.PI / 2.1;
      controls.minDistance = 6;
      controls.maxDistance = 20;

      if (!cancelled) setLoaded(true);

      // Animate
      let animId: number;
      function animate() {
        animId = requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      }
      animate();

      // Resize observer
      const ro = new ResizeObserver(() => {
        if (!container) return;
        const w = container.clientWidth;
        renderer.setSize(w, H);
        camera.aspect = w / H;
        camera.updateProjectionMatrix();
      });
      ro.observe(container);

      cleanupRef.current = () => {
        cancelled = true;
        cancelAnimationFrame(animId);
        ro.disconnect();
        controls.dispose();
        renderer.dispose();
        container.removeChild(renderer.domElement);
      };
    }

    init();

    return () => {
      cleanupRef.current?.();
    };
  }, [webglAvailable, highlightCut]);

  if (!webglAvailable) {
    return (
      <div
        style={{
          borderRadius: '12px',
          overflow: 'hidden',
          backgroundColor: '#F0F4FF',
          border: '1px solid var(--color-border)',
          padding: '1rem',
          textAlign: 'center',
          color: 'var(--color-text-muted)',
          fontSize: '0.875rem',
        }}
        role="img"
        aria-label="Schéma de la terrasse : rectangle 8m × 5m avec un carré 2m × 2m découpé dans un angle"
      >
        <svg
          viewBox="0 0 200 140"
          style={{ width: '100%', maxWidth: '300px', display: 'block', margin: '0 auto' }}
          aria-hidden="true"
        >
          {/* Main rectangle */}
          <rect x="20" y="20" width="160" height="100" fill="#c8b99a" stroke="#8B7355" strokeWidth="2" />
          {/* Cut corner */}
          <rect x="20" y="20" width="40" height="40" fill="#F8F7F4" stroke="#8B7355" strokeWidth="1.5" strokeDasharray="4 2" />
          {/* Labels */}
          <text x="100" y="135" textAnchor="middle" fontSize="11" fill="#6B7280">8 m</text>
          <text x="8" y="75" textAnchor="middle" fontSize="11" fill="#6B7280" transform="rotate(-90 8 75)">5 m</text>
          <text x="38" y="45" textAnchor="middle" fontSize="9" fill="#C94C4C">2 m</text>
        </svg>
        <p style={{ marginTop: '0.5rem' }}>Vue 2D — WebGL non disponible</p>
      </div>
    );
  }

  return (
    <div
      style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden' }}
      aria-label="Vue 3D interactive de la terrasse. Glissez pour faire pivoter."
    >
      {!loaded && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#F0F4FF',
            borderRadius: '12px',
            color: 'var(--color-text-muted)',
            fontSize: '0.875rem',
          }}
          aria-live="polite"
        >
          Chargement de la scène 3D…
        </div>
      )}
      <div
        ref={canvasRef}
        style={{ width: '100%', height: '280px', borderRadius: '12px' }}
      />
      <p
        style={{
          textAlign: 'center',
          fontSize: '0.75rem',
          color: 'var(--color-text-muted)',
          marginTop: '0.25rem',
        }}
        aria-hidden="true"
      >
        Glissez pour faire pivoter · Pincez pour zoomer
      </p>
    </div>
  );
}
