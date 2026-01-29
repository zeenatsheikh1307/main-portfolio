
import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
        <h2 className="text-2xl font-bold text-white mb-2">METABULL UNIVERSE</h2>
        <p className="text-white/60">Loading your digital experience...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
