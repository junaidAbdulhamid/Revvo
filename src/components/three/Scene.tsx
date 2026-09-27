"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { ImprovedNoise } from "three/addons/math/ImprovedNoise.js";
import { CHEVRON_BOTTOM, CHEVRON_TOP } from "@/components/Logo";

/**
 * Real-time replacement for a pre-rendered hero video: a chrome Revvo mark floating over a
 * misty, rocky black-and-white landscape while the camera slowly pushes in and out.
 * "hero" shows the mark; "cta" is a low, wide shot of the glowing ridges with no mark.
 */
export default function Scene({ variant = "hero", className = "" }: { variant?: "hero" | "cta"; className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const isHero = variant === "hero";
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isSmall = window.innerWidth < 768;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSmall ? 1.5 : 1.75));
    renderer.setClearColor(0x010004);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = isHero ? 0.95 : 1.1;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.cssText = "width:100%;height:100%;display:block";

    const scene = new THREE.Scene();
    const horizon = new THREE.Color(isHero ? 0x55555c : 0x6a6a72);
    scene.fog = new THREE.FogExp2(horizon, isHero ? 0.0105 : 0.012);

    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;

    const camera = new THREE.PerspectiveCamera(isHero ? 35 : 40, 1, 0.1, 400);

    // Sky dome: black overhead fading to a misty grey glow at the horizon
    const sky = new THREE.Mesh(
      new THREE.SphereGeometry(200, 32, 16),
      new THREE.ShaderMaterial({
        side: THREE.BackSide,
        depthWrite: false,
        fog: false,
        uniforms: { top: { value: new THREE.Color(0x0a0a0d) }, bottom: { value: horizon } },
        vertexShader: `varying vec3 vPos; void main(){ vPos = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
        fragmentShader: `uniform vec3 top; uniform vec3 bottom; varying vec3 vPos;
          void main(){ float h = normalize(vPos).y; float t = smoothstep(0.0, 0.75, h);
          gl_FragColor = vec4(mix(bottom, top, pow(t, 0.7)), 1.0); }`,
      }),
    );
    scene.add(sky);

    // Rocky terrain
    const noise = new ImprovedNoise();
    const seg = isSmall ? 140 : 220;
    const terrainGeo = new THREE.PlaneGeometry(280, 280, seg, seg);
    terrainGeo.rotateX(-Math.PI / 2);
    const pos = terrainGeo.attributes.position as THREE.BufferAttribute;
    const colors = new Float32Array(pos.count * 3);
    const smooth = (a: number, b: number, x: number) => {
      const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
      return t * t * (3 - 2 * t);
    };
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const n = (s: number, o = 0) => noise.noise(x * s, z * s, o);
      const ridged = Math.pow(1 - Math.abs(n(0.045, 1.3)), 2.2);
      const detail = n(0.18, 4.1) * 1.3 + Math.abs(n(0.45, 7.7)) * 0.9 + Math.abs(n(1.2, 9.2)) * 0.3;
      const sideWidth = isHero ? 5 : 9;
      const sides = smooth(sideWidth, sideWidth + 20, Math.abs(x)) * (7 + 6 * n(0.03, 2.2));
      const far = smooth(-15, -90, z) * 10 * ridged;
      const h = ridged * 2.6 + detail + sides + far;
      pos.setY(i, -5 + h);
      const shade = 0.02 + Math.min(0.1, Math.max(0, h * 0.008)) + Math.abs(n(0.8, 3.3)) * 0.035;
      colors.set([shade, shade, shade * 1.02], i * 3);
    }
    terrainGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    terrainGeo.computeVertexNormals();
    const terrainMat = new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.95,
      metalness: 0,
      flatShading: true,
      envMapIntensity: 0.05,
    });
    scene.add(new THREE.Mesh(terrainGeo, terrainMat));

    // Lighting: cold moonlight from behind for rim highlights, plus a soft key on the mark
    scene.add(new THREE.HemisphereLight(0x9a9aa2, 0x050507, 0.18));
    const moon = new THREE.DirectionalLight(0xe8e8f0, 3.2);
    moon.position.set(-8, 14, -30);
    scene.add(moon);
    const key = new THREE.DirectionalLight(0xffffff, 0.7);
    key.position.set(6, 6, 10);
    scene.add(key);

    // The chrome Revvo mark
    const mark = new THREE.Group();
    const disposables: { dispose: () => void }[] = [terrainGeo, terrainMat, envTex, pmrem];
    if (isHero) {
      const toShape = (pts: [number, number][]) =>
        new THREE.Shape(pts.map(([x, y]) => new THREE.Vector2((x - 16) * 0.13, -(y - 17.5) * 0.13)));
      const bodyMat = new THREE.MeshPhysicalMaterial({
        color: 0x16161a,
        metalness: 1,
        roughness: 0.16,
        clearcoat: 1,
        clearcoatRoughness: 0.08,
        envMapIntensity: 1.4,
      });
      const edgeMat = new THREE.LineBasicMaterial({ color: 0xdadae0, transparent: true, opacity: 0.6 });
      disposables.push(bodyMat, edgeMat);
      [CHEVRON_TOP, CHEVRON_BOTTOM].forEach((pts, i) => {
        const geo = new THREE.ExtrudeGeometry(toShape(pts), {
          depth: 0.9,
          bevelEnabled: true,
          bevelThickness: 0.1,
          bevelSize: 0.07,
          bevelSegments: 5,
        });
        geo.translate(0, 0, -0.45 + (i === 1 ? -0.35 : 0));
        const mesh = new THREE.Mesh(geo, bodyMat);
        const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geo, 25), edgeMat);
        disposables.push(geo, edges.geometry);
        mark.add(mesh, edges);
      });
      mark.position.set(0, 1.1, 0);
      scene.add(mark);
    }

    // Drifting dust
    const dustCount = isSmall ? 250 : 600;
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPos.set([(Math.random() - 0.5) * 40, Math.random() * 12 - 4, (Math.random() - 0.5) * 40], i * 3);
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.045, transparent: true, opacity: 0.35, depthWrite: false });
    const dust = new THREE.Points(dustGeo, dustMat);
    scene.add(dust);
    disposables.push(dustGeo, dustMat);

    // Sizing
    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // Pull back on portrait screens so the mark stays framed
      camera.fov = (isHero ? 35 : 40) * (camera.aspect < 1 ? 1.45 : 1);
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(mount);
    resize();

    // Input: mouse parallax + scroll push-in
    const pointer = { x: 0, y: 0, sx: 0, sy: 0 };
    const onPointer = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    let visible = true;
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(mount);

    const t0 = performance.now();
    const lookAt = new THREE.Vector3();
    const easeInOut = (t: number) => t * t * (3 - 2 * t);
    let raf = 0;

    const render = () => {
      const t = reduceMotion ? 4 : (performance.now() - t0) / 1000;
      pointer.sx += (pointer.x - pointer.sx) * 0.04;
      pointer.sy += (pointer.y - pointer.sy) * 0.04;
      const rect = mount.getBoundingClientRect();
      const scrolled = Math.min(1, Math.max(0, -rect.top / Math.max(1, rect.height)));

      if (isHero) {
        // Intro fly-in over ~3.5s, then a slow 30s push-in/pull-out loop, plus extra push on scroll
        const intro = easeInOut(Math.min(1, t / 3.5));
        const loop = (1 - Math.cos((t / 30) * Math.PI * 2)) / 2;
        const z = 28 - intro * 10 - loop * 7 - scrolled * 5;
        camera.position.set(pointer.sx * 0.9 + Math.sin(t * 0.1) * 0.6, 1.5 - pointer.sy * 0.4 + loop * 0.2, z);
        lookAt.set(0, 1.1, 0);
        mark.rotation.y = Math.sin(t * 0.28) * 0.55 + Math.sin(t * 0.11) * 0.2;
        mark.rotation.x = Math.sin(t * 0.3) * 0.12 - 0.08;
        mark.rotation.z = Math.sin(t * 0.25) * 0.06;
        mark.position.y = 1.1 + Math.sin(t * 0.8) * 0.18;
      } else {
        camera.position.set(Math.sin(t * 0.05) * 3 + pointer.sx * 1.2, -1.2 - pointer.sy * 0.3, 22 - scrolled * 3);
        lookAt.set(0, 0.5, -40);
      }
      camera.lookAt(lookAt);
      dust.rotation.y = t * 0.01;
      dust.position.y = Math.sin(t * 0.2) * 0.3;
      renderer.render(scene, camera);
    };

    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (visible) render();
    };
    if (reduceMotion) render();
    else loop();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [variant]);

  return <div ref={mountRef} className={className} aria-hidden="true" />;
}
