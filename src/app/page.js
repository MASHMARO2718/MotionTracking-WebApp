// src/app/page.js
import PoseEstimation from "../components/PoseEstimation.jsx";

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <PoseEstimation />
    </div>
  );
}
