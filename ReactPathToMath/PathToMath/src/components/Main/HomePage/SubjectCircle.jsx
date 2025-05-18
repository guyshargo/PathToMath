import React from 'react';

function SubjectCircle({ imageSrc, title, description }) {
  return (
    <div className="relative w-56 h-64 perspective group cursor-pointer playful-font">
      <div className="w-full h-56 relative transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180 will-change-transform">

        {/* Front Side */}
        <div className="absolute w-full h-full backface-hidden flex items-center justify-center">
          <div className="w-44 h-44 rounded-full overflow-hidden shadow-md border-4 border-white bg-white">
            <img
              src={imageSrc}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Back Side */}
        <div className="absolute w-full h-full rotate-y-180 backface-hidden flex items-center justify-center">
          <div className="w-44 h-44 rounded-full bg-orange-300 shadow-md border-4 border-white flex items-center justify-center p-4 text-center">
            <p className="text-base text-gray-800">{description}</p>
          </div>
        </div>
      </div>

      {/* Title (below flip area) */}
      <div className="text-center text-xl font-bold text-gray-900">
        {title}
      </div>
    </div>
  );
}

export default SubjectCircle;
