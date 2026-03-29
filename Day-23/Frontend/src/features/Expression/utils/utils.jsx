import {
  FaceLandmarker,
  FilesetResolver,
} from "@mediapipe/tasks-vision";





  // ✅ 1. INIT (setup + camera)
  export const init = async ({ videoRef, faceLandmarkerRef }) => {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
    );

    faceLandmarkerRef.current =
      await FaceLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
        },
        runningMode: "VIDEO",
        numFaces: 1,
      });

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });

    videoRef.current.srcObject = stream;
  };

  // ✅ 2. DETECT (same logic)
 export const detect = ({ videoRef, faceLandmarkerRef, setExpression }) => {
  if (!videoRef.current || !faceLandmarkerRef.current) return;

  const now = Date.now();

  const results =
    faceLandmarkerRef.current.detectForVideo(
      videoRef.current,
      now
    );

  if (results.faceLandmarks.length > 0) {
    const landmarks = results.faceLandmarks[0];

    const left = landmarks[61];
    const right = landmarks[291];
    const top = landmarks[13];
    const bottom = landmarks[14];

    const mouthWidth = Math.abs(left.x - right.x);
    const mouthHeight = Math.abs(top.y - bottom.y);

    const eyeTop = landmarks[159];
    const eyeBottom = landmarks[145];
    const eyeOpen = Math.abs(eyeTop.y - eyeBottom.y);

    if (mouthWidth > 0.12 && mouthHeight > 0.003) {
      setExpression("😊 Smiling");
    } else if (mouthHeight > 0.06) {
      setExpression("😮 Surprised");
    } else if (eyeOpen < 0.01) {
      setExpression("😴 Eyes Closed");
    } else if (mouthWidth < 0.09 && mouthHeight < 0.025) {
      setExpression("😢 Sad");
    } else {
      setExpression("😐 Neutral");
    }
  } else {
    setExpression("No Face Detected");
  }
};