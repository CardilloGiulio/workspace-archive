"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  RoundedBox,
  Text,
  Environment,
  ContactShadows,
  Center,
  Sparkles,
  Float,
} from "@react-three/drei";
import type { Group } from "three";

type GeoData = {
  ip: string;
  city: string;
  country_name: string;
};

async function fetchGeoData(): Promise<GeoData> {
  const res = await fetch("https://ipapi.co/json/");
  if (!res.ok) throw new Error("Failed to fetch geo data");
  return res.json();
}

function Button3D({
  label,
  onPress,
  baseScale = 0.7,
}: {
  label: string;
  onPress: () => void;
  baseScale?: number;
}) {
  const groupRef = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    const g = groupRef.current;
    if (!g) return;
    const target = hovered ? 1.1 : 1;
    g.scale.x += (target - g.scale.x) * 0.12;
    g.scale.y += (target - g.scale.y) * 0.12;
    g.scale.z += (target - g.scale.z) * 0.12;
  });

  return (
    <group
      ref={groupRef}
      scale={baseScale}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
      onClick={(e) => {
        e.stopPropagation();
        onPress();
      }}
    >
      <Sparkles count={60} scale={[6, 3, 1]} speed={0.6} size={2} />
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
        <mesh position={[0, 0, -0.05]}>
          <circleGeometry args={[2.2, 64]} />
          <meshBasicMaterial color={"#ffd700"} />
        </mesh>
      </Float>
      <Center>
        <RoundedBox args={[3.6, 1.4, 0.5]} radius={0.22} smoothness={8}>
          <meshStandardMaterial
            color={"#d32f2f"}
            metalness={0.15}
            roughness={0.35}
            emissive={"#ff1744"}
            emissiveIntensity={0.15}
          />
        </RoundedBox>
        <group position={[0, 0, 0.18]}>
          <RoundedBox args={[3.2, 1.1, 0.25]} radius={0.2} smoothness={8}>
            <meshStandardMaterial
              color={"#ff5252"}
              metalness={0.1}
              roughness={0.28}
              emissive={"#ff4081"}
              emissiveIntensity={0.18}
            />
          </RoundedBox>
        </group>
        <Text
          position={[0, 0, 0.36]}
          fontSize={0.35}
          letterSpacing={0.01}
          anchorX="center"
          anchorY="middle"
          color="#fff"
          outlineWidth={0.04}
          outlineColor="#000"
          maxWidth={3}
        >
          {label.toUpperCase()}
        </Text>
      </Center>
    </group>
  );
}

function ThreeScene({ onPress }: { onPress: () => void }) {
  return (
    <div style={{ width: 520, height: 360, marginBottom: "1rem" }}>
      <Canvas camera={{ position: [0, 0, 4.2], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 6, 6]} intensity={1.3} />
        <Button3D label="Claim My Prize Now" onPress={onPress} baseScale={0.7} />
        <Environment preset="city" />
        <ContactShadows position={[0, -0.9, 0]} opacity={0.5} scale={8} blur={2.5} far={2} />
        <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} />
      </Canvas>
    </div>
  );
}

function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);
    const cols = Math.floor(w / 14);
    const yPos = Array.from({ length: cols }, () => Math.floor(Math.random() * h));

    const chars = "アカサタナハマヤラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$#@";
    const draw = () => {
      if (!ctx) return;
      ctx.fillStyle = "rgba(0,0,0,0.08)";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#0f0";
      ctx.font = "14px monospace";
      for (let i = 0; i < yPos.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * 14, yPos[i]);
        if (yPos[i] > 100 + Math.random() * 10000) yPos[i] = 0;
        else yPos[i] += 14;
      }
      req = requestAnimationFrame(draw);
    };

    let req = requestAnimationFrame(draw);

    const handleResize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(req);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div style={hackStyles.matrixWrap}>
      <canvas ref={canvasRef} style={hackStyles.matrixCanvas} />
    </div>
  );
}

function HackerConsole({
  logs,
  headline = "HACKING IN PROGRESS...",
}: {
  logs: string[];
  headline?: string;
}) {
  return (
    <div style={hackStyles.wrap}>
      <MatrixRain />
      <div style={hackStyles.overlay}>
        <h2 style={hackStyles.headline}>{headline}</h2>
        <div style={hackStyles.terminal}>
          {logs.map((l, i) => (
            <div key={i}>{l}</div>
          ))}
          <div className="blink">█</div>
        </div>
      </div>
    </div>
  );
}

