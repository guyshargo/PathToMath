import React from 'react';

function Track({ position, length, color, startLabel = '', endLabel = '' }) {
  const startIcon = '🚦';
  const finishIcon = '🏁';

  // Create an array of blocks based on the length of the track
  const blocks = Array.from({ length }).map((_, i) => {
  // Check if the current index matches the player's position
  const isCurrent = i === position;
  // Assign a label: startLabel if at the first block, endLabel if at the last block, otherwise, no label
  const label = i === 0 ? startLabel : i === length - 1 ? endLabel : '';

  return (
    // Render each track block with styling that highlights the current position
    <div
      key={i}
      className={`relative w-14 h-14 rounded-sm border-2 border-gray-700 bg-gray-800 flex items-center justify-center mx-0.5 select-none
        ${isCurrent ? `border-yellow-400 shadow-lg ${color} text-white` : 'text-gray-300'}
        transition-transform duration-300
        ${isCurrent ? 'scale-110' : ''}
      `}
    >
      {/* Lane marking on race cubes (not on the first and last cubes) */}
      {!isCurrent && i !== 0 && i !== length - 1 && (
        <div className="absolute left-1/2 top-2 bottom-2 border-l-2 border-dashed border-gray-500 pointer-events-none -translate-x-1/2 z-0"></div>
      )}

      {/* Display either the start/finish icon or the block number */}
      <span className="relative z-10 text-center">
        {label === 'Start' ? (
          <span className="text-2xl">{startIcon}</span>
        ) : label === 'Finish' ? (
          <span className="text-2xl">{finishIcon}</span>
        ) : (
          i + 1
        )}
      </span>
    </div>
  );
});
// Render the full track of blocks
return <div className="flex justify-center mt-6">{blocks}</div>;
}

export default Track;
