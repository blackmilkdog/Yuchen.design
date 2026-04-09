"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  GLSL helpers: simplex 3D noise                                     */
/* ------------------------------------------------------------------ */

const simplexNoise = /* glsl */ `
  vec3 mod289(vec3 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 mod289(vec4 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 permute(vec4 x){ return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v){
    const vec2  C = vec2(1.0/6.0, 1.0/3.0);
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g  = step(x0.yzx, x0.xyz);
    vec3 l  = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod289(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j  = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x  = x_ * ns.x + ns.yyyy;
    vec4 y  = y_ * ns.x + ns.yyyy;
    vec4 h  = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
  }
`;

/* ------------------------------------------------------------------ */
/*  Sun core sphere – animated noisy surface                           */
/* ------------------------------------------------------------------ */

const sunVertexShader = /* glsl */ `
  ${simplexNoise}

  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vNoise;

  void main(){
    vNormal   = normalize(normalMatrix * normal);
    vPosition = position;

    float noise = snoise(position * 3.0 + uTime * 0.3) * 0.06
                + snoise(position * 6.0 - uTime * 0.5) * 0.03;
    vNoise = noise;

    vec3 displaced = position + normal * noise;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
  }
`;

const sunFragmentShader = /* glsl */ `
  ${simplexNoise}

  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vNoise;

  void main(){
    /* ---- fresnel (rim glow) ---- */
    vec3 viewDir = normalize(cameraPosition - vPosition);
    float fresnel = 1.0 - max(dot(vNormal, viewDir), 0.0);
    fresnel = pow(fresnel, 2.0);

    /* ---- animated surface noise colour ---- */
    float n1 = snoise(vPosition * 4.0 + uTime * 0.25) * 0.5 + 0.5;
    float n2 = snoise(vPosition * 8.0 - uTime * 0.4)  * 0.5 + 0.5;
    float pattern = mix(n1, n2, 0.4);

    vec3 coreWhite  = vec3(1.0, 0.98, 0.95);
    vec3 warmOrange  = vec3(1.0, 0.65, 0.2);
    vec3 deepAmber   = vec3(0.95, 0.4, 0.1);

    vec3 col = mix(coreWhite, warmOrange, fresnel * 0.7 + pattern * 0.25);
    col = mix(col, deepAmber, fresnel * fresnel * 0.5);

    /* ---- brightness boost at centre ---- */
    float brightness = 1.4 + (1.0 - fresnel) * 1.2;
    col *= brightness;

    gl_FragColor = vec4(col, 1.0);
  }
`;

/* ------------------------------------------------------------------ */
/*  Volumetric glow shell – large transparent sphere around the sun    */
/* ------------------------------------------------------------------ */

const glowVertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vWorldPos;

  void main(){
    vNormal   = normalize(normalMatrix * normal);
    vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const glowFragmentShader = /* glsl */ `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vWorldPos;

  void main(){
    vec3 viewDir = normalize(cameraPosition - vWorldPos);
    float rim = 1.0 - max(dot(vNormal, viewDir), 0.0);

    /* multi-layer glow falloff */
    float glow  = pow(rim, 2.5) * 0.9;
    float inner = pow(rim, 5.0) * 1.6;

    vec3 orange = vec3(1.0, 0.55, 0.1);
    vec3 amber  = vec3(1.0, 0.75, 0.3);
    vec3 col    = mix(amber, orange, rim) * (glow + inner);

    float alpha = glow * 0.7 + inner * 0.4;
    alpha = clamp(alpha, 0.0, 1.0);

    gl_FragColor = vec4(col, alpha);
  }
`;

/* ------------------------------------------------------------------ */
/*  Background grain full-screen quad                                  */
/* ------------------------------------------------------------------ */

const grainVertexShader = /* glsl */ `
  varying vec2 vUv;
  void main(){
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const grainFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec2  uResolution;
  varying vec2  vUv;

  /* fast hash-based noise */
  float hash(vec2 p){
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  void main(){
    /* ---- grain ---- */
    vec2 uv = gl_FragCoord.xy / uResolution;
    float grain = hash(uv * uResolution + fract(uTime * 60.0) * 1000.0);
    grain = (grain - 0.5) * 0.12;

    /* ---- warm atmospheric gradient (top → bottom) ---- */
    float grad = 1.0 - uv.y;                        // 0 at top, 1 at bottom
    vec3 warmTint = vec3(0.08, 0.04, 0.02) * grad;  // subtle warm fog

    /* ---- vignette ---- */
    vec2 center = uv - 0.5;
    center.x *= uResolution.x / uResolution.y;       // aspect correct
    float vig = 1.0 - smoothstep(0.3, 1.4, length(center) * 1.1);

    vec3 col = warmTint + grain;
    col *= mix(0.6, 1.0, vig);

    gl_FragColor = vec4(col, 1.0);
  }
`;

/* ------------------------------------------------------------------ */
/*  Dust particles – floating sparkles around the sun                  */
/* ------------------------------------------------------------------ */

function DustParticles() {
  const count = 180;
  const ref = useRef<THREE.Points>(null!);

  const { positions, sizes, speeds, phases } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const speeds = new Float32Array(count);
    const phases = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // distribute in a wide area around the sun
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.0 + Math.random() * 6.0;
      const height = (Math.random() - 0.3) * 5.0; // biased upward
      positions[i * 3]     = Math.cos(angle) * radius;
      positions[i * 3 + 1] = height;
      positions[i * 3 + 2] = Math.sin(angle) * radius * 0.4 - 2.0; // mostly in front
      sizes[i] = 0.5 + Math.random() * 2.5;
      speeds[i] = 0.1 + Math.random() * 0.4;
      phases[i] = Math.random() * Math.PI * 2;
    }
    return { positions, sizes, speeds, phases };
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(1.0, 0.8, 0.45) },
    }),
    []
  );

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.getElapsedTime();
  });

  const vertexShader = /* glsl */ `
    attribute float aSize;
    attribute float aSpeed;
    attribute float aPhase;
    attribute vec3 aBasePosition;
    uniform float uTime;
    varying float vAlpha;

    void main(){
      // GPU-side drift (replaces CPU-side per-frame buffer update)
      vec3 pos = aBasePosition;
      pos.y += sin(uTime * aSpeed + aPhase) * 0.3;
      pos.x += sin(uTime * aSpeed * 0.7 + aPhase) * 0.15;

      vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
      gl_PointSize = aSize * (80.0 / -mvPos.z);
      gl_Position  = projectionMatrix * mvPos;

      /* twinkle */
      float dist = length(pos.xy - vec2(0.0, 3.5));
      vAlpha = smoothstep(8.0, 1.0, dist) * (0.4 + 0.6 * sin(uTime * 2.0 + pos.x * 10.0) * 0.5 + 0.5);
    }
  `;

  const fragmentShader = /* glsl */ `
    uniform vec3 uColor;
    varying float vAlpha;

    void main(){
      float d = length(gl_PointCoord - 0.5);
      if(d > 0.5) discard;
      float alpha = smoothstep(0.5, 0.0, d) * vAlpha;
      gl_FragColor = vec4(uColor, alpha);
    }
  `;

  return (
    <points ref={ref} position={[0, 3.5, -3]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aBasePosition"
          args={[positions, 3]}
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aSize"
          args={[sizes, 1]}
          count={count}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aSpeed"
          args={[speeds, 1]}
          count={count}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aPhase"
          args={[phases, 1]}
          count={count}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ------------------------------------------------------------------ */
/*  Sun mesh + glow shells                                             */
/* ------------------------------------------------------------------ */

function Sun() {
  const coreRef = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);
  const outerGlowRef = useRef<THREE.Mesh>(null!);

  const coreUniforms = useMemo(
    () => ({ uTime: { value: 0 } }),
    []
  );

  const glowUniforms = useMemo(
    () => ({ uTime: { value: 0 } }),
    []
  );

  const outerGlowUniforms = useMemo(
    () => ({ uTime: { value: 0 } }),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    coreUniforms.uTime.value = t;
    glowUniforms.uTime.value = t;
    outerGlowUniforms.uTime.value = t;

    // gentle rotation for the core
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.05;
      coreRef.current.rotation.x = t * 0.03;
    }
  });

  return (
    <group position={[0, 5.2, -5]}>
      {/* Core sphere */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[1.8, 64, 64]} />
        <shaderMaterial
          vertexShader={sunVertexShader}
          fragmentShader={sunFragmentShader}
          uniforms={coreUniforms}
        />
      </mesh>

      {/* Inner glow shell */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[2.6, 48, 48]} />
        <shaderMaterial
          vertexShader={glowVertexShader}
          fragmentShader={glowFragmentShader}
          uniforms={glowUniforms}
          transparent
          side={THREE.BackSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Outer glow shell – wider, softer */}
      <mesh ref={outerGlowRef}>
        <sphereGeometry args={[4.5, 32, 32]} />
        <shaderMaterial
          vertexShader={glowVertexShader}
          fragmentShader={glowFragmentShader}
          uniforms={outerGlowUniforms}
          transparent
          side={THREE.BackSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Warm downward light */}
      <pointLight color="#ffaa55" intensity={3} distance={20} decay={2} />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Background grain quad                                              */
/* ------------------------------------------------------------------ */

function GrainBackground() {
  const matRef = useRef<THREE.ShaderMaterial>(null!);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
    }),
    []
  );

  useFrame(({ clock, size }) => {
    uniforms.uTime.value = clock.getElapsedTime();
    uniforms.uResolution.value.set(size.width, size.height);
  });

  return (
    <mesh renderOrder={-1}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={grainVertexShader}
        fragmentShader={grainFragmentShader}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/*  Scene composition                                                  */
/* ------------------------------------------------------------------ */

function Scene() {
  return (
    <>
      <GrainBackground />
      <Sun />
      <DustParticles />

      {/* Soft ambient fill so the rest of the page isn't pitch black */}
      <ambientLight color="#1a0e05" intensity={0.4} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Exported component                                                 */
/* ------------------------------------------------------------------ */

export default function SunScene() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <Canvas
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
