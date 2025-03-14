"use client";
import { useEffect, useRef } from "react";
import { Pose } from "@mediapipe/pose";
import { Camera } from "@mediapipe/camera_utils";
import Webcam from "./Webcam";

export default function PoseEstimation() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // ↓このdrawResults関数がないと動きません！
  function drawResults(results) {
    const canvasCtx = canvasRef.current.getContext("2d");
    canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    canvasCtx.drawImage(results.image, 0, 0, canvasRef.current.width, canvasRef.current.height);

    if (results.poseLandmarks) {
      for (const landmark of results.poseLandmarks) {
        canvasCtx.beginPath();
        canvasCtx.arc(
          landmark.x * canvasRef.current.width,
          landmark.y * canvasRef.current.height,
          5, 0, 2 * Math.PI
        );
        canvasCtx.fillStyle = "red";
        canvasCtx.fill();
      }
    }
  }

  useEffect(() => {
    const pose = new Pose({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.7,
    });

    pose.onResults(drawResults); // ←ここでdrawResultsを使用

    if (videoRef.current) {
      const camera = new Camera(videoRef.current, {
        onFrame: async () => await pose.send({ image: videoRef.current }),
        width: 640,
        height: 480,
      });
      camera.start();
    }
  }, []);

  return (
    <div>
      <Webcam ref={videoRef} />
      <canvas ref={canvasRef} width="640px" height="480px"></canvas>
    </div>
  );
}
