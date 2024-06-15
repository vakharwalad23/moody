import React from "react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <span className="w-6 h-6 rounded-full bg-black animate-pulse mx-1"></span>
          <span className="w-6 h-6 rounded-full bg-black animate-pulse mx-1 animation-delay-200"></span>
          <span className="w-6 h-6 rounded-full bg-black animate-pulse mx-1 animation-delay-400"></span>
        </div>
        <h1 className="font-bold text-4xl mb-2 animate-bounce">MooDy</h1>
      </div>
    </div>
  );
}