const hackStyles: Record<string, React.CSSProperties> = {
  wrap: {
    position: "relative",
    width: "min(900px, 96vw)",
    height: "60vh",
    border: "2px solid #0f0",
    boxShadow: "0 0 24px rgba(0,255,0,0.25)",
    overflow: "hidden",
    borderRadius: 8,
    marginTop: "1rem",
  },
  matrixWrap: {
    position: "absolute",
    inset: 0,
    background: "black",
  },
  matrixCanvas: {
    width: "100%",
    height: "100%",
    display: "block",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    padding: "0.75rem",
  },
  headline: {
    margin: 0,
    color: "#00e676",
    fontFamily: "monospace",
    textShadow: "0 0 8px #0f0",
    letterSpacing: "0.06em",
  },
  terminal: {
    flex: 1,
    overflowY: "auto",
    background: "rgba(0,0,0,0.6)",
    color: "#0f0",
    fontFamily: "monospace",
    padding: "0.75rem",
    border: "1px solid #0f0",
    borderRadius: 6,
    textShadow: "0 0 4px #0f0",
  },
};

function Results({ data }: { data: GeoData }) {
  return (
    <div style={{ textAlign: "center", marginTop: "1.5rem", color: "#fff" }}>
      <h2 style={{ fontSize: "2rem", color: "#0f0" }}>✅ Hack Complete! We know where you live 👀</h2>
      <p>
        IP: <b>{data.ip}</b> <br />
        City: <b>{data.city}</b> <br />
        Country: <b>{data.country_name}</b>
      </p>
      <h1
        style={{
          marginTop: "1.25rem",
          fontSize: "3rem",
          color: "#ff1744",
          textShadow: "0 0 10px #ff1744, 0 0 20px #ff1744",
        }}
      >
        😂😂😂 YOU JUST GOT SCAMMED 😂😂😂
      </h1>
      <p style={{ marginTop: "0.5rem", color: "#aaa" }}>(relax, it’s a meme — no real hacking here)</p>
    </div>
  );
}

