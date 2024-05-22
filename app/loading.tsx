import React from "react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <span className="w-3 h-3 bg-black rounded-full mx-1 animate-bounce"></span>
          <span className="w-3 h-3 bg-black rounded-full mx-1 animate-bounce animation-delay-200"></span>
          <span className="w-3 h-3 bg-black rounded-full mx-1 animate-bounce animation-delay-400"></span>
          <span className="w-3 h-3 bg-black rounded-full mx-1 animate-bounce animation-delay-600"></span>
        </div>
        <p className="text-black font-semibold text-2xl animate-bounce">
          Loading
        </p>
      </div>
    </div>
  );
}
