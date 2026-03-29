import { useEffect, useRef, useState } from "react";
import { detect,init } from "../utils/utils";


export default function FaceExpression() {
  const videoRef = useRef(null);
  const faceLandmarkerRef = useRef(null);
  const animationRef = useRef(null);

  const [expression, setExpression] = useState("Detecting...");



  useEffect(() => {
    init({ videoRef, faceLandmarkerRef }); // sirf setup
    return () => {
      if (animationRef.current)
        cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Face Expression</h2>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{ width: "400px", border: "2px solid black" }}
      />

      <h3>{expression}</h3>

      {/* 🔥 Button se control */}
      <button style={{padding:'5px 10px',backgroundColor:'black',color:'white'}} onClick={()=>detect({ videoRef, faceLandmarkerRef, setExpression })}>Start Detect</button>

    </div>
  );
}