"use client";
import { forwardRef } from "react";

const Webcam = forwardRef((props, ref) => {
  return (
    <video
      ref={ref}
      autoPlay
      playsInline
      muted
      className="w-full h-auto"
    />
  );
});

Webcam.displayName = "Webcam";

export default Webcam;
