import React from 'react';

function Track({ position, length, color }) {
  // Create an array of divs representing each block in the track
  // Highlight the block where the player currently is using the given color
  const blocks = Array.from({ length }).map((_, i) => (
    <div
      key={i}
      className={`w-10 h-10 border inline-block mx-0.5 ${
        i === position ? color : 'bg-gray-200'
      } transition-all`}
    />
  ));

  // Render the full track as a row of blocks
  return <div className="flex justify-center">{blocks}</div>;
}

export default Track;
