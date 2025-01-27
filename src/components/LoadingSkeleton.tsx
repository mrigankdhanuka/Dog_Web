import React from 'react';

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="animate-pulse bg-gray-300 rounded-lg aspect-square"
        />
      ))}
    </div>
  );
};

export default LoadingSkeleton;