export default function Home() {
  const [geoData, setGeoData] = useState<GeoData | null>(null);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(666);
  const [phase, setPhase] = useState<"intro" | "hacking" | "results">("intro");
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const t = setInterval(() => {
      setCountdown((c) => (c > 0 ? c - 1 : 0));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const fakeMessages = useMemo(
    () => [
      "> Initializing hack…",
      "> Bypassing Windows 95 firewall…",
      "> Connecting to FBI mainframe… denied (lmao)",
      "> Retrying with mom’s Netflix password… success!",
      "> Hacking your smart fridge… ice acquired 🧊",
      "> Selling your data on r/Scams… buyer found",
      "> Mining Dogecoin on your GPU… profits: -$0.12",
      "> Deleting System32… (jk… or am I?)",
      "> Extracting location…",
      "> Almost done…",
      "> Hack complete. Verifying location…",
    ],
    []
  );

  const startFakeHack = async () => {
    setPhase("hacking");
    setLogs([]);
    setLoading(true);
    let i = 0;
    const interval = setInterval(() => {
      setLogs((prev) => [...prev, fakeMessages[i]]);
      i++;
      if (i >= fakeMessages.length) {
        clearInterval(interval);
        fetchGeoData()
          .then((data) => {
            setGeoData(data);
            setPhase("results");
          })
          .catch((e) => {
            setLogs((prev) => [...prev, `> ERROR: ${String(e)}`]);
          })
          .finally(() => setLoading(false));
      }
    }, 600);
  };

  return (
    <main style={styles.page}>
      {phase === "intro" && (
        <div style={styles.marqueeWrap}>
          <div style={{ ...styles.marquee, ...styles.marquee1 }}>
            🔥 LIMITED TIME OFFER!!! 🔥 ACT NOW!!! 🔥 DO NOT MISS OUT!!! 🔥
          </div>
          <div style={{ ...styles.marquee, ...styles.marquee2 }}>
            ✅ 100% LEGIT ✅ TOTALLY REAL ✅ AS SEEN ON THE INTERNET
          </div>
        </div>
      )}
      {phase === "intro" && (
        <>
          <h1 style={styles.title}>🎉 CONGRATULATIONS! YOU JUST WON $5,000,000! 🎉</h1>
          <p style={styles.subtitle}>
            Only <b style={{ color: "#fff" }}>{countdown}</b> seconds left to claim!
          </p>
          <ThreeScene onPress={startFakeHack} />
        </>
      )}
      {phase === "hacking" && (
        <>
          <h1 style={{ ...styles.title, color: "#00e676", textShadow: "0 0 16px #00e676" }}>
            👨‍💻 ULTRA-ADVANCED HACKER MODE
          </h1>
          <HackerConsole logs={logs} headline="HACKING IN PROGRESS..." />
          {loading && <p style={styles.loading}>Enhancing meme payload…</p>}
        </>
      )}
      {phase === "results" && geoData && (
        <>
          <h1 style={{ ...styles.title, color: "#ffd700" }}>💰 CLAIM COMPLETE! (totally real)</h1>
          <Results data={geoData} />
        </>
      )}
      {phase === "intro" && (
        <>
          <div style={styles.badges}>
            <span style={styles.badge}>🔒 Bank-Level Encryption*</span>
            <span style={styles.badge}>🏆 Award-Winning Payouts*</span>
            <span style={styles.badge}>🦄 Certified by Unicorn Auditors*</span>
          </div>
          <p style={styles.asterisk}>*not actually a thing</p>
          <div style={styles.testimonials}>
            <div style={styles.card}>
              <b>“I clicked and now I’m a billionaire (in exposure)!”</b>
              <div>— Definitely Not A Bot</div>
            </div>
            <div style={styles.card}>
              <b>“They said it couldn’t be done… and they were right.”</b>
              <div>— A. Skeptic</div>
            </div>
            <div style={styles.card}>
              <b>“Best decision since I bought the dip at the top.”</b>
              <div>— Crypto Uncle</div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "1.25rem",
    gap: "0.5rem",
    background: "linear-gradient(120deg, #111 0%, #1a002b 30%, #001a2b 70%, #111 100%)",
    backgroundSize: "400% 400%",
    animation: "bgShift 10s ease infinite",
    color: "#ffe57f",
    textAlign: "center",
  },
  title: {
    margin: "0.5rem 0 0.25rem",
    fontSize: "3rem",
    fontWeight: 900,
    color: "#ffd700",
    textShadow: "0 0 6px #ff0000, 0 0 18px #ff0000, 0 0 32px #ff6d00, 0 0 48px #ffd600",
    letterSpacing: "0.02em",
  },
  subtitle: {
    margin: "0 0 0.25rem",
    fontSize: "1.1rem",
    color: "#ffeb3b",
    textShadow: "0 0 6px #aa00ff",
  },
  marqueeWrap: {
    width: "100%",
    overflow: "hidden",
    borderBottom: "2px dashed #ff1744",
  },
  marquee: {
    whiteSpace: "nowrap",
    padding: "0.25rem 0",
    fontWeight: 800,
    textTransform: "uppercase",
    textShadow: "0 0 6px #000",
  },
  marquee1: {
    animation: "marquee 10s linear infinite",
    color: "#ff8a80",
    background: "rgba(0,0,0,0.2)",
  },
  marquee2: {
    animation: "marqueeReverse 12s linear infinite",
    color: "#80d8ff",
    background: "rgba(0,0,0,0.15)",
  },
  badges: {
    display: "flex",
    gap: "0.5rem",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: "0.5rem",
  },
  badge: {
    background: "linear-gradient(90deg, #00e5ff, #18ffff, #00e5ff, #18ffff)",
    padding: "0.35rem 0.6rem",
    borderRadius: 999,
    color: "#001018",
    fontWeight: 900,
    boxShadow: "0 8px 24px rgba(0,229,255,0.25)",
  },
  asterisk: {
    opacity: 0.6,
    fontSize: "0.85rem",
    marginTop: 2,
  },
  loading: {
    color: "#fff",
    marginTop: "0.5rem",
    textShadow: "0 0 8px #f50057",
  },
  testimonials: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "0.6rem",
    width: "100%",
    maxWidth: 900,
    marginTop: "0.75rem",
  },
  card: {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: 12,
    padding: "0.8rem",
    color: "#fffde7",
    boxShadow: "0 12px 32px rgba(0,0,0,0.35)",
  },
};

if (typeof document !== "undefined") {
  const id = "meme-keyframes";
  if (!document.getElementById(id)) {
    const style = document.createElement("style");
    style.id = id;
    style.innerHTML = `
      @keyframes marquee {
        0% { transform: translateX(100%); }
        100% { transform: translateX(-100%); }
      }
      @keyframes marqueeReverse {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
      @keyframes bgShift {
        0% { background-position: 0% 0%; }
        50% { background-position: 100% 100%; }
        100% { background-position: 0% 0%; }
      }
      .blink {
        animation: blink 1s steps(2, start) infinite;
      }
      @keyframes blink {
        to { visibility: hidden; }
      }
    `;
    document.head.appendChild(style);
  }
}